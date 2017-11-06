# Mobile Flashcards

React Native application implementing flashcard decks for studies.

## Specifications

- Users can create decks of cards for any subjects
- Each deck can have an unlimited number of cards with questions and answers
- Users can add cards to decks
- Users can go through all cards in a deck and try to answers the questions one by one
- Users can register questions as answered correctly or incorrectly and save the results
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

- Notifications can be turned on or off in the settings tab
- Notification time can be changed on the settings tab
- History tab shows all cards answered by date, with final results

## User experience

### Main view

The main view shows three tabs, *Decks*, *History* and *Settings*:

![main view](/images/screen01.png)

The *Decks* tab lists all decks created by the user. The *History* tab shows the decks that were
anwered by date and the *Settings* tab has options to create new decks and control notifications.

The app starts with sample data in four decks for testing. If you prefer to start clean,
change line 9 of deckApi.js:

```
9  const data = dummyData
```
to
```
9  const data = {}
```
*dummyData* contains the sample data (from utils/dummyData.js).

To reset app contents, you can uncomment line 126 of *App.js*:

```
124 // Reset contents:
125 // Uncomment and restart to reset to initial content. Then comment and restart again
126 //resetStorage()
```
Restart the app, then comment the line again.

### Completing a quiz

Clicking in a deck opens it with options to start the quiz or add new cards.

![screen02](/images/screen02.png)

Pressing *Start Quiz* shows the quiz cards, to be answered one by one.

![screen03](/images/screen03.png)

The user can try to answer the questions and press *Correct* or *Incorrect*.
Pressing *Show answer*, turns the card, showing the right answer:

![screen04](/images/screen04.png)

The last screen shows the final result:

![screen05](/images/screen05.png)

The user can *Restart Quiz* to start anew or *Back to Deck* to finish the quiz, saving
the result and going back to the deck screen.

The results are registered on the *History* tab, grouped by date.

![screen06](/images/screen06.png)

To create new cards in a deck, press the button *Add Card* and fill the fields for question and answer.

![screen09](/images/screen09.png)

Pressing *Add Card* sends the new card to the deck.

### Settings

The *Settings* tab has options for creating new decks and controlling notifications.

![screen07](/images/screen07.png)

To add a new deck, enter its title and press *Add Deck*. If the a deck with the same title
exists an error message wil be shown.

With the *Notification* panel, the user can press the time field to choose a time and toggle
notifications *on* or *off*. After setting the choices, press the button *Set Notification* to
make them active.

If the time chosen is *before* the current time, notification will be scheduled to the next day.
If it is *after* the current time, it will schedule to the seme day. When the user answer
a quiz it will cancel the notification for the day and reschedule to the same hour next day.

The user can cancel notificatin anytime by toggling notification off.

### Compatibility

The app was tested in iphone and android devices. Exemples in Android:

![screen10](/images/screen10.png)

![screen11](/images/screen11.png)

## Set Up

Getting the application running on your local machine takes only a few steps:

1. Clone the project - `git clone https://github.com/gapfranco/mobile-flashcards`
2. Install dependencies - `npm install` or `yarn`
4. Start the app - `npm start` or `yarn start`
5. Connect a device with Expo

## Contributing

For specifics on how to contribute to this project, check out the [contributing file](CONTRIBUTING.md).
