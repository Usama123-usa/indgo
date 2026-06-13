import fs from 'node:fs/promises';
import path from 'node:path';

const CLIENT_ROOTS = [process.cwd(), path.join(process.cwd(), 'client')];

let cachedProjectIndex = null;

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractStringField(block, fieldName) {
  const match = block.match(new RegExp(`${fieldName}:\\s*"([\\s\\S]*?)"\\s*,`));
  return match ? decodeSourceText(match[1].trim()) : '';
}

function decodeSourceText(text) {
  return text
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .replace(/â€“/g, '-')
    .replace(/â€™/g, "'")
    .replace(/â€”/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSpecs(block) {
  const specsBlock = block.match(/specs:\s*\[([\s\S]*?)\]\s*,/);
  if (!specsBlock) {
    return [];
  }

  return [...specsBlock[1].matchAll(/value:\s*"([^"]+)"\s*,\s*label:\s*"([^"]+)"/g)].map((match) => ({
    value: decodeSourceText(match[1]),
    label: decodeSourceText(match[2]),
  }));
}

function getSpecValue(specs, wantedLabels) {
  const wanted = wantedLabels.map(normalizeText);
  const spec = specs.find((item) => wanted.includes(normalizeText(item.label)));
  return spec?.value || '';
}

function inferProvince(location) {
  const normalized = normalizeText(location);

  if (normalized.includes('sindh') || normalized.includes('karachi') || normalized.includes('badin') || normalized.includes('sujawal') || normalized.includes('tando')) {
    return 'Sindh';
  }

  if (
    normalized.includes('balochistan') ||
    normalized.includes('nasirabad') ||
    normalized.includes('jaffarabad') ||
    normalized.includes('loralai') ||
    normalized.includes('lasbela') ||
    normalized.includes('uthal') ||
    normalized.includes('dera')
  ) {
    return 'Balochistan';
  }

  if (
    normalized.includes('punjab') ||
    normalized.includes('lahore') ||
    normalized.includes('multan') ||
    normalized.includes('bahawalpur') ||
    normalized.includes('attock') ||
    normalized.includes('lodhran') ||
    normalized.includes('kasur') ||
    normalized.includes('rajanpur')
  ) {
    return 'Punjab';
  }

  if (normalized.includes('islamabad')) {
    return 'Islamabad';
  }

  return '';
}

function inferCustomer(title, description) {
  const source = `${title} ${description}`;
  if (/unicef/i.test(source)) {
    return 'UNICEF';
  }

  const titleParts = title.split(/\s+-\s+/);
  if (titleParts[1]) {
    return titleParts[1].replace(/^for\s+/i, '').trim();
  }

  const forMatch = description.match(/\bfor\s+(.+?)(?:\s+at\s+|\s+in\s+|\s+under\s+|,)/i);
  return forMatch ? decodeSourceText(forMatch[1]) : '';
}

function inferDonor(title, description) {
  return /unicef/i.test(`${title} ${description}`) ? 'UNICEF' : '';
}

function inferStatus(date, description) {
  if (/in process/i.test(`${date} ${description}`)) {
    return 'In Process';
  }

  if (/successfully|completed|delivered|implemented|executed/i.test(description)) {
    return 'Commissioned';
  }

  return date || '';
}

function capacityToKw(value) {
  const match = String(value || '').replace(/,/g, '').match(/([\d.]+)\s*(mw|kwp|kw)\b/i);
  if (!match) {
    return null;
  }

  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) {
    return null;
  }

  return match[2].toLowerCase() === 'mw' ? amount * 1000 : amount;
}

function bessToKwh(value) {
  const match = String(value || '').replace(/,/g, '').match(/([\d.]+)\s*(mwh|kwh)\b/i);
  if (!match) {
    return null;
  }

  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) {
    return null;
  }

  return match[2].toLowerCase() === 'mwh' ? amount * 1000 : amount;
}

function formatKw(value) {
  return Number.isInteger(value) ? `${value} kW` : `${Number(value.toFixed(2))} kW`;
}

function formatKwh(value) {
  return Number.isInteger(value) ? `${value} kWh` : `${Number(value.toFixed(2))} kWh`;
}

function projectToSearchableText(project) {
  return [
    `Project Name: ${project.name}`,
    `Location: ${project.location || 'Not listed'}`,
    `Province: ${project.province || 'Not listed'}`,
    `Customer: ${project.customer || 'Not listed'}`,
    `Donor: ${project.donor || 'Not listed'}`,
    `Solar Capacity: ${project.solarCapacity || 'Not listed'}`,
    `BESS Capacity: ${project.bessCapacity || 'Not listed'}`,
    `EV Power: ${project.evPower || 'Not listed'}`,
    `Quantity: ${project.quantity || 'Not listed'}`,
    `Status: ${project.status || 'Not listed'}`,
    `Date: ${project.date || 'Not listed'}`,
    `Category: ${project.category || 'Not listed'}`,
    `Description: ${project.description || 'Not listed'}`,
  ].join('\n');
}

function createProjectRecord(block) {
  const specs = extractSpecs(block);
  const title = extractStringField(block, 'title');
  const description = extractStringField(block, 'description');
  const location = extractStringField(block, 'location');
  const date = extractStringField(block, 'date');
  const category = extractStringField(block, 'category');
  const solarCapacity = getSpecValue(specs, ['Capacity']);
  const bessCapacity = getSpecValue(specs, ['BESS']);
  const evPower = getSpecValue(specs, ['Power']);
  const quantity = getSpecValue(specs, ['Quantity']);
  const project = {
    name: title,
    location,
    province: inferProvince(location),
    customer: inferCustomer(title, description),
    donor: inferDonor(title, description),
    solarCapacity,
    solarKw: capacityToKw(solarCapacity),
    bessCapacity,
    bessKwh: bessToKwh(bessCapacity),
    evPower,
    evPowerKw: capacityToKw(evPower),
    quantity,
    status: inferStatus(date, description),
    date,
    category,
    description,
    specs,
  };

  project.searchText = projectToSearchableText(project);
  project.normalizedSearchText = normalizeText(project.searchText);

  return project.name ? project : null;
}

async function readProjectsSource() {
  for (const clientRoot of CLIENT_ROOTS) {
    try {
      return await fs.readFile(path.join(clientRoot, 'src/pages/Projects.jsx'), 'utf8');
    } catch {
      // Try the next possible root.
    }
  }

  return '';
}

function parseProjectRecords(source) {
  const projectArray = source.match(/const projects = \[([\s\S]*?)\n\s*\];/);
  if (!projectArray) {
    return [];
  }

  const blocks = [];
  let depth = 0;
  let startIndex = -1;
  let inString = false;
  let escaped = false;
  const text = projectArray[1];

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      escaped = char === '\\' && !escaped;
      if (char === '"' && !escaped) {
        inString = false;
      }
      if (char !== '\\') {
        escaped = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      if (depth === 0) {
        startIndex = index;
      }
      depth += 1;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0 && startIndex !== -1) {
        blocks.push(text.slice(startIndex, index + 1));
        startIndex = -1;
      }
    }
  }

  return blocks
    .filter((block) => /\bid:\s*\d+/.test(block))
    .map((block) => createProjectRecord(block))
    .filter(Boolean);
}

export async function getProjectIndex() {
  if (cachedProjectIndex) {
    return cachedProjectIndex;
  }

  const source = await readProjectsSource();
  const records = parseProjectRecords(source);
  cachedProjectIndex = {
    records,
    searchableText: records.map((project, index) => `Project Record ${index + 1}\n${project.searchText}`).join('\n\n'),
  };

  return cachedProjectIndex;
}

export function searchProjectRecords(records, query, limit = 20) {
  const terms = normalizeText(query)
    .split(' ')
    .filter((term) => term.length > 2);

  if (!terms.length) {
    return records.slice(0, limit).map((project) => ({ project, score: 1 }));
  }

  return records
    .map((project) => {
      const score = terms.reduce((total, term) => {
        const exactMatches = project.normalizedSearchText.split(term).length - 1;
        const partialMatch = project.normalizedSearchText.includes(term.slice(0, Math.max(4, term.length - 1))) ? 1 : 0;
        return total + exactMatches * 4 + partialMatch;
      }, 0);

      return { project, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.project.name.localeCompare(b.project.name))
    .slice(0, limit);
}

function findSpecificProject(records, query) {
  const normalized = normalizeText(query);

  if (normalized.includes('islamabad') && (normalized.includes('vaccine') || normalized.includes('warehouse') || normalized.includes('fdi'))) {
    const fdi = records.find((project) => normalizeText(project.name).includes('fdi islamabad'));
    if (fdi) {
      return fdi;
    }
  }

  const results = searchProjectRecords(records, query, 5);
  return results[0]?.score >= 8 ? results[0].project : null;
}

function formatProjectAnswer(project) {
  const solarCapacity = project.solarKw !== null ? formatKw(project.solarKw) : project.solarCapacity;
  const bessCapacity = project.bessKwh !== null ? formatKwh(project.bessKwh) : project.bessCapacity;

  return [
    `Project Name: ${project.name}`,
    `Location: ${project.location || 'Not listed'}`,
    `Customer: ${project.customer || 'Not listed'}`,
    `Donor: ${project.donor || 'Not listed'}`,
    `Solar Capacity: ${solarCapacity || 'Not listed'}`,
    `BESS Capacity: ${bessCapacity || 'Not listed'}`,
    `Status: ${project.status || 'Not listed'}`,
  ].join('\n');
}

export function answerProjectQuestion(records, query) {
  const normalized = normalizeText(query);
  const isProjectQuery = /\b(project|capacity|bess|battery|solar|hospital|warehouse|vaccine|unicef|province|station|total|largest|most|count|how many)\b/.test(
    normalized,
  );

  if (!isProjectQuery || !records.length) {
    return '';
  }

  if (normalized.includes('largest') && normalized.includes('bess')) {
    const project = records
      .filter((item) => item.bessKwh !== null)
      .sort((a, b) => b.bessKwh - a.bessKwh)[0];
    return project
      ? `The largest BESS project in the available project records is ${project.name} with ${project.bessCapacity} BESS capacity.\n\n${formatProjectAnswer(project)}`
      : '';
  }

  if (normalized.includes('largest') && normalized.includes('solar')) {
    const project = records
      .filter((item) => item.solarKw !== null)
      .sort((a, b) => b.solarKw - a.solarKw)[0];
    return project
      ? `The largest solar project in the available project records is ${project.name} with ${project.solarCapacity} solar capacity.\n\n${formatProjectAnswer(project)}`
      : '';
  }

  if (normalized.includes('total') && normalized.includes('bess')) {
    const total = records.reduce((sum, project) => sum + (project.bessKwh || 0), 0);
    return total > 0 ? `Total BESS Capacity: ${formatKwh(total)}\nThis total is calculated from all available project records that list BESS capacity.` : '';
  }

  if (normalized.includes('total') && normalized.includes('solar')) {
    const total = records.reduce((sum, project) => sum + (project.solarKw || 0), 0);
    return total > 0 ? `Total Solar Capacity: ${formatKw(total)}\nThis total is calculated from all available project records that list solar capacity.` : '';
  }

  if ((normalized.includes('hospital') || normalized.includes('hospitals')) && (normalized.includes('count') || normalized.includes('how many'))) {
    const hospitalProjects = records.filter((project) => /\b(hospital|dhq|dho|healthcare)\b/i.test(`${project.name} ${project.description}`));
    return `Hospital Project Count: ${hospitalProjects.length}\nProjects: ${hospitalProjects.map((project) => project.name).join('; ')}`;
  }

  if (normalized.includes('province') && normalized.includes('most')) {
    const counts = records.reduce((totals, project) => {
      const province = project.province || 'Not listed';
      totals.set(province, (totals.get(province) || 0) + 1);
      return totals;
    }, new Map());
    const [province, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] || [];
    return province ? `Province with Most Projects: ${province}\nProject Count: ${count}` : '';
  }

  const project = findSpecificProject(records, query);
  if (project) {
    return formatProjectAnswer(project);
  }

  return '';
}
