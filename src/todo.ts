type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const createTodoList = (): Todo[] => [];

const maxId = (list: Todo[]) => {
  if (list.length === 0) return 1;
  return Math.max(...list.map(({ id }) => id)) + 1;
};

const addTodoItem = (list: Todo[], text: string): Todo[] => [
  ...list,
  { id: maxId(list), text: text, completed: false },
];

const removeTodoItem = (list: Todo[], id: number) => list.filter((todo) => todo.id !== id);

const findById = (list: Todo[], id: number) => list.find((todo) => todo.id === id);

const filterBy = (list: Todo[], criteria: Partial<Todo>) =>
  list.filter((todo) =>
    Object.keys(criteria).every((key) => todo[key as keyof Todo] === criteria[key as keyof Todo]),
  );

const updateTodoItem = (list: Todo[], id: number, update: Partial<Omit<Todo, 'id'>>) =>
  list.map((todo) => (todo.id === id ? { ...todo, ...update } : todo));

const toggleTodo = (list: Todo[], id: number) =>
  list.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed,
        }
      : todo,
  );
