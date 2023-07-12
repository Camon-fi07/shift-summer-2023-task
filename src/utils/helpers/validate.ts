const checkName = (value: string): string => {
  if (value.length < 2 || value.length > 30) return "Поле должно содержать от 2 до 30 букв";
  else if (!nameReg.test(value)) return "Допустимы только буквы";
  return "right";
};
const checkMiddleName = (value: string): string => {
  return value.length == 0 ? "right" : checkName(value);
};

const checkPhone = (value: string): string => {
  return phoneReg.test(value) ? "right" : "Некорректный номер телефона";
};

const checkCvv = (value: string): string => {
  if (value.length != 3) return "cvv содержит 3 цифры";
  else if (cvvReg.test(value)) return "cvv содержит только цифры";
  return "right";
};
