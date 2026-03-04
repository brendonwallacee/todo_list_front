import { TodoState } from '@root/public/enums';

export type Message = {
  message: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  state: TodoState;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoList = {
  todos: Todo[];
};
