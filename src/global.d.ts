interface ToDoItem {
  id: string;
  title: string;
  notes?: string[];
  done: boolean;
  deadline?: string;
  created_at: string;
  updated_at: string
}

interface FilterOption {
  field: keyof ToDoItem,
  value: string | boolean | number
}

interface ToDoStore {
  tasks: ToDoItem[];
  deadlineFilter: number;
}


