import React from 'react';

const RemainingTodos = ({ count }) => {
    return (
        <div>
            <h5>Remaining Todos</h5>
            <p>{count} left</p>
        </div>
    );
};

export default RemainingTodos;