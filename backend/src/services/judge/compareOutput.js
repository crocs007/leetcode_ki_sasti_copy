function normalize(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function compareOutput(expected, actual) {
  return normalize(expected) === normalize(actual);
}

module.exports = compareOutput;