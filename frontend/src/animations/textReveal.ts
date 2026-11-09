export function splitTextIntoChars(text: string): string[] {
  return text.split('').map((char) => (char === ' ' ? '\u00A0' : char))
}

export function splitTextIntoWords(text: string): string[] {
  return text.split(' ')
}
