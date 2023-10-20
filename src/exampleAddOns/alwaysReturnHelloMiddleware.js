 const alwaysReturnHelloMiddleware = storeAPI => next => action => {
    const originalResult = next(action)
    return 'hello'
}

export default alwaysReturnHelloMiddleware