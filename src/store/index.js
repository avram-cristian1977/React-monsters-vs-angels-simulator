import { createStore } from 'redux'

const initialToken = localStorage.getItem('token')
const initialLocalId = localStorage.getItem("localId")


const authReducer = (state = { token: initialToken, localId: initialLocalId, }, action) => {
    switch (action.type) {
        case "login":
            localStorage.setItem("token", action.payload)
            localStorage.setItem("localId", action.localId)
            return {
                token: action.payload,
                localId: action.localId,
             }
        case "logout":
            localStorage.removeItem("token")
            localStorage.removeItem("localId")
            return { token: null }
        default:
            return state
    }
}

export const store = createStore(authReducer)