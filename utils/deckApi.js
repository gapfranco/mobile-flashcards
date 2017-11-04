import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:decks'
export const CALENDAR_STORAGE_KEY = 'Flashcards:calendar'

function setInitialData() {

  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    'React Native': {
      title: 'React Native',
      questions: [
        {
          question: 'What is a Reactive Native?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
  }

  let initialData = {decks: data}
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData))

  return initialData
}

function formatDataResults(results) {
  // return setInitialData()
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

function setInitialCalendar() {
  const dates = []
  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dates))
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
