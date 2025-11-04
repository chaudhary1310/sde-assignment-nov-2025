/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort ranges by start time
  const sorted = ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let current = [...sorted[0]]; // clone first range

  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];
    const [currStart, currEnd] = current;

    // Check if ranges overlap or are within threshold
    if (nextStart <= currEnd + threshold) {
      // Merge ranges
      current[1] = Math.max(currEnd, nextEnd);
    } else {
      // Push previous range and start new one
      merged.push(current);
      current = [nextStart, nextEnd];
    }
  }

  // Push the final range
  merged.push(current);

  return merged;
};

module.exports = {
  mergeTimeRanges,
};
