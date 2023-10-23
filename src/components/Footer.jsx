import React from 'react';
import { useSelector } from 'react-redux';
import RemainingTodos from './RemainingTodos';

const Footer = () => {

    const todosRemaining = useSelector(state => {
        const uncompletedTodos = state.todos.filter(todo => !todo.completed)
        return uncompletedTodos.length
    })
    


    return (
        <footer className="footer">
        <div className="actions">
          <h5>Actions</h5>
          <button className="button">Mark All Completed</button>
          <button className="button">Clear Completed</button>
        </div>
  
        <RemainingTodos count={todosRemaining} />
        {/* <StatusFilter value={status} onChange={onStatusChange} />
        <ColorFilters value={colors} onChange={onColorChange} /> */}
      </footer>
    );
};

export default Footer;