import { nanoid } from "@reduxjs/toolkit"
import { client } from "../api/client"
import { createSelector } from "@reduxjs/toolkit"
import { StatusFilters } from "./filters/filtersSlice"


const initialState = {
    status: 'idle',
    entities: []
}

//initial state as default value for state
//reducer logic
export default function todosReducer(state = initialState, action) {
    switch (action.type) {

        case 'todos/todosLoading': {
            return {
              ...state,
              status: 'loading'
            }
          }
        case 'todos/todosLoaded': {
            // replace existing state 
            return {
                ...state,
                status: 'idle',
                entities: action.payload
            }
        }


        case 'todos/todoAdded': {
            //return new state object
            return {
                ...state,
                entities: [...state.entities, action.payload]
            }
        }

        case 'todos/todoToggled': {
            //get id of todo from action payload

            return {
                ...state,
                entities: state.entities.map(todo => {
                    if (todo.id !== action.payload) {
                        return todo
                    }

                    return {
                        ...todo,
                        //flip completed flag
                        completed: !todo.completed
                    }
                })
            }

        }

        case 'todos/colorSelected': {
            console.log(`called`)
            return {
                ...state,
                entities: state.entities.map((todo) => {
                    const { todoId, color } = action.payload
                    if (todo.id !== todoId) {
                        return todo
                    }
                    return {
                        ...todo,
                        color
                    }
                })
            }

        }

        case 'todos/todoDeleted': {
            return {
                ...state,
                entities: state.entities.filter((todo) => todo.id !== action.payload)
            }
        }


        case 'todos/allCompleted': {
            return {
                ...state,
                entities: state.entities.map((todo) => {
                    return {
                        ...todo,
                        completed: true
                    }
                })
            }

        }

        case 'todos/completedCleared': {
            return {
                ...state,
                entities: state.entities.filter((todo) => {
                    if (!todo.completed) {
                        return todo
                    }
                })
            }
        }
        default:
            return state
    }
}


//action creators
export const todosLoaded = (todos) => {
    return { type: 'todos/todosLoaded', payload: todos }
}

export const todosLoading = () => {
    return { type: 'todos/todosLoading'}
}

export const todoAdded = (todo) => {
    return { type: 'todos/todoAdded', payload: todo }
}



// Thunk functions
export function saveNewTodo(text) {
    //create and return async function
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = { text }
        const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        dispatch(todoAdded(response.todo))
    }

}

export function fetchTodos() {
    return async function fetchTodosThunk(dispatch, getState) {
        dispatch(todosLoading())
        const response = await client.get('/fakeApi/todos')
        dispatch(todosLoaded(response.todos))
    }
}


//selectors
export const selectTodos = (state) => state.todos.entities

export const selectTodoIds = createSelector(
    selectTodos,
    todos => todos.map(todo => todo.id)
)

export const selectTodoById = (state, todoId) => {
    return selectTodos(state).find(todo => todo.id === todoId)
  }

export const selectFilteredTodos = createSelector(
    // First input selector: all todos
    selectTodos,
    // Second input selector: all filter values
    (state) => state.filters,
    // Output selector: receives both values
    (todos, filters) => {
        const { status, colors } = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) {
            return todos
        }

        const completedStatus = status === StatusFilters.Completed
        // Return either active or completed todos based on filter
        return todos.filter(todo => {
            const statusMatches =
                showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    filteredTodos => filteredTodos.map(todo => todo.id)
)