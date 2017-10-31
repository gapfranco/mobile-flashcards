import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Button, TouchableOpacity } from 'react-native'
import { white, gray, purple, red, blue, green } from '../utils/colors'

export default class QuizQuestion extends React.Component {

  state = {
    deck: null,
    index: 0
  }

  componentDidMount () {
    const {deck, index} = this.props.navigation.state.params
    this.setState(() => ({deck: deck, index: index}))
    console.log('STATE', this.state)
  }

  render() {
    if (this.state.deck === null) {
      return <View>Aguarde</View>
    }
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>{this.state.deck.questions[this.state.index].question}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.revert}>
              Answer
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Text style={styles.buttonText}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  revert: {
    fontSize: 24,
    color: red,
  },
  button: {
    padding: 10,
    backgroundColor: green,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: 200,
  },
  button2: {
    padding: 10,
    backgroundColor: red,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
    width: 200,
  },
  buttonText :{
    color: white,
    fontSize: 18,
  },


});
