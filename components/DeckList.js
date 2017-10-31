import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'

export default class Deck extends React.Component {
  render() {
    return (
      <View>
        <FlatList
          data={[
            {key: 'Devin', cards: 5},
            {key: 'Jackson', cards: 12},
            {key: 'James', cards: 1},
            {key: 'Joel', cards: 5},
            {key: 'John', cards: 2},
            {key: 'Jillian', cards: 8},
            {key: 'Jimmy', cards: 0},
            {key: 'Julie', cards: 2},
          ]}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.key}</Text>
              {item.cards === 0 
              ? <Text style={styles.subtitle}>No cards</Text>
              : <Text style={styles.subtitle}>{item.cards} {item.cards === 1 ? "card" : "cards"}</Text>
              }
                          
            </View>
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

