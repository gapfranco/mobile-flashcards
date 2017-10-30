import React from 'react'
import { View, Platform, StatusBar, Button } from 'react-native'

import DeckList from './components/DeckList'
import Config from './components/Config'
import Calendar from './components/Calendar'

import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

// import { setLocalNotification } from './utils/helpers'

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
      title: 'Flashcards',
      headerRight: <Button title="Add" onPress={() => {}}/>,
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      title: 'Calendar',
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-calendar' size={30} color={tintColor} />
    },
  },
  Config: {
    screen: Config,
    navigationOptions: {
      title: 'Config screen',
      tabBarLabel: 'Config',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-options' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    title: 'Mobile Flashcards'
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
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
  EntryDetail: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  // componentDidMount() {
  //   setLocalNotification()
  // }
  render() {
    return (
      <View style={{flex: 1}}>
        {<FlashStatusBar backgroundColor={purple} barStyle="light-content" />}
        <MainNavigator />
      </View>
    )
  }
}