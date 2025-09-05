/**
 * Алфавит для шифра Цезаря (строчные буквы)
 */
export const alphabet = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
];

export function rotN(text: string, shift: number, isCipher: boolean) {
  if (isCipher) {
    shift = alphabet.length - shift;
  }

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  return text
    .split("")
    .map((char: string) => {
      const lowerChar = char.toLowerCase();
      const index = alphabet.indexOf(lowerChar);

      if (index === -1) return char;

      const newIndex = mod(index + shift, alphabet.length);
      const newChar = alphabet[newIndex];

      return char === lowerChar ? newChar : newChar.toUpperCase();
    })
    .join("");
}
