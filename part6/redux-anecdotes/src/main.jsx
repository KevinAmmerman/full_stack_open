import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
})
const store = createStore(reducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
