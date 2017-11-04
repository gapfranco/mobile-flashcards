import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Button, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import { fetchDecks } from '../utils/deckApi'
import { connect } from 'react-redux'


class Deck extends React.Component {
  
  static navigationOptions = {
    title: 'Decks',
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks}
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: colors.white,
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
    color: colors.gray,
    fontStyle: 'italic'
  }
})

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Deck)