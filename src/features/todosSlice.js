import { nanoid } from "@reduxjs/toolkit"
import { client } from "../api/client"
import { createSelector } from "@reduxjs/toolkit"
import { StatusFilters } from "./filters/filtersSlice"


const initialState =
    [
        // { id: 0, text: 'Learn React', completed: true },
        // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ]

//initial state as default value for state
//reducer logic
export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todosLoaded': {
            // replace existing state 
            return action.payload
        }


        case 'todos/todoAdded': {
            //return new state object
            return [
                ...state,
                action.payload
            ]
        }


        case 'todos/todoToggled': {
            //get id of todo from action payload

            return state.map(todo => {
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

        case 'todos/colorSelected': {
            console.log(`called`)
            return state.map((todo) => {
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

        case 'todos/todoDeleted': {
            return state.filter((todo) => todo.id !== action.payload)
        }



        case 'todos/allCompleted': {
            return (
                state.map((todo) => {
                    return {
                        ...todo,
                        completed: true
                    }
                })
            )
        }

        case 'todos/completedCleared': {
            return (
                state.filter((todo) => {
                    if (!todo.completed) {
                        return todo
                    }
                })
            )
        }
        default:
            return state
    }
}

// Thunk functions
export const todoAdded = (todo) => {
    return { type: 'todos/todoAdded', payload: todo }
}


export function saveNewTodo(text) {
    //create and return async function
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = { text }
        const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        dispatch(todoAdded(response.todo))
    }

}
export const todosLoaded = (todos) => {
    return { type: 'todos/todosLoaded', payload: todos }
}


export function fetchTodos() {
    return async function fetchTodosThunk(dispatch, getState) {
        const response = await client.get('/fakeApi/todos')
        dispatch(todosLoaded(response.todos))
    }
}

export const selectTodoIds = createSelector(
    state => state.todos,
    todos => todos.map(todo => todo.id)
)


export const selectFilteredTodos = createSelector(
    // First input selector: all todos
    state => state.todos,
    // Second input selector: all filter values
    state => state.filters,
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