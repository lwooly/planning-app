import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TodoItem from './TodoItem';


export default function TodoList() {

    const selectTodos = state => state.todos

    const todos = useSelector(selectTodos)

    //loops over todos to create list items

    const renderListItems = todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo}/>
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

