export interface CounterState {
  value: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface FormLogin {
  username: string;
  password: string;
}

export interface FormData {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserItems {
  id: number;
  img: string;
  nickname: string;
}
