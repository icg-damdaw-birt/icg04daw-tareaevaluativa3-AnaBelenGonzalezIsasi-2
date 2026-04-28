// Tipos compartidos entre componentes Svelte y servicios API.
export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends Credentials {
  confirmPassword?: string;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  posterUrl?: string | null;
  year?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  /**
   * Indica si la película está marcada como favorita.
   */
  favorite?: boolean;
  /**
   * Valoración de la película de 0 a 5.
   * 0 significa que no ha sido calificada.
   */
  rating?: number;
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
