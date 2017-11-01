import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Button, TouchableOpacity } from 'react-native'
import { white, gray, purple, red, blue, green } from '../utils/colors'

export default class QuizQuestion extends React.Component {

  state = {
    deck: null,
    index: 0,
    correct: 0,
    front: true,
    perc: null
  }

  componentDidMount () {
    const {deck, index, front} = this.props.navigation.state.params
    this.setState(() => ({deck: deck, index: index, front: front}))
  }
  
  turnCard = () => {
    this.setState(() => ({front: !this.state.front}))
  }

  nextCorrect = () => {
    if (this.state.index < this.state.deck.cards - 1) {
      this.setState(() => ({index: this.state.index + 1, correct: this.state.correct + 1}))      
    } else {
      this.endQuiz(1)
    }
  }

  nextIncorrect = () => {
    if (this.state.index < this.state.deck.cards - 1) {
      this.setState(() => ({index: this.state.index + 1}))
    } else {
      this.endQuiz(0)
    }
  }

  endQuiz = (p) => {
    const perc = ((this.state.correct + p) * 100 / this.state.deck.cards).toFixed(2)
    this.setState(() => ({perc: perc}))
  }


  render() {
    if (this.state.deck === null) {
      return <View><Text>Aguarde</Text></View>
    }
    if (this.state.perc !== null) {
      return (
        <View style={styles.results}>
          <Text style={styles.question}>Result</Text>         
          <Text style={styles.answer}>{this.state.perc}%</Text>         
        </View>        
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.tops}>
          <Text style={styles.count}>{this.state.index + 1}/{this.state.deck.cards}</Text>
        </View>
        {this.state.front
        ? <View style={styles.main}>
          <Text style={styles.question}>{this.state.deck.questions[this.state.index].question}</Text>
          <TouchableOpacity onPress={this.turnCard}>
            <Text style={styles.revert}>
              Answer {this.state.front}
            </Text>
          </TouchableOpacity>
          </View>
        : <View style={styles.main}>
          <Text style={styles.answer}>{this.state.deck.questions[this.state.index].answer}</Text>
          <TouchableOpacity onPress={this.turnCard}>
            <Text style={styles.revert}>
              Question
            </Text>
          </TouchableOpacity>
          </View>
        }
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={this.nextCorrect}>
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={this.nextIncorrect}>
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
    justifyContent: 'center',
  },
  results: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tops: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  count: {
    margin: 12,
    fontSize: 18,
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
  question: {
    fontSize: 32,
    margin: 20,
    fontWeight: 'bold'
  },
  answer: {
    fontSize: 24,
    margin: 20,
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
