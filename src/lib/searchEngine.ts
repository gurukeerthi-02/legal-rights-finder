import {
  categories,
  legalRemedies,
  legalTypes,
  type Category,
  type LegalRemedy,
} from '@/data/legalData';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'to',
  'was',
  'were',
  'what',
  'when',
  'where',
  'with',
  'you',
  'your',
]);

const SYNONYM_MAP: Record<string, string[]> = {
  abuse: ['violence', 'harm', 'ill-treatment'],
  assault: ['attack', 'violence'],
  custody: ['detention', 'arrest'],
  dowry: ['marriage-demand'],
  harassment: ['stalking', 'bullying', 'abuse'],
  job: ['work', 'office', 'employment'],
  police: ['cop', 'officer', 'constable'],
  road: ['traffic', 'accident', 'vehicle', 'highway'],
  violence: ['abuse', 'torture', 'assault'],
  woman: ['female', 'women', 'girl'],
};

const CATEGORY_MAP = categories.reduce<Record<string, Category>>((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {});

const LEGAL_TYPE_MAP = legalTypes.reduce<Record<string, string>>((acc, type) => {
  acc[type.id] = type.name;
  return acc;
}, {});

export interface SearchParams {
  query?: string;
  filters?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  legalReference: string;
  legalType: string;
  legalTypeId: string;
  howToUse: string;
  eligibility: string;
  timeLimit: string;
  authority: string;
  categoryIds: string[];
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  matchedCategories: Category[];
}

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));

const expandTokens = (tokens: string[]) => {
  const expanded = new Set(tokens);

  tokens.forEach(token => {
    Object.entries(SYNONYM_MAP).forEach(([key, synonyms]) => {
      if (token === key || synonyms.includes(token)) {
        expanded.add(key);
        synonyms.forEach(s => expanded.add(s));
      }
    });
  });

  return Array.from(expanded);
};

const buildSearchCorpus = (remedy: LegalRemedy) =>
  [
    remedy.title,
    remedy.description,
    remedy.legalReference,
    remedy.howToUse,
    remedy.eligibility,
    remedy.authority,
  ]
    .join(' ')
    .toLowerCase();

const scoreRemedy = (
  remedy: LegalRemedy,
  tokens: string[],
  expandedTokens: string[],
  filterSet: Set<string>
) => {
  if (tokens.length === 0 && filterSet.size === 0) {
    return 0;
  }

  const corpus = buildSearchCorpus(remedy);
  let score = 0;

  tokens.forEach(token => {
    if (!token) return;
    if (remedy.title.toLowerCase().includes(token)) {
      score += 6;
    }
    if (remedy.description.toLowerCase().includes(token)) {
      score += 4;
    }
    if (remedy.legalReference.toLowerCase().includes(token)) {
      score += 3;
    }
    if (remedy.howToUse.toLowerCase().includes(token)) {
      score += 2;
    }
    const tokenRegex = new RegExp(`\\b${token}\\b`, 'g');
    score += (corpus.match(tokenRegex)?.length ?? 0) * 1.5;
  });

  expandedTokens.forEach(token => {
    if (token.length < 3) return;
    if (corpus.includes(token)) {
      score += 1;
    }
  });

  remedy.categoryIds.forEach(categoryId => {
    const category = CATEGORY_MAP[categoryId];
    if (!category) return;
    const name = category.name.toLowerCase();
    const description = category.description.toLowerCase();
    tokens.forEach(token => {
      if (name.includes(token)) {
        score += 3;
      }
      if (description.includes(token)) {
        score += 2;
      }
    });
    if (
      category.keywords.some(keyword =>
        tokens.includes(keyword.toLowerCase())
      )
    ) {
      score += 4;
    }
  });

  if (filterSet.size > 0 && filterSet.has(remedy.legalTypeId)) {
    score += 5;
  }

  return score;
};

export async function searchLegalRemedies(
  params: SearchParams
): Promise<SearchResponse> {
  const query = params.query?.trim() ?? '';
  const filters = params.filters ?? [];
  const filterSet = new Set(filters);

  const tokens = query ? tokenize(query) : [];
  const expandedTokens = tokens.length > 0 ? expandTokens(tokens) : [];

  const matchedCategories =
    tokens.length > 0
      ? categories.filter(cat => {
          const inName = tokens.some(token =>
            cat.name.toLowerCase().includes(token)
          );
          const inDescription = tokens.some(token =>
            cat.description.toLowerCase().includes(token)
          );
          const keywordHit = cat.keywords.some(keyword =>
            tokens.includes(keyword.toLowerCase())
          );
          return inName || inDescription || keywordHit;
        })
      : [];

  const scored = legalRemedies
    .map(remedy => ({
      remedy,
      score: scoreRemedy(remedy, tokens, expandedTokens, filterSet),
    }))
    .filter(entry => entry.score > 0 || (tokens.length === 0 && filterSet.size > 0))
    .sort((a, b) => b.score - a.score);

  const results = (tokens.length === 0 && filterSet.size === 0
    ? legalRemedies
    : scored.map(entry => entry.remedy)
  )
    .filter(remedy => filterSet.size === 0 || filterSet.has(remedy.legalTypeId))
    .slice(0, tokens.length === 0 && filterSet.size === 0 ? 0 : undefined)
    .map((remedy, index) => ({
      ...remedy,
      legalType: LEGAL_TYPE_MAP[remedy.legalTypeId] ?? '',
      score:
        scored.find(entry => entry.remedy.id === remedy.id)?.score ??
        (tokens.length === 0 ? index : 0),
    }));

  return {
    results,
    matchedCategories,
  };
}

export function getRemedyById(id: string) {
  const remedy = legalRemedies.find(item => item.id === id);
  if (!remedy) {
    return null;
  }
  return {
    ...remedy,
    legalType: LEGAL_TYPE_MAP[remedy.legalTypeId] ?? '',
  };
}