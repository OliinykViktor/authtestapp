export interface UserProfile {
  id:number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface ProfileState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
};