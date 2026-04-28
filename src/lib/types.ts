// Tipos compartidos entre componentes Svelte y servicios API.
export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends Credentials {
  confirmPassword?: string;
}

export interface Movie extends MoviePayload {
  id: string;
  ownerId: string;
  isFavorite: boolean;
  rating: number | null;
}

export interface MoviePayload {
  title: string;
  director: string;
  posterUrl?: string;
  year: number;
}

export interface MovieFormSubmit extends MoviePayload {
  id?: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiErrorPayload {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

export interface User {
  id: string;
  email: string;
  password: string;
  isFavorite: boolean;
  rating: number | null;
}
