import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TodoItem from './TodoItem';
import { shallowEqual } from 'react-redux';
import { selectFilteredTodoIds, selectTodoIds } from '../features/todosSlice';


export default function TodoList() {

    // const selectTodoIds = state => {
    //   console.log(state.todos)
    //   console.log(typeof state.todos, 'type of')
    //   return state.todos.map(todo => todo.id)
    // }

    // const todoIds = useSelector(selectTodoIds, shallowEqual)
    const todoIds = useSelector(selectFilteredTodoIds)

    console.log(todoIds, `todoids`)
 
    //loops over todos to create list items

    const renderListItems = todoIds.map((todoId) => {
        return <TodoItem key={todoId} id={todoId}/>
    })

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="todo list">
        <List>
            {renderListItems}
        </List>
      </nav>
    </Box>
  );
}

