import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Button, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import { connect } from 'react-redux'
import { addDate } from '../actions/deckActions'
import moment from 'moment';

class QuizQuestion extends React.Component {

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

  /**
   * End quiz and push to state
   * Parameter p: if the last one was correct, add 1 to total correct
   */
  endQuiz = (p) => {
    const perc = ((this.state.correct + p) * 100 / this.state.deck.cards).toFixed(1)
    this.setState(() => ({perc: perc}))
    // (new Date()).toLocaleDateString() crashes on Android. Workaround:
    // const today = new Date()
    // const date = `${today.getDate()}/${today.getMonth()}/${today.getYear()}`
    // or using 3d.party library, like moment
    const date = moment().format('DD/MM/YYYY')
    this.props.dispatch(addDate(date, this.state.deck.title, perc))
  }
  
  render() {
    if (this.state.deck === null) {
      return <View><Text>Aguarde</Text></View>
    }
    if (this.state.perc !== null) {
      return (
        <View style={styles.results}>
          <Text style={styles.question}>Your Result</Text>
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
        ? <View style={styles.item}>
          <Text style={styles.question}>{this.state.deck.questions[this.state.index].question}</Text>
          <TouchableOpacity onPress={this.turnCard}>
            <Text style={styles.revert}>
              Answer {this.state.front}
            </Text>
          </TouchableOpacity>
          </View>
        : <View style={styles.item}>
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
  item: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    color: colors.red,
  },
  button: {
    padding: 10,
    backgroundColor: colors.green,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: 200,
  },
  button2: {
    padding: 10,
    backgroundColor: colors.red,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
    width: 200,
  },
  buttonText :{
    color: colors.white,
    fontSize: 18,
  },

});

function mapStateToProps (state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(QuizQuestion)