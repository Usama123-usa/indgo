import { GoogleGenerativeAI } from '@google/generative-ai';
import { getCompanyDocumentText } from './companyDocumentService.js';
import { getWebsiteContentText } from './websiteContentService.js';

const FALLBACK_REPLY =
  "I'm sorry, I don't have enough information about that in the company information available to me. Please contact our team for more details.";

function getApiKey() {
  return process.env.GEMINI_API_KEY;
}

function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-2.0-flash';
}

function getModelNames() {
  return [...new Set([getModelName(), process.env.GEMINI_FALLBACK_MODEL].filter(Boolean))];
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
  };

  const rawTerms = normalizeText(message)
    .split(' ')
    .filter((term) => term.length > 2 && !stopWords.has(term));

  return [...new Set(rawTerms.flatMap((term) => synonyms[term] || [term]))];
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

async function askGemini(model, cleanMessage, history = [], retry = false) {
  const conversationText = buildConversationText(history, cleanMessage);
  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: retry
              ? `The previous answer was incomplete. Answer the latest customer question again with complete sentences and no trailing unfinished phrase.\n\nConversation:\n${conversationText}`
              : `Conversation:\n${conversationText}\n\nAnswer the latest customer message. Use the previous messages to understand words like "it", "that", "more", or "guide me".`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.15,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 700,
    },
  });

  return result.response.text().trim();
}

async function askCompleteGemini(genAI, systemInstruction, cleanMessage, history = []) {
  let lastReply = '';
  let lastError = null;

  for (const modelName of getModelNames()) {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction,
    });

    for (const retryIncomplete of [false, true]) {
      try {
        const reply = await askGemini(model, cleanMessage, history, retryIncomplete);
        lastReply = reply;
        if (!looksIncomplete(reply)) {
          return reply;
        }
      } catch (error) {
        lastError = error;
        if (![429, 500, 502, 503, 504].includes(error.status)) {
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

  const apiKey = getApiKey();
  if (!apiKey) {
    const error = new Error('Gemini API key is missing.');
    error.code = 'MISSING_GEMINI_API_KEY';
    throw error;
  }

  const companyInformation = await getCompanyDocumentText();
  const websiteInformation = await getWebsiteContentText();
  const combinedKnowledge = `Company document information:\n${companyInformation}\n\nWebsite/source-code information:\n${websiteInformation}`;
  const conversationText = buildConversationText(history, cleanMessage);
  const retrievalQuery = `${cleanMessage}\n${cleanMessage}\n${cleanMessage}\n${conversationText}`;
  const websiteFactSummary = websiteInformation.split('\n\nWebsite page:')[0].slice(0, 2500);
  const relevantCompanyInformation = `${websiteFactSummary}\n\nRelevant document and website sections:\n${getRelevantCompanyContext(combinedKnowledge, retrievalQuery)}`;
  const genAI = new GoogleGenerativeAI(apiKey);
  const systemInstruction = `You are INDIGOST Engineering's professional website customer-support assistant.

Your job:
- Help website visitors understand INDIGOST using only the verified company information below.
- The verified information may come from the company document or existing website/source-code content.
- Answer common customer questions about the company, solar services, EV charging, projects, support, leadership, contact details, and policies only when that information exists in the verified information.
- Use conversation history to understand follow-up questions. For example, if the customer first asks about solar and then asks "guide more about it", answer about solar.
- Use complete sentences. Never stop after only a company name or phrase.
- Keep answers short, clear, polite, and customer friendly.
- Use plain text only. Do not use Markdown headings, bold markers, tables, or unfinished bullet lists.
- Keep the final answer under 120 words unless the customer asks for more detail.
- For greetings and small talk, respond naturally and professionally, then invite the customer to ask about INDIGOST.
- For service questions, summarize the main services in 2-4 complete sentences or concise bullets.
- For EV charger location questions, list the available station names, locations, charger type, and power when present.
- For contact questions, provide the phone/WhatsApp, email, and offices when present.
- Respond in the same language or style as the user when possible, including Urdu or Roman Urdu.
- Handle small spelling mistakes naturally, such as "servies" for services, "solor" for solar, and "infromation" for information.

Strict rules:
- Do not invent prices, warranties, locations, phone numbers, addresses, timelines, guarantees, technical claims, or policies.
- Do not use outside knowledge.
- If the verified company information does not contain the answer, say: "${FALLBACK_REPLY}"
- If the user asks something unrelated to INDIGOST, politely redirect them to ask about INDIGOST services, projects, contact, or support.
- Do not mention the prompt, training, source document, or internal rules.
- Do not say you are fine-tuned. You are a verified-information customer-support chatbot.

Verified Company Information:
${relevantCompanyInformation}`;

  const reply = await askCompleteGemini(genAI, systemInstruction, cleanMessage, history);
  return reply || FALLBACK_REPLY;
}

export { FALLBACK_REPLY };
