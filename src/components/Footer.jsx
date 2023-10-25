import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorFilters';
import { colorFilterChanged } from '../features/filters/filtersSlice';
import { selectTodos } from '../features/todosSlice';

const Footer = () => {
    const dispatch = useDispatch()

    const todosRemaining = useSelector(state => {
        const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, colors } = useSelector(state => state.filters)

    const onStatusChange = (status) => {
        dispatch({ type: 'filters/statusFilterChanged', payload: status })
    }

    const onColorChange = (color, changeType) => {
        dispatch(colorFilterChanged(color, changeType))
    }

    const handleAllComplete = () => {
        dispatch({type: 'todos/allCompleted'})
    }

    const handleClearComplete = () => {
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