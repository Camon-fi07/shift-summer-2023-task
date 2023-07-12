export const nameReg = new RegExp("^[а-яА-ЯёЁ]+$");
export const phoneReg = new RegExp("^(\\+7|8)[0-9]{10}$");
export const panReg = new RegExp("^([0-9]{4}\\s){3}[0-9]{4}$");
export const expireDateReg = new RegExp("^[0-9]{2}/[0-9]{2}$");
export const cvvReg = new RegExp("^[0-9]$");
export const backspaceReg = new RegExp("\\s*", "g");
export const slashReg = new RegExp("/*", "g");
export const everyFourSymbol = new RegExp("[0-9]{4}(?=.)", "g");
