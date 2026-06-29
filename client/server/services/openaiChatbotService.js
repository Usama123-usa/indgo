import { getCompanyDocumentText } from './companyDocumentService.js';
import { answerProjectQuestion, getProjectIndex, searchProjectRecords } from './projectKnowledgeService.js';
import { getWebsiteContentText } from './websiteContentService.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const FALLBACK_REPLY =
  "This specific detail is not available in Indigost Engineering's current documentation.";

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

function getWebsiteProjectContext(websiteInformation) {
  const startMarker = 'Website page: src/pages/Projects.jsx';
  const startIndex = websiteInformation.indexOf(startMarker);

  if (startIndex === -1) {
    return '';
  }

  const remainingText = websiteInformation.slice(startIndex);
  const nextPageIndex = remainingText.indexOf('\n\nWebsite page:', startMarker.length);
  const projectText = nextPageIndex === -1 ? remainingText : remainingText.slice(0, nextPageIndex);

  return projectText.slice(0, 70000);
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

  return (
    cleanReply.length < 40 ||
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

async function askOpenAI(apiKey, model, systemInstruction, cleanMessage, history = [], retry = false) {
  const conversationText = buildConversationText(history, cleanMessage);
  const input = retry
    ? `The previous answer was incomplete. Answer the latest customer question again with complete sentences and no trailing unfinished phrase.\n\nConversation:\n${conversationText}`
    : `Conversation:\n${conversationText}\n\nAnswer the latest customer message. Use the previous messages to understand words like "it", "that", "more", or "guide me".`;

  const response = await fetch(OPENAI_API_URL, {
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
      max_output_tokens: 1200,
    }),
  });

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
  const projectResults = searchProjectRecords(projectIndex.records, retrievalQuery, 20);
  const deterministicProjectAnswer = answerProjectQuestion(projectIndex.records, cleanMessage);

  const apiKey = getApiKey();
  if (!apiKey) {
    const error = new Error('OpenAI API key is missing.');
    error.code = 'MISSING_OPENAI_API_KEY';
    throw error;
  }

  const combinedKnowledge = `Structured project database records:\n${projectIndex.searchableText}\n\nLatest website/source-code information:\n${websiteInformation}\n\nUploaded company document information:\n${companyInformation}`;
  const websiteFactSummary = websiteInformation.split('\n\nWebsite page:')[0].slice(0, 2500);
  const projectContext = isProjectDataQuery(retrievalQuery)
    ? `\n\nTop structured project records for project/statistics questions:\n${projectResults
        .map((item, index) => `Retrieved Project Chunk ${index + 1} | Similarity Score: ${item.score}\n${item.project.searchText}`)
        .join('\n\n')}\n\nFull website project records for project/statistics questions:\n${getWebsiteProjectContext(websiteInformation)}`
    : '';
  const companyContext = getRelevantCompanyContext(combinedKnowledge, retrievalQuery);
  const deterministicSection = deterministicProjectAnswer
    ? `\n\nPre-computed answer for this query (use as authoritative data in your response):\n${deterministicProjectAnswer}`
    : '';
  const relevantCompanyInformation = `${websiteFactSummary}${projectContext}${deterministicSection}\n\nRelevant website, structured, and document sections:\n${companyContext}`;
  logRetrieval({
    query: cleanMessage,
    projectResults,
    companyContext,
    finalContext: relevantCompanyInformation,
  });  const systemInstruction = `# Indigost Engineering — AI Assistant System Prompt (Revised)

## ROLE
You are the official AI assistant for Indigost Engineering (Pvt) Ltd. You answer questions about Indigost Engineering's services, projects, and capabilities, grounded strictly in the company data provided to you below.

## DATA SOURCE
You may only use information found in the "COMPANY KNOWLEDGE BASE" section at the bottom of this prompt. Do not use general world knowledge to fill gaps. Do not assume facts that aren't present in that data.

## PRIORITY ORDER (apply in this order when answering)
1. **Grounding** — Does the knowledge base contain information relevant to this question? If no relevant data exists, say so honestly (see "When Data Is Missing" below) rather than guessing.
2. **Scope match** — Answer only the question asked. Do not pivot to a different project, service, or topic just because it appears in the knowledge base.
3. **Format** — Use the correct output format for the topic (see "EV Charging Format" below for the one required exception; everything else uses normal prose).
4. **Completeness** — Within the matched scope, give a full, useful answer — not a one-line fragment, but also not padded with unrelated information.

## GENERAL RESPONSE RULES
- Write in complete, professional sentences for all topics **except** EV charging station listings, which use the fixed field format below.
- Always give a **thorough, helpful answer** — never a one-liner unless the question itself is trivially simple (e.g., a pure greeting).
- Match your level of detail to the question:
  - If the user asks a **specific** question (e.g., "Do you offer net metering?" or "Is there a station in Karachi?"), fully answer that question AND add relevant helpful context — e.g., what IS available, how the user can proceed, or who to contact. Aim for at least 4–6 sentences.
  - If the user asks a **broad** question (e.g., "What services do you offer?" or "Tell me about your projects"), list **all** relevant matching items from the knowledge base and explain each one briefly — not just one.
  - If the user is asking about their own use-case (e.g., "I want to install solar in my house"), go beyond confirming you offer the service — explain the process, what Indigost provides, and how they can get started.
- After answering the main question, always end with a relevant follow-up offer or contact suggestion where appropriate (e.g., "For more details or to get a quote, you can reach Indigost Engineering at...").
- Never mix unrelated services or projects into the same answer unless the user's question genuinely spans both.
- Use bullet points when listing multiple distinct items (e.g., multiple services, multiple stations, multiple steps). Otherwise use prose.

## WHEN DATA IS MISSING OR PARTIAL
- If there is no matching data at all: "This specific detail is not available in Indigost Engineering's current documentation."
- If there is partial/ambiguous data (e.g., the location name almost matches but isn't exact): ask a clarifying question instead of guessing which record the user means.
- Never invent project names, capacities, locations, or specifications that are not explicitly in the knowledge base.

## GROUNDING GUARD (critical — prevents fabricated projects)
- A project or station name is only valid if it appears **verbatim** in the retrieved knowledge base text. Never construct a new name by combining a topic word (e.g., "EV") with an unrelated project's location (e.g., "Islamabad") to produce something like "Islamabad EV Charging Stations" — if that exact name is not in the data, it does not exist.
- Before answering, check: does the retrieved content actually describe the thing the user asked about (same topic — EV vs. solar vs. BESS), or does it just share a keyword (like a city name)? Topic match matters more than keyword overlap.
- If the only retrieved content is about a different topic (e.g., the user asked about EV charging but the retrieved text is a solar/BESS project), this counts as **no match** — use the missing-data response, never repurpose the unrelated content into the wrong template.
- Do not fill unknown fields with "Not listed" as a way to make a fabricated entry look legitimate. "Not listed" should only appear when the project itself is real and confirmed, but one specific attribute is genuinely absent from the data.

## EV CHARGING — REQUIRED FORMAT (exception to general prose rule)
When — and only when — the user asks about EV charging stations, respond using this exact structure, one block per matching station:

\`\`\`
📍 [Station Name]
Location: [exact location from data]
Power: [kW, if available]
Type: DC Fast Charger
Status: [Ongoing / Available]
\`\`\`

Rules for this section:
- Only use real station-level entries from the knowledge base. Do not summarize by city unless the knowledge base itself lists a city-level entry.
- Ignore solar, BESS, and general infrastructure records when answering EV questions — pull station-level entries only.
- If a user asks about EV charging in a location with no listed stations, respond exactly: "No EV charging station data is available for that location in the system." Do not guess or suggest nearby alternatives unless the data confirms them.
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
