import { getCompanyDocumentText } from './companyDocumentService.js';
import { answerProjectQuestion, getProjectIndex, searchProjectRecords } from './projectKnowledgeService.js';
import { getWebsiteContentText } from './websiteContentService.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const FALLBACK_REPLY =
  "I don't have that specific information on hand right now, but our team can help you with the exact details. Feel free to reach out at +92 300 9358751 (Call/WhatsApp) or info@indigostsolar.com — they'll be happy to assist!";

function getApiKey() {
  return process.env.OPENAI_API_KEY || process.env.CHATGPT_API_KEY;
}

function getModelName() {
  return process.env.OPENAI_MODEL || process.env.CHATGPT_MODEL || 'gpt-4.1-mini';
}

function getModelNames() {
  return [...new Set([getModelName(), process.env.OPENAI_FALLBACK_MODEL].filter(Boolean))];
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getQueryTerms(message) {
  const stopWords = new Set([
    'a',
    'an',
    'and',
    'are',
    'can',
    'do',
    'for',
    'give',
    'how',
    'i',
    'is',
    'me',
    'of',
    'our',
    'please',
    'tell',
    'the',
    'to',
    'what',
    'your',
    'you',
    'us',
    'about',
    'okay',
    'perfect',
    'now',
  ]);

  const synonyms = {
    charger: ['charger', 'charging', 'station', 'stations', 'ev'],
    chargers: ['charger', 'charging', 'station', 'stations', 'ev'],
    charging: ['charger', 'charging', 'station', 'stations', 'ev'],
    ev: ['ev', 'charging', 'charger', 'station', 'stations'],
    location: ['location', 'locations', 'address', 'station', 'office'],
    locations: ['location', 'locations', 'address', 'station', 'office'],
    contact: ['contact', 'phone', 'whatsapp', 'email', 'office', 'address'],
    information: ['information', 'details', 'contact', 'phone', 'email', 'address'],
    infromation: ['information', 'details', 'contact', 'phone', 'email', 'address'],
    team: ['team', 'contact', 'phone', 'whatsapp', 'email', 'office'],
    service: ['service', 'services', 'solar', 'ev', 'bess', 'epc', 'installation'],
    services: ['service', 'services', 'solar', 'ev', 'bess', 'epc', 'installation'],
    servies: ['service', 'services', 'solar', 'ev', 'bess', 'epc', 'installation'],
    solor: ['solar', 'home', 'residential', 'pv'],
    solar: ['solar', 'home', 'residential', 'pv'],
    home: ['home', 'residential', 'solar'],
    bess: ['bess', 'battery', 'storage', 'capacity', 'kwh'],
    capacity: ['capacity', 'kw', 'kwp', 'mw', 'kwh', 'solar', 'bess', 'power'],
    donor: ['donor', 'funded', 'funding', 'unicef', 'customer'],
    donors: ['donor', 'funded', 'funding', 'unicef', 'customer'],
    hospital: ['hospital', 'dhq', 'dho', 'healthcare'],
    hospitals: ['hospital', 'dhq', 'dho', 'healthcare'],
    warehouse: ['warehouse', 'epi', 'vaccine', 'cold', 'chain'],
    warehouses: ['warehouse', 'epi', 'vaccine', 'cold', 'chain'],
    unicef: ['unicef', 'donor', 'funded', 'bess', 'solar'],
    project: ['project', 'projects', 'solar', 'bess', 'ev', 'capacity', 'location'],
    projects: ['project', 'projects', 'solar', 'bess', 'ev', 'capacity', 'location'],
  };

  const rawTerms = normalizeText(message)
    .split(' ')
    .filter((term) => term.length > 2 && !stopWords.has(term));

  return [...new Set(rawTerms.flatMap((term) => synonyms[term] || [term]))];
}

function isProjectDataQuery(message) {
  const normalized = normalizeText(message);
  const projectTerms = [
    'project',
    'projects',
    'capacity',
    'bess',
    'battery',
    'storage',
    'solar',
    'kw',
    'kwp',
    'mw',
    'kwh',
    'donor',
    'province',
    'hospital',
    'warehouse',
    'vaccine',
    'unicef',
    'station',
    'stations',
    'ev charging',
    'total',
    'statistics',
    'islamabad',
    'karachi',
    'lahore',
    'uthal',
    'dera',
    'loralai',
    'manga mandi',
  ];

  return projectTerms.some((term) => normalized.includes(term));
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item) => item && ['user', 'bot', 'assistant'].includes(item.role) && typeof item.text === 'string')
    .slice(-8)
    .map((item) => ({
      role: item.role === 'user' ? 'user' : 'assistant',
      text: item.text.trim().slice(0, 800),
    }))
    .filter((item) => item.text);
}

function buildConversationText(history, message) {
  const previousConversation = sanitizeHistory(history)
    .map((item) => `${item.role === 'user' ? 'Customer' : 'Assistant'}: ${item.text}`)
    .join('\n');

  return `${previousConversation}\nCustomer: ${message}`.trim();
}

function getRelevantCompanyContext(knowledgeText, message) {
  const sections = knowledgeText
    .split(/\n{2,}|(?=\n[A-Z][A-Za-z\s&/()-]{2,}:)/)
    .map((section) => section.trim())
    .filter(Boolean);
  const terms = getQueryTerms(message);

  if (!terms.length) {
    return knowledgeText.slice(0, 6000);
  }

  const scoredSections = sections.map((section, index) => {
    const normalized = normalizeText(section);
    const score = terms.reduce((total, term) => {
      const exactMatches = normalized.split(term).length - 1;
      const partialMatch = normalized.includes(term.slice(0, Math.max(4, term.length - 1))) ? 1 : 0;
      return total + exactMatches * 4 + partialMatch;
    }, 0);

    return { section, index, score };
  });

  const selected = scoredSections
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 6)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.section)
    .join('\n\n');

  return (selected || knowledgeText.slice(0, 4500)).slice(0, 4500);
}

function getCompanyOverviewSummary(companyInformation) {
  const endMarker = '\n\nServices:';
  const endIndex = companyInformation.indexOf(endMarker);
  const overview = endIndex === -1 ? companyInformation : companyInformation.slice(0, endIndex);

  return overview.slice(0, 1800).trim();
}

async function loadKnowledgeSource(name, loader) {
  try {
    return await loader();
  } catch (error) {
    console.warn(`[chatbot:knowledge] ${name} retrieval failed; continuing with available context.`, {
      code: error.code,
      message: error.message,
    });
    return '';
  }
}

function logRetrieval({ query, projectResults, companyContext, finalContext }) {
  console.info('[chatbot:retrieval]', {
    query,
    retrievedProjectChunks: projectResults.map((item) => ({
      project: item.project.name,
      score: item.score,
      solarCapacity: item.project.solarCapacity || null,
      bessCapacity: item.project.bessCapacity || null,
      status: item.project.status || null,
    })),
    companyContextCharacters: companyContext.length,
    finalContextCharacters: finalContext.length,
    finalContextPreview: finalContext.slice(0, 1200),
  });
}

function looksIncomplete(reply) {
  const cleanReply = reply.trim();
  if (!cleanReply) {
    return true;
  }

  if (cleanReply.length < 8) {
    return true;
  }

  // The required EV charging format ends on a field line like "Status: Available"
  // with no terminal punctuation by design — that is a complete answer, not a
  // truncated one, so it's exempt from the trailing-punctuation check below.
  const lastLine = cleanReply.split('\n').filter(Boolean).pop() || '';
  if (/^(status|type|power|location):\s*\S/i.test(lastLine)) {
    return /[,;:]$/.test(cleanReply);
  }

  return (
    /[,;:*]$/.test(cleanReply) ||
    /\*\*[^*]*$/.test(cleanReply) ||
    /\n\s*[-*]\s*$/.test(cleanReply) ||
    /\b(at|and|or|for|with|including|include|includes|such as|services|core services)$/i.test(cleanReply) ||
    !/[.!?)]$/.test(cleanReply)
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getResponseText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const text = data.output
    ?.flatMap((item) => item.content || [])
    .map((content) => content.text || content.value || '')
    .join('')
    .trim();

  return text || '';
}

const OPENAI_REQUEST_TIMEOUT_MS = 15000;

async function askOpenAI(apiKey, model, systemInstruction, cleanMessage, history = [], retry = false) {
  const conversationText = buildConversationText(history, cleanMessage);
  const input = retry
    ? `The previous answer was cut off or malformed. Answer the latest customer question again, keeping the same required format and the same level of brevity, but make sure it ends as a complete thought.\n\nConversation:\n${conversationText}`
    : `Conversation:\n${conversationText}\n\nAnswer the latest customer message. Use the previous messages to understand words like "it", "that", "more", or "guide me".`;

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), OPENAI_REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        instructions: systemInstruction,
        input,
        temperature: 0.2,
        top_p: 0.9,
        max_output_tokens: 220,
      }),
      signal: timeoutController.signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`OpenAI API request timed out after ${OPENAI_REQUEST_TIMEOUT_MS}ms.`);
      timeoutError.status = 504;
      timeoutError.code = 'OPENAI_TIMEOUT';
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error?.message || `OpenAI API request failed with status ${response.status}.`);
    error.status = response.status;
    error.code = data.error?.code || data.error?.type || 'OPENAI_API_ERROR';
    throw error;
  }

  return getResponseText(data);
}

async function askCompleteOpenAI(apiKey, systemInstruction, cleanMessage, history = []) {
  let lastReply = '';
  let lastError = null;

  for (const modelName of getModelNames()) {
    for (const retryIncomplete of [false, true]) {
      try {
        const reply = await askOpenAI(apiKey, modelName, systemInstruction, cleanMessage, history, retryIncomplete);
        lastReply = reply;
        if (!looksIncomplete(reply)) {
          return reply;
        }
      } catch (error) {
        lastError = error;
        if (![408, 409, 429, 500, 502, 503, 504].includes(error.status)) {
          throw error;
        }
        if (!retryIncomplete) {
          await delay(700);
        }
      }
    }
  }

  if (lastReply && !looksIncomplete(lastReply)) {
    return lastReply;
  }

  if (lastError) {
    throw lastError;
  }

  return FALLBACK_REPLY;
}

export async function generateChatbotReply(message, history = []) {
  const cleanMessage = String(message || '').trim();

  console.log(`\n[DEBUG] === New Turn ===`);
  console.log(`[DEBUG] Incoming Message: "${cleanMessage}"`);

  if (!cleanMessage) {
    const error = new Error('Message is required.');
    error.code = 'EMPTY_MESSAGE';
    throw error;
  }

  const conversationText = buildConversationText(history, cleanMessage);
  const retrievalQuery = `${cleanMessage}\n${cleanMessage}\n${cleanMessage}\n${conversationText}`;
  
  console.log(`[DEBUG] Constructed Retrieval Query length: ${retrievalQuery.length}`);

  const [projectIndex, companyInformation, websiteInformation] = await Promise.all([
    loadKnowledgeSource('project index', getProjectIndex).then((index) => index || { records: [], searchableText: '' }),
    loadKnowledgeSource('company document', getCompanyDocumentText),
    loadKnowledgeSource('website content', getWebsiteContentText),
  ]);
  const projectResults = searchProjectRecords(projectIndex.records, retrievalQuery, 30);
  const deterministicProjectAnswer = answerProjectQuestion(projectIndex.records, cleanMessage);

  const apiKey = getApiKey();
  if (!apiKey) {
    const error = new Error('OpenAI API key is missing.');
    error.code = 'MISSING_OPENAI_API_KEY';
    throw error;
  }

  const combinedKnowledge = `Structured project database records:\n${projectIndex.searchableText}\n\nLatest website/source-code information:\n${websiteInformation}\n\nUploaded company document information:\n${companyInformation}`;
  const websiteFactSummary = websiteInformation.split('\n\nWebsite page:')[0].slice(0, 2500);
  const companyOverviewSummary = getCompanyOverviewSummary(companyInformation);
  const projectContext = isProjectDataQuery(retrievalQuery)
    ? `\n\nTop structured project records for project/statistics questions:\n${projectResults
        .map((item, index) => `Retrieved Project Chunk ${index + 1} | Similarity Score: ${item.score}\n${item.project.searchText}`)
        .join('\n\n')}`
    : '';
  const companyContext = getRelevantCompanyContext(combinedKnowledge, retrievalQuery);
  const deterministicSection = deterministicProjectAnswer
    ? `\n\nPre-computed answer for this query (use as authoritative data in your response):\n${deterministicProjectAnswer}`
    : '';
  const relevantCompanyInformation = `Company overview (always available — use this for "what is Indigost", "about you", "who are you" type questions):\n${companyOverviewSummary}\n\n${websiteFactSummary}${projectContext}${deterministicSection}\n\nRelevant website, structured, and document sections:\n${companyContext}`;
  logRetrieval({
    query: cleanMessage,
    projectResults,
    companyContext,
    finalContext: relevantCompanyInformation,
  });  const systemInstruction = `# Indigost Engineering — AI Assistant System Prompt (Revised)

## ROLE
You are the official AI assistant for Indigost Engineering (Pvt) Ltd. You answer questions about Indigost Engineering's services, projects, and capabilities, grounded strictly in the company data provided to you below.

## DATA SOURCE
For any claim about Indigost Engineering itself — its projects, capacities, locations, pricing, specific services, or anything it has actually done — you may only use information found in the "COMPANY KNOWLEDGE BASE" section at the bottom of this prompt. Do not use general world knowledge to fill gaps in company-specific facts, and do not assume facts that aren't present in that data.
The one exception is general industry/technical knowledge for conceptual or comparison questions — see "GENERAL TECHNICAL / COMPARISON QUESTIONS" below. That exception never extends to claims about Indigost itself.

## PRIORITY ORDER (apply in this order when answering)
1. **Grounding** — Does the knowledge base contain information relevant to this question? If no company-specific data exists, check whether the question is instead a general conceptual/comparison question that can be answered with standard industry knowledge (see "GENERAL TECHNICAL / COMPARISON QUESTIONS" below). If neither applies, say so honestly (see "When Data Is Missing" below) rather than guessing.
2. **Scope match** — Answer only the question asked. Do not pivot to a different project, service, or topic just because it appears in the knowledge base.
3. **Capability vs. reality** — For availability/location questions, check whether a general capability claim is being confirmed by actual deployment records, or whether they diverge — see "OFFERINGS VS. ACTUAL DEPLOYMENT" below.
4. **Format** — Use the correct output format for the topic (see "EV Charging Format" below for the one required exception; everything else uses normal prose).
5. **Brevity** — Match the length of your answer to the length and intent of the question. Give the shortest answer that fully and correctly answers what was asked — never pad with unrelated information.

## GENERAL RESPONSE RULES — MATCH ANSWER LENGTH TO THE QUESTION
- Default to **short answers**. A short, direct question (e.g., "Do you offer net metering?", "Is there a station in Karachi?", a yes/no question, a greeting) gets a short answer — often just 1 sentence or 1 line. Do not add extra context, background, or follow-up suggestions unless the user asked for them.
- Only give a **longer, detailed answer** (multiple sentences or a bullet list) when the user explicitly asks for it — e.g., they use words like "details," "more," "explain," "list," "tell me about," "how does it work," or ask a genuinely broad question like "What services do you offer?"
- When a broad/list-style question is asked, list the relevant items concisely — short bullets, not a paragraph per item, unless the user asks for more depth.
- Do not automatically append a follow-up offer or contact suggestion to every answer. Only include contact info if the user asked for it or the question is specifically about how to reach Indigost. The one fixed exception is the standard not-available response (see "WHEN DATA IS MISSING OR PARTIAL"), which always includes the contact info as part of its required wording.
- Never mix unrelated services or projects into the same answer unless the user's question genuinely spans both.
- Use bullet points only when listing multiple distinct items the user asked for. Otherwise use a single short sentence.
- When in doubt, prefer the shorter answer. The goal is to respect the user's time — verbose answers to simple questions are a failure mode to avoid.

## WHEN DATA IS MISSING OR PARTIAL
- Standard not-available response — use this **exact wording, every time**, for any company-specific detail (a project fact, an EV station in a given location, warranty/contractual terms, pricing, or anything else) that is not explicitly present in the knowledge base, AND the question is not a general conceptual/comparison question covered by the exception below: "I don't have that specific information on hand right now, but our team can help you with the exact details. Feel free to reach out at +92 300 9358751 (Call/WhatsApp) or info@indigostsolar.com — they'll be happy to assist!"
- Do not paraphrase, shorten, drop the contact info, or write a topic-specific variant of this sentence (e.g., do not invent alternate phrasings like "No EV charging station data is available for that location" or "Warranty information is not provided", and do not omit the phone number/email). Always use the exact standard sentence above, in full, so the response is consistent no matter what the missing detail is.
- If there is partial/ambiguous data (e.g., the location name almost matches but isn't exact): ask a clarifying question instead of guessing which record the user means.
- Never invent project names, capacities, locations, specifications, warranty terms, or any other contractual/policy detail that is not explicitly in the knowledge base.

## NEVER ASSUME TERMS NOT EXPLICITLY DOCUMENTED (e.g. warranty)
- Contractual or policy-style details — warranty coverage/duration, guarantees, pricing, payment terms, SLAs — must come from an explicit statement in the knowledge base. Never infer or imply these from related context (e.g., do not say O&M services "typically include" or "usually come with" warranty coverage just because O&M and warranty are commonly bundled in the industry generally — that is a general-knowledge assumption about a contractual term, not a confirmed Indigost fact).
- If the knowledge base does not explicitly state a warranty/guarantee term, use the standard not-available response above and recommend the user contact Indigost Engineering directly for warranty details — do not guess, hedge with "typically," "usually," or "generally," or imply a term exists.
- This is a stricter case of the GROUNDING GUARD below: general industry knowledge may be used to explain a *concept* (see "GENERAL TECHNICAL / COMPARISON QUESTIONS"), but never to assert a specific contractual term Indigost itself offers.

## GENERAL TECHNICAL / COMPARISON QUESTIONS (limited reasoning allowed)
- Some questions are conceptual/educational rather than asking for a specific Indigost fact — e.g., "What is the difference between on-grid and off-grid solar systems?", "How does BESS work?", "What is EV charging?". If the knowledge base doesn't contain an exact explanation of this kind, you may still give a short, accurate answer using well-established, generally accepted industry knowledge of the topic — this is standard technical knowledge, not a company-specific claim, so the grounding restriction above does not block it.
- Keep it brief and clearly framed as general guidance (e.g., "In general, an on-grid solar system..."), not as a specific claim about what Indigost has built or done — unless the knowledge base separately confirms Indigost offers it, in which case you can connect the two (e.g., note that Indigost designs on-grid, off-grid, and hybrid solar systems, per its services overview).
- End with one short line recommending the user contact Indigost Engineering for guidance specific to their site or project, since project-specific sizing/recommendations aren't something you can infer from general knowledge.
- For "what makes Indigost different from other solar companies" style questions: never invent claims about named competitors. Answer using Indigost's own stated strengths from the knowledge base (e.g., its company overview, experience, service scope) if present; only fall back to brief generic industry framing if the knowledge base has nothing usable, and keep that fallback honest and short.
- This exception never overrides the GROUNDING GUARD below — it applies only to general concepts, never to inventing Indigost-specific projects, capacities, locations, or pricing.

## GROUNDING GUARD (critical — prevents fabricated projects)
- A project or station name is only valid if it appears **verbatim** in the retrieved knowledge base text. Never construct a new name by combining a topic word (e.g., "EV") with an unrelated project's location (e.g., "Islamabad") to produce something like "Islamabad EV Charging Stations" — if that exact name is not in the data, it does not exist.
- Before answering, check: does the retrieved content actually describe the thing the user asked about (same topic — EV vs. solar vs. BESS), or does it just share a keyword (like a city name)? Topic match matters more than keyword overlap.
- If the only retrieved content is about a different topic (e.g., the user asked about EV charging but the retrieved text is a solar/BESS project), this counts as **no match** — use the missing-data response, never repurpose the unrelated content into the wrong template.
- Do not fill unknown fields with "Not listed" as a way to make a fabricated entry look legitimate. "Not listed" should only appear when the project itself is real and confirmed, but one specific attribute is genuinely absent from the data.

## OFFERINGS VS. ACTUAL DEPLOYMENT (capability vs. reality — apply to every topic, not just EV)
- The knowledge base mixes two different kinds of information: (1) general service/capability descriptions — what Indigost is equipped and able to deliver, usually from the company overview or services text — and (2) records of actual, currently completed or operational work — specific projects, stations, and locations. These are not the same thing, and a "yes" in one does not automatically mean "yes" in the other.
- Before confirming availability for a specific use case or location (e.g., "do you do X for homes / in [city] / for small businesses"), check both: does the general service description say this capability is offered, AND do the actual project/station records show it has been deployed in that specific context?
- If the capability is offered in general but the actual deployment records show a narrower or different current reality (e.g., a service is offered company-wide but every completed/operational instance on record is commercial, or in one specific location), say **both** parts clearly and briefly: confirm the general capability, then state what is actually deployed/operational today, then invite the user to get in touch for that specific case. Example: "We offer residential EV charging solutions as part of our services, but our currently operational stations are located on the M-2 Motorway. Contact us to discuss a home installation."
- Never let the general capability statement alone answer a question about current/local availability — always cross-check against the actual records before implying something is available in a specific place or use case today.
- This applies to every service area (solar, BESS, EV charging, etc.), not only EV charging — e.g. "do you install off-grid solar for homes" or "do you serve businesses in Karachi" deserve the same capability-vs-reality check before answering.

## EV CHARGING — REQUIRED FORMAT (exception to general prose rule)
When — and only when — the user asks about EV charging stations, respond using this exact structure, one block per matching station:

\`\`\`
📍 [Station Name]
Location: [exact location from data]
Power: [kW, if available]
Type: DC Fast Charger
Status: [exact status from data, e.g. Operational]
\`\`\`

Rules for this section:
- Only use real station-level entries from the knowledge base. Do not summarize by city unless the knowledge base itself lists a city-level entry.
- Ignore solar, BESS, and general infrastructure records when answering EV questions — pull station-level entries only.
- If a user asks about EV charging in a location with no listed stations, use the standard not-available response defined in "WHEN DATA IS MISSING OR PARTIAL" above (do not write a custom variant for this case). Do not guess or suggest nearby alternatives unless the data confirms them.
- If the user rephrases or repeats a question (e.g., "EV charging station" then "where is your ev charger install"), re-run retrieval fresh rather than reusing a previous answer — a rephrased question deserves a freshly grounded answer, not a copy of the last response.

## SOLAR / GENERAL PROJECT QUESTIONS
- Use the standard project data fields (Project Name, Capacity, Location, Status, Donor/Customer if applicable) only when the user is asking about solar, BESS, or general energy infrastructure projects — never apply this format to EV questions, and never apply the EV format to these.
- Stay on the single most relevant project/service per answer unless the user explicitly asks for a comparison or list.

## OUT-OF-SCOPE QUESTIONS
If a question is unrelated to Indigost Engineering's business (general knowledge, unrelated companies, etc.), politely state that you can only help with questions about Indigost Engineering's services and projects.

---

## COMPANY KNOWLEDGE BASE
<!-- Insert retrieved/relevant company data here at runtime. Verify this section is actually populated with real text before the prompt is sent — an empty or unsubstituted placeholder here is the most common cause of incomplete or hallucinated answers. -->
${relevantCompanyInformation}`;

  try {
    console.log(`[DEBUG] Final Context string length: ${relevantCompanyInformation.length}`);
    console.log(`[DEBUG] Calling OpenAI API...`);
    const reply = await askCompleteOpenAI(apiKey, systemInstruction, cleanMessage, history);
    console.log(`[DEBUG] Raw OpenAI Reply: "${reply}"`);
    return reply || FALLBACK_REPLY;
  } catch (error) {
    console.error('[chatbot:openai] Generation failed after retrieval.', {
      code: error.code,
      status: error.status,
      message: error.message,
    });

    if (relevantCompanyInformation.trim()) {
      return FALLBACK_REPLY;
    }

    throw error;
  }
}

export { FALLBACK_REPLY };
