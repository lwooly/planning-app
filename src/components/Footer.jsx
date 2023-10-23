import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorFilters';

const Footer = () => {
    const dispatch = useDispatch()

    const todosRemaining = useSelector(state => {
        const uncompletedTodos = state.todos.filter(todo => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, colors } = useSelector(state => state.filters)
    console.log('colors')

    console.log(colors, 'colors')

    const onStatusChange = (status) => {
        dispatch({ type: 'filters/statusFilterChanged', payload: status })
    }

    const onColorChange = (color, changeType) => {
        dispatch({type:'filters/colorFilterChanged', payload: {color, changeType}})
    }

    const handleAllComplete = (e) => {
        dispatch({type: 'todos/allCompleted'})
    }

    const handleClearComplete = (e) => {
        dispatch({type: 'todos/completedCleared'})
    }


    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button" onClick={handleAllComplete}>Mark All Completed</button>
                <button className="button" onClick={handleClearComplete}>Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter value={status} onChange={onStatusChange} />
            <ColorFilters value={colors} onChange={onColorChange} />
        </footer>
    );
};

export default Footer;