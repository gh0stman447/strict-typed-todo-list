type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const createTodoList = (): [] => [];

const maxId = (list: Todo[]) => {
  if (list.length === 0) return 1;
  return Math.max(...list.map(({ id }) => id)) + 1;
};

type AddTodoItem<List extends Todo[], Text extends string> = [
  ...List,
  {
    id: number;
    text: Text;
    completed: false;
  },
];

const addTodoItem = <List extends Todo[], Text extends string>(
  list: List,
  text: Text,
): AddTodoItem<List, Text> => [...list, { id: maxId(list), text: text, completed: false }];

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

const todos = createTodoList();
const todos2 = addTodoItem(todos, 'qwdqw');
const todos3 = addTodoItem(todos2, '12312');
todos3[1].text
