export interface Account {
  success: boolean;
  reason?: string;
  user: {
    phone: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    city: string;
  };
  token: string;
}

export interface person {
  firstname: string;
  lastname: string;
  middlename: string;
  phone: string;
}

export interface backendUserInfo {
  phone: string;
  id: string;
}
