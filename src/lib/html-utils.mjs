/**
 * Returns given text converted into a valid HTML id.
 *
 * @param {string} text Text to be converted
 * @returns {string} HTML id
 */
export function generateHtmlId(text) {
  return text
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
}
