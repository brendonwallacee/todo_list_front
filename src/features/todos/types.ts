import { TodoState } from './todo-state';

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
