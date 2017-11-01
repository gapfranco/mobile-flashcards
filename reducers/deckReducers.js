import actionsTypes from '../actions/actionTypes'

export const decks = (state = [], action) => {
  const {type, ...deck} = action
  switch (type) {
    case actionsTypes.LOAD_DECKS:
      return deck.decks;
    case actionsTypes.ADD_DECK:
      return [
        ...state,
        {
          title: deck.title,
          questions: [],
        }
      ]
    default:
      return state
  }
}

export const dates = (state = [], action) => {
  const {type, ...date} = action
  switch (type) {
    case actionsTypes.LOAD_DATES:
      return date.dates;
    case actionsTypes.ADD_DATE:
      return [
        ...state,
        {
          date: date.date,
          quiz: date.quiz,
          perc: date.perc
        }
      ]
    default:
      return state
  }
}
