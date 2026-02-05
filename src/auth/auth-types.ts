export type User = {
  id: string;
  name: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuthed: boolean;
  login: (user: User) => void;
  logout: () => void;
};
