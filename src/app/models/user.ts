export interface UserData {
  id: string;
  name: string;
  email: string;
  favoriteGenre: string;
  books: Book[];
}

export interface UserAuth {
  email: string;
  password: string;
}

interface Book {
  title: string;
  author: string;
  year: number;
}
