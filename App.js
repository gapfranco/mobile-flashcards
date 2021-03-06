import React from 'react'
import { View, Platform, StatusBar, StyleSheet, Button } from 'react-native'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import mainReducer from './reducers/mainReducer'
import { loadDecks, loadDates, loadNotification } from './actions/deckActions'

import DeckList from './components/DeckList'
import Settings from './components/Settings'
import Calendar from './components/Calendar'
import DeckDetail from './components/DeckDetail'
import QuizQuestion from './components/QuizQuestion'
import QuizAddCard from './components/QuizAddCard'

import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import colors from './utils/colors'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { resetStorage } from './utils/deckApi'

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.purple
  }
})

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerStyle: styles.header,
      headerTintColor: colors.white,
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      title: 'History',
      headerStyle: styles.header,
      headerTintColor: colors.white,
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='calendar-check' size={30} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      headerStyle: styles.header,
      headerTintColor: colors.white,
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-settings' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    title: 'Mobile Flashcards'
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? colors.purple : colors.white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? colors.white : colors.purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },
  QuizQuestion: {
    screen: QuizQuestion,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },
  QuizAddCard: {
    screen: QuizAddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },

})

// Reset contents:
// Uncomment and restart to reset to initial content. Then comment and restart again
//resetStorage()

// Create store and load initial data
let store = createStore(mainReducer, applyMiddleware(thunk))
store.dispatch(loadDecks())
store.dispatch(loadDates())
store.dispatch(loadNotification())

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          {<FlashStatusBar backgroundColor={colors.purple} barStyle="light-content" />}
          <MainNavigator ref={nav => this.navigator = nav}/>
        </View>
      </Provider>
    )
  }
}