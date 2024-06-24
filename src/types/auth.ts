export interface AuthState {
  userToken: string | null;
  loading: boolean;
  error: string | null;
}