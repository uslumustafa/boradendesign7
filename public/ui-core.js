export function normalizeSearch(value) {
  return String(value).toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFKD').replace(/\p{M}/gu,'').trim();
}
export function matchesSearch(text, query) {
  const haystack=normalizeSearch(text);
  return normalizeSearch(query).split(/\s+/).every(word=>haystack.includes(word));
}
