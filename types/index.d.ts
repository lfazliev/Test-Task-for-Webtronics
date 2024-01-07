export { User };
declare global {
  interface User {
    id: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    city: string;
  }
  interface Ticket {
    id: number;
    authorId: number;
    authorName: string
    title: string;
    message: string;
    createdAt: string;
    details: string;
    status: string;
  }

}