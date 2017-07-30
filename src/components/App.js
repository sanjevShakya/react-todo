import React from 'react';
import {
  List,
  Icon,
  Grid,
  Input,
  Header,
  Button,
  Search,
  GridRow,
  Segment,
  ListItem,
  Checkbox,
  Container,
  ListHeader,
  GridColumn,
  ListContent,
  SegmentGroup,
  ListDescription,
} from 'semantic-ui-react';
import { withHandlers, withState, compose, lifecycle } from 'recompose';

function getTimestamp() {
  let date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

let todos = [
  {
    id: 1,
    isDone: false,
    title: 'Bake Potato',
    timestamp: getTimestamp(),
  },
  {
    id: 2,
    isDone: true,
    title: 'Bake Onions',
    timestamp: getTimestamp(),
  },
  {
    id: 3,
    isDone: false,
    title: 'Bake pizza',
    timestamp: getTimestamp(),
  },
  {
    id: 4,
    isDone: true,
    title: 'Bake mushrooms',
    timestamp: getTimestamp(),
  },
];

function App(props) {
  const {
    todo,
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleTodoToggle,
    handleCheckChange,
  } = props;

  return (
    <Container text>
      <Header textAlign="center" as="h2">
        Elegant Todo
      </Header>
      <SegmentGroup>
        <Segment>
          <Grid columns={1}>
            <GridRow>
              <GridColumn>
                <Search placeholder="Search Todos" />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Checkbox
                  onChange={handleCheckChange}
                  label="Show completed todo"
                />
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
        <Segment>
          <List celled>
            {todos &&
              todos.map((todo, index) => {
                const { isDone, title, timestamp } = todo;

                return (
                  <ListItem
                    key={index}
                    className={isDone ? 'list-item' : 'list-item done'}
                    onClick={() => handleTodoToggle(todo)}
                  >
                    <Grid columns={2}>
                      <GridRow>
                        <GridColumn width={1}>
                          <Icon
                            color={isDone ? 'red' : 'green'}
                            name={isDone ? 'remove' : 'checkmark'}
                            fitted
                            size="large"
                          />
                        </GridColumn>
                        <GridColumn width={15}>
                          <ListContent>
                            <ListHeader>
                              {title}
                            </ListHeader>
                            <ListDescription>
                              {timestamp}
                            </ListDescription>
                          </ListContent>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </ListItem>
                );
              })}
          </List>
        </Segment>
        <Segment>
          <Grid columns={1}>
            <GridRow>
              <GridColumn>
                <Input onChange={handleUpdateTodo} placeholder="Add todo" />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Button onClick={() => handleAddTodo(todo)} primary fluid>
                  Add Todo
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
      </SegmentGroup>
    </Container>
  );
}

export default compose(
  withState('todo', 'updateTodo', { title: '' }),
  withState('todos', 'updateTodos', []),
  withState('historyTodos', 'updateHistoryTodos', []),
  lifecycle({
    componentDidMount() {
      this.props.updateTodos(todos);
    },
  }),
  withHandlers({
    handleTodoToggle: ({ updateTodos }) => todo =>
      updateTodos(prevTodos => {
        let newTodos = prevTodos.filter(t => todo.id !== t.id);

        todo.isDone = !todo.isDone;
        newTodos = newTodos.concat([todo]);
        newTodos.sort((item1, item2) => item1.id - item2.id);

        return newTodos;
      }),
    handleUpdateTodo: ({ todos, updateTodo }) => (e, { value }) =>
      updateTodo(() => {
        return {
          id: todos.length + 1,
          title: value,
          isDone: true,
          timestamp: getTimestamp(),
        };
      }),
    handleAddTodo: ({ updateTodos }) => todo =>
      updateTodos(prevTodos => {
        const isExist = prevTodos.filter(td => td.id === todo.id).length !== 0;

        console.log(todo);

        return !isExist && todo.title.length !== 0
          ? prevTodos.concat(todo)
          : prevTodos;
      }),
    handleCheckChange: ({ historyTodos, updateTodos, updateHistoryTodos }) => (
      e,
      { checked }
    ) =>
      updateTodos(prevTodos => {
        updateHistoryTodos(prevTodos);
        prevTodos = checked
          ? prevTodos.filter(todo => todo.isDone === false)
          : historyTodos;

        return prevTodos;
      }),
  })
)(App);
