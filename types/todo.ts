export interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type TodoPayload = {
  title: string;
  description: string;
  status: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayLoad = {
  email: string;
  password: string;
};

export type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export type TodoFormProps = {
  onTodoCreated: (todo: Todo) => void;
  onTodoUpdated: (todo: Todo) => void;
  editingTodo: Todo | null;
  onEditComplete: () => void;
};

export type TodoFormState = {
  title: string;
  description: string;
  status: string;
};

export type TodoTableProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};
