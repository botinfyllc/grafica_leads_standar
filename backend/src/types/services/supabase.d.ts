export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
  last_login: Date | null;
  create_at: Date;
  is_active: boolean;
}
