import { combineReducers, createStore } from 'redux'
import contentReducer from './contentReducer'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    content: contentReducer,
    form: formReducer
})

let store = createStore(reducers)

export default store