import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankTwoToneIcon from '@mui/icons-material/CheckBoxOutlineBlankTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import { useDispatch } from 'react-redux';


const TodoItem = ({todo}) => {
    const dispatch = useDispatch()
    console.log(todo)

    const handleToggle = e => {

        dispatch({type: 'todos/todoToggled', payload: id})

    }
    
    const { text, completed, color, id } = todo
    return (
        <ListItem disablePadding sx={{backgroundColor:color, display:'flex'}} >
            <ListItemButton onClick={() => handleToggle(id)} sx={{flexShrink:1, flexGrow:0}}>
              <ListItemIcon>
                {completed ? (<CheckBoxTwoToneIcon/>):(<CheckBoxOutlineBlankTwoToneIcon/>)}
              </ListItemIcon>
            </ListItemButton>
              <ListItemText primary={text} sx={{flexGrow:1, textAlign:'left'}}/>
          </ListItem>
    );
};

export default TodoItem;