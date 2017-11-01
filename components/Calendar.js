import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchCalendar } from '../utils/deckApi'
import { connect } from 'react-redux'

class Calendar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar {this.props.dates.length}</Text>
        {this.props.dates.map((date, i) => {
          return (<Text key={i}>{date.date} {date.quiz} {date.perc}</Text>)
        } )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps (state) {
  return {
    dates: state.dates
  }
}

export default connect(mapStateToProps)(Calendar)