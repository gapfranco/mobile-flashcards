import { combineReducers } from 'redux'
import { decks, dates, notification } from './deckReducers'

const mainReducer = combineReducers({decks, dates, notification})

export default mainReducer
