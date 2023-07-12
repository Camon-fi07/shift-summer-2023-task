export interface FieldInfo {
  name: string;
  validate?: (value: string) => string;
  changeData?: (value: string) => string;
  value: string;
  setValue: (newValue: string) => void;
}
