import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native'
import { white, gray, lightPurple, pink } from '../utils/colors'
import { fetchDecks } from '../utils/deckApi'

export default class Deck extends React.Component {

  state = {
    ready: false,
    data: []
  }

  componentDidMount () {
    fetchDecks()
    .then((list) => this.setState(() => ({ready: true, data: list})))
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail',
              { deckId: item.key, deckTitle: item.title }
            )}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                  {item.cards === 0
                  ? <Text style={styles.subtitle}>No cards</Text>
                  : <Text style={styles.subtitle}>{item.cards} {item.cards === 1 ? "card" : "cards"}</Text>
                  }
              </View>
            </TouchableOpacity>
            )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    padding: 20,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    color: gray,
    fontStyle: 'italic'
  }
})

