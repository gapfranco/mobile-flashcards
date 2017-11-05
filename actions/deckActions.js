import actionTypes from './actionTypes'
import { fetchDecks, fetchCalendar, addQuizToCalendar, saveDeckTitle, addCardToDeck} from '../utils/deckApi'
import { setLocalNotification, scheduleNotification, getNotification } from '../utils/notification'

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
 * Add new deck. Calls API and dispatches addDeckSuccess
 */
export const addDeck = (title) => {
  return function(dispatch) {
    return saveDeckTitle(title)
      .then(() => dispatch(addDeckSuccess(title)))
      .catch(error => {
        throw(error);
      })
  }
}

export const addDeckSuccess = (deck) => {
  return {type: actionTypes.ADD_DECK, deck};
}

/**
 * Load dates async action. Calls API and dispatches loadDatesSuccess
 */
export const loadDates = () => {
  return function(dispatch) {
    return fetchCalendar().then(dates => {
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

/**
 * Add card to deck. Calls API and dispatches addCardSuccess
 */
export const addCard = (id, question, answer) => {
  return function(dispatch) {
    return addCardToDeck(id, question, answer)
      .then(() => dispatch(addCardSuccess(id, question, answer)))
      .catch(error => {
        throw(error);
      })
  }
}

export const addCardSuccess = (id, question, answer) => {
  return {type: actionTypes.ADD_CARD, id, question, answer};
}

/**
 * Set notification. Calls API and dispatches setNotificationSuccess
 */
export const setNotification = (notify, time) => {
  return function(dispatch) {
    return setLocalNotification(notify, time)
      .then(() => dispatch(setNotificationSuccess(notify, time)))
      .catch(error => {
        throw(error);
      })
  }
}

/**
 * Load notification. Calls API and dispatches setNotificationSuccess
 */
export const loadNotification = () => {
  return function(dispatch) {
    return getNotification()
      .then((data) => dispatch(setNotificationSuccess(data.notify, data.time)))
      .catch(error => {
        throw(error);
      })
  }
}

export const setNotificationSuccess = (notify, time) => {
  return {type: actionTypes.SET_NOTIFICATION, notify, time}
}
