import actionTypes from './actionTypes'
import { fetchDecks, fetchCalendar, addQuizToCalendar } from '../utils/deckApi'

/**
 * Load decks async action. Calls API and dispatches loadDecksSuccess
 */
export const loadDecks = () => {
  return function(dispatch) {
    return fetchDecks().then(decks => {
      dispatch(loadDecksSuccess(decks));
    }).catch(error => {
      throw(error);
    });
  };
}

export const loadDecksSuccess = (decks) => {
  return {type: actionTypes.LOAD_DECKS, decks};
}

/**
 * Load dates async action. Calls API and dispatches loadDatesSuccess
 */
export const loadDates = () => {
  return function(dispatch) {
    return fetchCalendar().then(dates => {
      if (dates === null) [
        dates = []
      ]
      dispatch(loadDatesSuccess(dates));
    }).catch(error => {
      throw(error);
    });
  };
}

export const loadDatesSuccess = (dates) => {
  return {type: actionTypes.LOAD_DATES, dates};
}


/**
 * Add date async action. Calls API and dispatches addDateSuccess
 */
export const addDate = (date, quiz, perc) => {
  return function(dispatch) {
    return addQuizToCalendar(date, quiz, perc)
      .then(() => dispatch(addDateSuccess(date, quiz, perc)))
      .catch(error => {
        throw(error);
      })
  }
}

export const addDateSuccess = (date, quiz, perc) => {
  return {type: actionTypes.ADD_DATE, date, quiz, perc};
}
