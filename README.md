# Mobile Flashcards

React Native application implementing a flashcard deck for studying.

## Specifications

- Users can create decks of cards for any subjects
- Each deck can have an unlimited number of cards with questions and answers
- Users can add cards to decks
- Users can go through all cards in a deck and try to answers the questions one by one.
- Users can register questions answered correctly and incorrectly and save the results
- Users cas setup notifications to remind them to study

## Redux features

All state is centralized in a single structure, modified only by *Redux*:

```
state = {
  decks: [],
  dates: [],
  notifications: [],
}
```

State is created on App.js and propagated with *react-redux* to all components. The *thunk* middleware
is used to deal with asynchronous calls.

## Extra features

There are some features beyond the original especification:

- Notifications can be turned on and off in the settings tab
- The notification time can be changed on the settings tab
- History tab shows all decks answered by date, with results

## User experience

### Main view

The main view shows three tabs, *Decks*, *History* and *Settings*:

![main view](/images/screen01.png)

The *Decks* tab lists all decks created by the user. The *History* tab shows the decks that were 
anwered by date and the *Settings* tab has options to create new decks and control notifications.

### Completing a quiz

Clicking in a deck opens the deck with options to atart the quiz and to add new cards.

![screen02](/images/screen02.png)

Pressing *Start Quiz* show the quiz cards, one by one. 

![screen03](/images/screen03.png)

The user can try to anwser the question and press *Correct* or *Incorrect*.
Pressing *Show answer*, turns the card:

![screen04](/images/screen04.png)

The last screen show the final result:

![screen05](/images/screen05.png)

The user can *Restart Quiz* to take the quizes again or *Back to Deck* to finish the quiz
and save the results, going back to the deck screen. The finished results are registered
on the *History* tab, grouped by date.

![screen06](/images/screen06.png)

To create new cards in a deck press the button *Add Card* and fill the fields for question and answer.

![screen09](/images/screen09.png)

Pressing *Add Card8* will push the new card to the decks colection.

### Settings

The *Settings* tab has options to create new decks and to controle the notifications.

![screen07](/images/screen07.png)

To add a new deck, enter with its title and press *Add Deck*. If the a deck with the same title
exists an error message wil be shown.

With the *Notification* panel, the user can press the time field to choose a time and toggle
notifications *on* or *off*. After setting the choices, press the button *Set Notification* to
make them active. 

If the time chosen is *before* the current time, it will schedule notification to the next day.
If it is *after* the current time, it will schedule to the sema day. When the user answer 
a quiz it will cancel the notification and reschedule to the same time next day.

The user can cancel notificatin anytime by toggling notification off.


## Tests

There are a couple of *Jest* tests on action creators in the *\_\_tests\_\_* folder. It still lacks
asynchronous actions creators tests and reducers tests.

## Set Up

Getting the application running on your local machine takes only a few steps:

1. Clone the project - `git clone https://github.com/gapfranco/mobile-flashcards`
2. Install dependencies - `npm install` or `yarn`
4. Start the app - `npm start` or `yarn start`

## Contributing

For specifics on how to contribute to this project, check out the [contributing file](CONTRIBUTING.md).