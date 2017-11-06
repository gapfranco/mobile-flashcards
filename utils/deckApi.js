import { AsyncStorage } from 'react-native'
import dummyData from './dummyData'

export const DECK_STORAGE_KEY = 'Flashcards:decks'
export const CALENDAR_STORAGE_KEY = 'Flashcards:calendar'
export const NOTIFICATION_KEY = 'Flashcards:notification'

function setInitialData() {
  const data = dummyData
  let initialData = {decks: data}
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

function setInitialCalendar() {
  const dates = []
  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dates))
  return {dates: dates}
}

function setInitialNotifications() {
  data = {
    notify: false,
    time: '00:00'
  }
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(data))
  return data
}

function formatDataResults(results) {
  return results === null
    ? setInitialData()
    : JSON.parse(results)
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDataResults)
    .then(result => Object.keys(result.decks).map(key => (
      {...result.decks[key], key: key, cards:result.decks[key].questions.length}
    )))
}

export function fetchDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDataResults)
    .then(result => Object.keys(result.decks).filter(key => key === id)
      .map(key => (
        {...result.decks[key], key: key, cards:result.decks[key].questions.length}
      ))
      .reduce((prev, curr) => curr, {})
  )
}

export function saveDeckTitle(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(result => {
      let data = JSON.parse(result)
      data.decks[title] = {title: title, questions: []}
      return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck(title, question, answer) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(result => {
    let data = JSON.parse(result)
    data.decks[title].questions.push({question, answer})
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}

function formatCalendarResults(results) {
  return results === null
    ? setInitialCalendar()
    : JSON.parse(results)
}

export function fetchCalendar() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function addQuizToCalendar(date, quiz, perc) {
  const newQuiz = {date, quiz, perc}
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(result => JSON.parse(result))
    .then(result => {
      result.push(newQuiz)
      return AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(result))
    })
}

export function resetStorage() {
  setInitialData()
  setInitialCalendar()
  setInitialNotifications()
}
