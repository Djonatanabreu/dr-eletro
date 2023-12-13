export type UserLogin = {
  email: string;
  senha: string;
};

export type UserForgotPassword = {
  email: string;
};

export type UserRegister = {
  email: string;
  nome: string;
  senha: string;
  whatsapp: string;
  valor?: string;
};
