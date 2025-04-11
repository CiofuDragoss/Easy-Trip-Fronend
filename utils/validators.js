export const isRequired = (value) =>
  value?.trim() !== "" ? "" : "Acest camp este obligatoriu";
export const isEmail = (value) =>
  /\S+@\S+\.\S+/.test(value) ? "" : "Email invalid";
export const minLen = (len) => (value) =>
  value.length >= len ? "" : `Minim ${len} caractere`;

export const maxLen = (len) => (value) =>
  value.length <= len ? "" : `Maxim ${len} caractere`;

export const checkUpper = (value) =>
  /[A-Z]/.test(value) ? "" : "Trebuie sa contina cel putin o litera mare.";
export const checkLower = (value) =>
  /[a-z]/.test(value) ? "" : "Trebuie sa contina cel putin o litera mica.";
export const checkDigit = (value) =>
  /\d/.test(value) ? "" : "Trebuie cel puțin o cifra";
export const checkSpecial = (value) =>
  /[!@~#$%^&*?]/.test(value)
    ? ""
    : "Trebuie sa contina cel putin un caracter special ex @!~ etc.";
