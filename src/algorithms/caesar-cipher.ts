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

/**
 * Класс шифра Цезаря
 * Принимает на вход алфавит, имеет методы encode и decode, которые принимают строку и сдвиг, а возвращают зашифрованную/расшифрованную строку.
 */
export class RotN {
  alphabet: string[];

  constructor(alphabet: string[]) {
    this.alphabet = alphabet;
  }

  encode(text: string, shift: number) {
    return this.#rotN(text, shift);
  }

  decode(text: string, shift: number) {
    return this.#rotN(text, -shift);
  }

  #mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  #rotN(text: string, shift: number) {
    return text
      .split("")
      .map((char: string) => {
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);

        if (index === -1) return char;

        const newIndex = this.#mod(index + shift, alphabet.length);
        const newChar = alphabet[newIndex];

        return char === lowerChar ? newChar : newChar.toUpperCase();
      })
      .join("");
  }
}
