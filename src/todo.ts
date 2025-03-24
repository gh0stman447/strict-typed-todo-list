type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const createTodoList = (): [] => [];

const maxId = (list: Todo[]): number => {
  if (list.length === 0) return 1;
  return Math.max(...list.map(({ id }) => id)) + 1;
};

type BuildTupple<L extends number, Arr extends unknown[] = []> = L extends Arr['length']
  ? Arr
  : BuildTupple<L, [...Arr, unknown]>;

type GreaterOrEqual<A extends number, B extends number> = BuildTupple<A> extends [
  ...BuildTupple<B>,
  ...infer Rest,
]
  ? true
  : false;

type Add<A extends number, B extends number> = [...BuildTupple<A>, ...BuildTupple<B>]['length'];

type GenId<List extends Todo[], Max extends number = 0> = List extends [
  infer First extends Todo,
  ...infer Rest extends Todo[],
]
  ? GreaterOrEqual<First['id'], Max> extends true
    ? GenId<Rest, First['id']>
    : GenId<Rest, Max>
  : Add<Max, 1>;

type AddTodoItem<List extends Todo[], Text extends string> = [
  ...List,
  {
    id: GenId<List>;
    text: Text;
    completed: false;
  },
];

const addTodoItem = <List extends Todo[], Text extends string>(
  list: List,
  text: Text,
): AddTodoItem<List, Text> => [
  ...list,
  { id: maxId(list) as GenId<List>, text: text, completed: false },
];

type RemoveTodoItem<
  List extends Todo[],
  Id extends number,
  Acc extends Todo[] = [],
> = List extends [infer First extends Todo, ...infer Rest extends Todo[]]
  ? First['id'] extends Id
    ? [...Acc, ...Rest]
    : RemoveTodoItem<Rest, Id, [...Acc, First]>
  : Acc;

const removeTodoItem = <List extends Todo[], Id extends List[number]['id']>(
  list: List,
  id: Id,
): RemoveTodoItem<List, Id> => list.filter((todo) => todo.id !== id) as RemoveTodoItem<List, Id>;

type FindTodoItemById<
  List extends Todo[],
  Id extends List[number]['id'],
  TodoUnion extends Todo = List[number],
> = TodoUnion extends { id: Id } ? TodoUnion : never;

type R = FindTodoItemById<
  [{ id: 1; text: '123'; completed: false }, { id: 2; text: '13223'; completed: true }],
  2
>;

const findById = <List extends Todo[], Id extends List[number]['id']>(
  list: List,
  id: Id,
): FindTodoItemById<List, Id> => list.find((todo) => todo.id === id) as FindTodoItemById<List, Id>;

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
const todos4 = addTodoItem(todos3, 'qwdqqqwdwq');
const todos5 = removeTodoItem(todos4, 2);
const foundTodo = findById(todos3, 2);
const todos6 = addTodoItem(todos5, 'qwdqqqwdwq');
