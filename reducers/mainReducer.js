import { combineReducers } from 'redux'
import { decks, dates } from './deckReducers'

const mainReducer = combineReducers({decks, dates})

export default mainReducer
