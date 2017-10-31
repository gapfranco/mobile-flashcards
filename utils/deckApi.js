import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:decks'

function setInitialData () {

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
    }
  }

  let initialData = {decks: data}

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData))

  return initialData
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
