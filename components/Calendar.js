import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { fetchCalendar } from '../utils/deckApi'
import { connect } from 'react-redux'
import { white, gray, purple, red, blue, green } from '../utils/colors'

class Calendar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {Object.keys(this.props.dates).map((k, i) => {
          return (
            <View style={styles.item} key={i}>
              <Text style={styles.title}>{k}</Text>
              {this.props.dates[k].map((dt, j) => {
              return (<Text key={j}>{j+1}. {dt.quiz}: {dt.perc}%</Text>)
              })
              }
            </View>
          )
        })}
        {/* {this.props.dates
        .map((date, i) => {
          return (<Text key={i}>{date.date} {date.quiz} {date.perc}</Text>)
        } )} */}
      </View>
    );
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
    color: red,
    paddingBottom: 12
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    alignItems: 'flex-start',
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
  return {
    dates: state.dates.reduce((r, a) => {
      r[a.date] = r[a.date] || []
      r[a.date].push(a)
      return r
    }, {})
  
  }
}

export default connect(mapStateToProps)(Calendar)