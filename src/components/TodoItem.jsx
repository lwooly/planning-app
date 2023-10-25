import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankTwoToneIcon from '@mui/icons-material/CheckBoxOutlineBlankTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import { useDispatch, useSelector} from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import SelectComponent from './SelectComponent';
import { selectTodoById } from '../features/todosSlice';

const TodoItem = ({ id }) => {
//select todo from todo id
  const todo = useSelector(state => selectTodoById(state, id))
  const {completed, text, color} = todo

  //dispatch actions for this todo item
    const dispatch = useDispatch()

    const handleToggle = e => {
        dispatch({type: 'todos/todoToggled', payload: todo.id})
    }

    const handleDelete = e => {
      dispatch({type: 'todos/todoDeleted', payload: todo.id})
    }

    const handleColourChange = (color) => {
      console.log(`funciton called`)
      console.log(color)
      dispatch({type: 'todos/colorSelected', payload: {todoId: todo.id, color: color}})
    }

 

    return (
        <ListItem disablePadding sx={{backgroundColor:color, display:'flex'}} >
            <ListItemButton onClick={handleToggle} sx={{flexShrink:1, flexGrow:0}}>
              <ListItemIcon>
                {completed ? (<CheckBoxTwoToneIcon/>):(<CheckBoxOutlineBlankTwoToneIcon/>)}
              </ListItemIcon>
            </ListItemButton>
              <ListItemText primary={text} sx={{flexGrow:1, textAlign:'left'}}/>
              <ListItemButton onClick={handleDelete} sx={{flexShrink:1, flexGrow:0}}>
              <ListItemIcon>
                <ClearIcon/>
              </ListItemIcon>
            </ListItemButton>
            <SelectComponent colorChange={handleColourChange}/>
          </ListItem>
    );
};

export default TodoItem;