interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface Session {
  token: string;
  user: User;
}
