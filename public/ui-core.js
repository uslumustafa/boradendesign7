export function normalizeSearch(value) {
  return String(value).toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFKD').replace(/\p{M}/gu,'').trim();
}
export function matchesSearch(text, query) {
  const haystack=normalizeSearch(text);
  return normalizeSearch(query).split(/\s+/).every(word=>haystack.includes(word));
}
export const heroMotionAllowed=(paused,pageHidden,visibleFraction,dialogOpen)=>!paused && !pageHidden && visibleFraction>=.2 && !dialogOpen;
export function archivePageState(records, query, year, page=1) {
  const matches=records.flatMap((record,index)=>matchesSearch(record.text,query) && (!year || record.year===year) ? [index] : []);
  const pages=Math.max(1,Math.ceil(matches.length/12));
  const current=Math.min(pages,Math.max(1,Math.trunc(Number(page)) || 1));
  return {indices:matches.slice((current-1)*12,current*12),count:matches.length,pages,current};
}
