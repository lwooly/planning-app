const delayedMessageMiddleware = storeAPI => next => action => {
    if (action.type === 'todos/todoAdded') {
        setTimeout(() => {
            console.log('Added a new todo test', action.payload)
        }, 3000)
    }
    return next(action)

}

export default delayedMessageMiddleware