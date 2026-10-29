// Lenient answer matching: an answer counts if it is at most one letter away
// from the correct one (a letter missed out, added, or swapped for another).
// Both strings are expected to be normalized already (lowercase, no accents).

const MAX_TYPOS = 1;

// Levenshtein edit distance, stopping early once it exceeds `limit`.
function editDistance(a, b, limit = Infinity) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }
    if (rowMin > limit) return limit + 1;
    prev = curr;
  }
  return prev[b.length];
}

function isCloseMatch(guess, answer) {
  if (!guess || !answer) return false;
  return editDistance(guess, answer, MAX_TYPOS) <= MAX_TYPOS;
}
