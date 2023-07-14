export interface UserData {
  phone: string;
  setPhone: (newPhone: string) => void;
  name: string;
  setName: (newName: string) => void;
  lastname: string;
  setLastname: (newLastname: string) => void;
  middlename: string;
  setMiddlename: (newMiddlename: string) => void;
  email: string;
  setEmail: (newEmail: string) => void;
  city: string;
  setCity: (newCity: string) => void;
}
