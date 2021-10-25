export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  favoriteGenre: string;
  books: Book[];
}

export interface Book {
  title: string;
  author: string;
  year: number;
}
