import { nanoid } from "@reduxjs/toolkit"


const initialState =
    [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ]

//initial state as default value for state

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            //return new state object
            return [
                ...state,
                //new todo object 
                {
                    id: nanoid(),
                    text: action.payload,
                    completed: false
                }
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