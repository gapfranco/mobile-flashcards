import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button, Alert, ScrollView, Slider, Switch,
         TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import colors from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck, setNotification } from '../actions/deckActions'
import { NavigationActions } from 'react-navigation'
import { fetchDeck } from '../utils/deckApi'

const window = Dimensions.get('window');

class Settings extends React.Component {

  state = {
    title: '',
    time: '',
    notify: false
  }

  saveDeck = () => {
    Keyboard.dismiss()
    if (this.state.title !== '') {
      fetchDeck(this.state.title).then(deck => {
        if (Object.keys(deck).length === 0) {
          this.props.dispatch(addDeck(this.state.title))
          this.setState(() => ({title: ''}))
          this.props.navigation.goBack()      
        } else {
          Alert.alert(
            'Duplicate title',
            'Deck alredy exists with this title',
            [{text: 'OK', onPress: () => {}}],
            { cancelable: false }
          )              
        }
      })
    } else {
      Alert.alert(
        'Empty',
        'You must inform a deck title',
        [{text: 'OK', onPress: () => {}}],
        { cancelable: false }
      )
    }
  }
  
  switchNotification = (value) => {
    this.setState(() => ({notify: value}))
  }

  changeTime = (time) => {
    this.setState(() => ({time: time}))
  }

  setNotification = () => {
    if (this.state.time === '') {
      this.setState(() => ({time: '00:00'}))
    }
    this.props.dispatch(setNotification(this.state.notify, this.state.time))
    this.props.navigation.goBack()      
  }

  componentDidMount () {
    const {notify, date, time} = this.props.notification
    this.setState(() => ({notify, date, time}))
  }

  render() {
    return (
      <ScrollView >
        <View style={styles.panel}>
          <Text style={styles.title}>Add new Deck</Text>
          <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.label}>Deck Title</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter title'
                onChangeText={(text) => this.setState({title: text})}
                value={this.state.title}
              />
            <TouchableOpacity style={styles.button} onPress={this.saveDeck}>
              <Text style={styles.buttonText}>
                Add Deck
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

        <View style={styles.panel}>
          <Text style={styles.title}>Notification</Text>
          <View style={styles.slider}>
            <Text style={styles.label}>Time</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.time}
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 0,
                }
              }}
              minuteInterval={5}
              onDateChange={this.changeTime}
            />
          </View>
          <View style={styles.slider}>
            <Switch value={this.state.notify} onValueChange={this.switchNotification} />
            <Text style={styles.notifSwitch}>
              {this.state.notify ? 'On' : 'Off'}
            </Text>
          </View>
          <View style={styles.notify}>
            <TouchableOpacity style={styles.button} onPress={this.setNotification}>
            <Text style={styles.buttonText}>
              Set Notification
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 20,
    width: 200,
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 80,
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,    
  },
  notify: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,    
  },
  notifSwitch: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: colors.blue,
    marginLeft: 12, 
  },
  label: {
    fontSize: 20,
    color: colors.red,
    margin: 8,
    width: 100
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  button: {
    padding: 10,
    backgroundColor: colors.purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText :{
    color: colors.white,
    fontSize: 18,
  },
  panel: {
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 3,
    justifyContent: 'flex-start',
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },

})

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Settings)