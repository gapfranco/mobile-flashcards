import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from './colors'
import { Notifications, Permissions } from 'expo'
import moment from 'moment';

const NOTIFICATION_KEY = 'Flashcards:notification'

function createNotification () {
  return {
    title: 'Study!',
    body: "👋 don't forget to complete a quiz for the day!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

function setNotification(day) {
  return Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: day,
            repeat: 'day',
          }
        )
      }
    })
}  

export function setLocalNotification(notify, time) {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      let day = moment()
      let ptime = time.split(':')
      let hour = parseInt(ptime[0])
      let minute = parseInt(ptime[1])
      if (hour < day.hour() || (hour === day.hour() && minute <= day.minute())) {
        day.add(1, 'days')
      }
      day.hours(hour)
      day.minutes(minute)
      data = {
        notify: notify,
        time: time
      }
      if (notify) {
        setNotification(day.toDate())
      }
      return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(data))
    })
}

export function scheduleNotification () {
  Notifications.cancelAllScheduledNotificationsAsync()
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data !== null) {
        const {notify, time} = data
        if (notify) {
          let day = moment().add(1, 'days')
          let ptime = time.split(':')
          let hour = parseInt(ptime[0])
          let minute = parseInt(ptime[1])
          day.hours(hour)
          day.minutes(minute)
          setNotification(day.toDate())
          return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(data))
        }
      }
    })
}

export function getNotification () {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        data = {
          notify: false,
          time: '00:00'
        }
      }
      return data
    })
}
