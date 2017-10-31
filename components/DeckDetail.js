import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Button, TouchableOpacity } from 'react-native'
import { white, gray, purple, pink, lightPurple } from '../utils/colors'
import { fetchDeck } from '../utils/deckApi'

export default class DeckDetail extends React.Component {

  state = {
    deck: {}
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `${deckId}`
    }
  }

  componentDidMount () {
    const {state} = this.props.navigation
    const id = state.params.deckId
    fetchDeck(id).then((deck) => this.setState(() => ({deck: deck})))
  }

  startQuiz = () => {
    this.props.navigation.navigate('QuizQuestion', {
      deck: this.state.deck,
      index: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>{this.state.deck.title}</Text>
          <Text style={styles.subtitle}>
            {this.state.deck.cards === 0
              ? <Text style={styles.subtitle}>No cards</Text>
              : <Text style={styles.subtitle}>{this.state.deck.cards} {this.state.deck.cards === 1 ? "card" : "cards"}</Text>
            }
          </Text>
        </View>
        <View style={styles.buttons}>
          {this.state.deck.cards > 0
          ? <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
              <Text style={styles.buttonText}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          : <Text>No cards in deck</Text>
          }
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Text style={styles.buttonText}>
              Add Card
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
  subtitle: {
    fontSize: 26,
    color: gray,
    fontStyle: 'italic'
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: 200,
  },
  button2: {
    padding: 10,
    backgroundColor: gray,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText :{
    color: white,
    fontSize: 18,
  },


});
