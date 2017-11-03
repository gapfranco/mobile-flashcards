import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { fetchCalendar } from '../utils/deckApi'
import { connect } from 'react-redux'
import colors from '../utils/colors'

class Calendar extends React.Component {

  render() {
    return (
      <View>
        <FlatList data={this.props.dates}
          renderItem={({item}) => (
            <View style={styles.date}>
              <Text style={styles.title}>{item.key}</Text>
              {item.quizes.map((elem, i) => (
                <View key={i} style={styles.line}>
                  <Text style={styles.txt}>{i+1}</Text>
                  <Text style={styles.txt}>{elem.quiz}</Text>
                  <Text style={styles.txt}>{elem.perc}%</Text>
                </View>
              ))
              }
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: colors.red,
    paddingBottom: 12
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.lightDeepPurple,
    marginBottom: 4,
    padding: 4,
  },
  txt: {
    fontSize: 16,
  },
  date: {
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    justifyContent: 'flex-start',
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
});

function mapStateToProps (state) {
  // state.dates is in format [{date1, quiz, %}, {date2, quiz, %}, ...]
  // reduce to format {date1: [{date1, quiz, %}, ...], date2: [{date2, quiz, 5}, ...]}
  let list = []
  if (state.dates !== null) {
    const obj = state.dates.reduce((r, a) => {
      r[a.date] = r[a.date] || []
      r[a.date].push(a)
      return r
    }, {})
    // then transform to format [{key: date1, quizes: [{date1, quiz, %}, ...]}, {key:date2, quizes:...}]
    list = Object.keys(obj).map(date => (
      {key: date, quizes: obj[date]}
    ))  
  } 
  return {
    dates: list  
  }
}

export default connect(mapStateToProps)(Calendar)