import {
  backspaceReg,
  cvvReg,
  expireDateReg,
  everyFourSymbol,
  nameReg,
  panReg,
  phoneReg,
  slashReg,
} from "utils/consts/validateRegex";

export const checkName = (value: string): string => {
  if (value.length < 2 || value.length > 30) return "Поле должно содержать от 2 до 30 букв";
  else if (!nameReg.test(value)) return "Допустимы только буквы";
  return "right";
};
export const checkMiddleName = (value: string): string => {
  return value.length == 0 ? "right" : checkName(value);
};

export const checkPhone = (value: string): string => {
  return phoneReg.test(value) ? "right" : "Некорректный номер телефона";
};

export const checkPan = (value: string): string => {
  return panReg.test(value) ? "right" : "Некорректный номер карты";
};

export const checkExpireDate = (value: string): string => {
  return expireDateReg.test(value) ? "right" : "Некорректная дата";
};

export const checkCvv = (value: string): string => {
  if (value.length != 3) return "cvv содержит 3 цифры";
  else if (cvvReg.test(value)) return "cvv содержит только цифры";
  return "right";
};

export const deleteBackSpace = (value: string) => {
  return value.replace(backspaceReg, "");
};

export const getCurrentPan = (value: string) => {
  return deleteBackSpace(value).replace(everyFourSymbol, "$& ");
};

export const getCurrentExpireDate = (value: string) => {
  return deleteBackSpace(value)
    .replace(slashReg, "")
    .replace(/^[0-9]{2}/g, "$&/");
};
