import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/deckApi'
import { NavigationActions } from 'react-navigation'

const window = Dimensions.get('window');

class QuizAddCard extends React.Component {

  state = {
    deck: null,
    question: '',
    answer: ''
  }

  componentDidMount () {
    const { deck } = this.props.navigation.state.params
    this.setState(() => ({deck: deck}))
  }

  addQuestion = () => {
   const {deck, question, answer} = this.state
   addCardToDeck(deck.key, {question, answer})
   this.props.navigation.dispatch(NavigationActions.back({deckId: deck.key, deckTitle: deck.title}))
  }

  render() {
    if (this.state.deck === null) {
      return <View><Text>Aguarde...</Text></View>
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <Text style={styles.title}>{this.state.deck.title}</Text>

        <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            multiline = {true}
            numberOfLines = {2}
            autoFocus={true}
            placeholder='Question'
            onChangeText={(text) => this.setState({question: text})}
            value={this.state.question}
          />

        <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.input}
            multiline = {true}
            numberOfLines = {2}
            placeholder='Answer'
            onChangeText={(text) => this.setState({answer: text})}
            value={this.state.answer}
          />

        <TouchableOpacity style={styles.button} onPress={this.addQuestion}>
          <Text style={styles.buttonText}>
            Add Card
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 50,
    fontSize: 20,
    width: 240,
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  label: {
    fontSize: 20,
    color: colors.red,
    margin: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
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

})

function mapStateToProps (state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(QuizAddCard)