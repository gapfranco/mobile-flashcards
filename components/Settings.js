import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button, Alert, ScrollView, Slider, Switch,
         TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions/deckActions'
import { NavigationActions } from 'react-navigation'
import { fetchDeck } from '../utils/deckApi'

const window = Dimensions.get('window');

class Settings extends React.Component {

  state = {
    title: '',
    hour: 0,
    minutes: 0,
    notif: false
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
  
  slideHour = (value) => {
    this.setState(() => ({hour: value}))
  }

  slideMinute = (value) => {
    this.setState(() => ({minutes: value}))
  }

  switchNotification = (value) => {
    this.setState(() => ({notif: value}))
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
                placeholder='Entrer deck title'
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
            <Text style={styles.label}>Hour</Text>
            <Slider
              style={{flex: 1}}
              step={1}
              value={this.state.hour}
              maximumValue={23}
              minimumValue={0}
              onValueChange={(value) => {this.slideHour(value)}}
            />
            <View style={styles.metricCounter}>
              <Text style={{fontSize: 18, textAlign: 'center', marginRight: 8, marginRight: 8}}>{this.state.hour}</Text>
            </View>
            </View>
            <View style={styles.slider}>
            <Text style={styles.label}>Minutes</Text>
            <Slider
              style={{flex: 1}}
              step={1}
              value={this.state.minute}
              maximumValue={59}
              minimumValue={0}
              onValueChange={(value) => {this.slideMinute(value)}}
            />
            <View style={styles.metricCounter}>
              <Text style={{fontSize: 18, textAlign: 'center', marginRight: 8, marginLeft: 8}}>{this.state.minutes}</Text>
            </View>
          </View>
          <View style={styles.slider}>
            <Switch value={this.state.notif} onValueChange={this.switchNotification} />
            <Text style={styles.notifSwitch}>
              {this.state.notif ? 'On' : 'Off'}
            </Text>
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
    alignItems: 'center'    
  },
  notifSwitch: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: colors.blue,
    marginLeft: 12, 
  },
  metricCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12
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