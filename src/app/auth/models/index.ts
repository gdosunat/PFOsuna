export interface Usuario {
  id: number,
  nombre: string,
  email: string,
  password: string
}

export interface LoginPayload {
  email: string,
  password: string
}
