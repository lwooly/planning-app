import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TodoItem from './TodoItem';
import { shallowEqual } from 'react-redux';
import { selectFilteredTodoIds, selectTodoIds } from '../features/todosSlice';
import CircularProgress from '@mui/material/CircularProgress';


export default function TodoList() {
    // const todoIds = useSelector(selectTodoIds, shallowEqual)
    const todoIds = useSelector(selectFilteredTodoIds)
    const loadingStatus = useSelector(state => state.todos.status)

    if (loadingStatus === 'loading') {
        return (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        );
    }

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

