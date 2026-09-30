export function normalizeSearch(value) {
  return String(value).toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFKD').replace(/\p{M}/gu,'').trim();
}
export function matchesSearch(text, query) {
  const haystack=normalizeSearch(text);
  return normalizeSearch(query).split(/\s+/).every(word=>haystack.includes(word));
}
export function sceneState(top,height,viewport) {
  const progress=Math.max(0,Math.min(1,-top/Math.max(1,height-viewport)));
  return {progress,index:Math.min(2,Math.floor(progress*3)),scale:1.03+(progress*3%1)*.055};
}
