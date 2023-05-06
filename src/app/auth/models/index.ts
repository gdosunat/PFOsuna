export interface Usuario {
  id: number,
  nombre: string,
  email: string,
  password: string,
  rol: string,
  token: string
}

export interface LoginPayload {
  email: string,
  password: string
}
