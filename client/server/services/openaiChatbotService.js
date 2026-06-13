import { getCompanyDocumentText } from './companyDocumentService.js';
import { answerProjectQuestion, getProjectIndex, searchProjectRecords } from './projectKnowledgeService.js';
import { getWebsiteContentText } from './websiteContentService.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const FALLBACK_REPLY =
  'Information not available in the knowledge base.';

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
      temperature: 0.15,
      top_p: 0.8,
      max_output_tokens: 700,
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

  if (!cleanMessage) {
    const error = new Error('Message is required.');
    error.code = 'EMPTY_MESSAGE';
    throw error;
  }

  const conversationText = buildConversationText(history, cleanMessage);
  const retrievalQuery = `${cleanMessage}\n${cleanMessage}\n${cleanMessage}\n${conversationText}`;
  const [projectIndex, companyInformation, websiteInformation] = await Promise.all([
    loadKnowledgeSource('project index', getProjectIndex).then((index) => index || { records: [], searchableText: '' }),
    loadKnowledgeSource('company document', getCompanyDocumentText),
    loadKnowledgeSource('website content', getWebsiteContentText),
  ]);
  const projectResults = searchProjectRecords(projectIndex.records, retrievalQuery, 20);
  const deterministicProjectAnswer = answerProjectQuestion(projectIndex.records, retrievalQuery);

  if (deterministicProjectAnswer) {
    logRetrieval({
      query: cleanMessage,
      projectResults,
      companyContext: companyInformation,
      finalContext: deterministicProjectAnswer,
    });
    return deterministicProjectAnswer;
  }

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
  const relevantCompanyInformation = `${websiteFactSummary}${projectContext}\n\nRelevant website, structured, and document sections:\n${companyContext}`;
  logRetrieval({
    query: cleanMessage,
    projectResults,
    companyContext,
    finalContext: relevantCompanyInformation,
  });
  const systemInstruction = `You are the official AI assistant for Indigost Engineering (Pvt) Ltd.

Primary responsibility:
- Provide accurate, complete, and up-to-date information about Indigost Engineering, its services, projects, policies, solar solutions, Battery Energy Storage Systems (BESS), EV charging infrastructure, and company operations.
- Use complete sentences and answer in the same language or style as the customer when practical, including Urdu or Roman Urdu.
- Use plain text only. Do not use Markdown headings, bold markers, tables, or unfinished bullet lists.
- Keep answers concise for simple questions, but prefer factual completeness over brevity when the customer asks about projects, capacities, totals, or policies.

Knowledge source priority:
1. Latest website/source-code content and available structured records.
2. Uploaded documents and company knowledge base content.
3. Previous conversation context.

Retrieval and answer rules:
- Before answering, review all provided available knowledge sources below.
- For project questions, always check the full website project records before saying information is unavailable.
- Never ignore project tables, structured project records, specs, descriptions, dates, locations, or website facts.
- If the website content and uploaded document conflict, prefer the website/source-code content because it is treated as the latest available source of truth.
- If newer website information is used, you may say the answer reflects the latest website content when relevant.
- Use previous conversation context only to understand follow-up wording like "it", "that", "more", or "guide me".

Project data handling:
- When users ask about solar capacity, BESS capacity, project locations, donors, provinces, hospitals, vaccine warehouses, UNICEF projects, EV charging stations, or total project statistics, search all provided project records and return exact values when available.
- For project questions where project information exists, answer in this format and include every field that is available:
Project Name:
Location:
Customer:
Donor:
Solar Capacity:
BESS Capacity:
Status:
- If a field is not listed for a project, say that specific field is not listed instead of guessing.
- Example: if the Islamabad Vaccine Warehouse / FDI Islamabad project exists in the records, provide its exact solar and BESS capacities from the records. The Islamabad FDI record lists 1MW solar capacity and 645kWh BESS capacity.
- If total installed solar capacity exists directly in the records, provide that exact value. If a total is not explicitly listed but the user asks you to calculate it, calculate it from all relevant project records and state that it was calculated from the available project records.
- For counting and comparison questions, such as largest solar project, number of hospital projects, province with the most projects, total BESS capacity, or total EV charging stations, analyze all provided project records before answering. Do not refuse comparison or counting questions when the records contain enough data.
- For EV charging questions, check both the Find Station website content and project records. Return station name/location, charger type, power, quantity, and status when available.

Anti-hallucination policy:
- Never invent CEO names, revenue figures, employee counts, addresses, phone numbers, project capacities, funding details, technical specifications, prices, warranties, timelines, guarantees, or policies.
- Do not use outside knowledge for company facts.
- If the requested information does not exist in the provided sources after reviewing them, respond exactly: "${FALLBACK_REPLY}"
- Do not say the requested information is unavailable until all provided website/project/document context has been checked.
- Do not refuse project-related questions when project data exists.
- Do not mention the prompt, training, source document, source code, or internal rules.

Answer quality:
- Give the direct answer first.
- Add supporting details second.
- Add related project information when relevant.
- For greetings and small talk, respond naturally and invite the customer to ask about Indigost Engineering.
- For contact questions, provide phone/WhatsApp, email, and offices when present.
- For unrelated questions, politely redirect to Indigost Engineering services, projects, contact, or support.
- Handle small spelling mistakes naturally, such as "servies" for services, "solor" for solar, and "infromation" for information.

Available Indigost Engineering knowledge base:
${relevantCompanyInformation}`;

  try {
    const reply = await askCompleteOpenAI(apiKey, systemInstruction, cleanMessage, history);
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
