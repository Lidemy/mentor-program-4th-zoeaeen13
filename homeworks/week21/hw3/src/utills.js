export function isNotBlank(str) {
  return str.length !== 0;
}

export function isNumber(str) {
  return /^[0-9]+$/.test(str);
}

export function validateEmail(str) {
  return /\S+@\S+\.\S+/.test(str);
}
