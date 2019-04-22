# Lab 3 - React Notes

## Assignment
For this lab, I used React and Google Firebase to build a collaborative post-it note web app. Users can add notes, delete notes, edit the content in markdown, and drag the notes to different sections of the screen. These changes are all reflected in a Firebase database, so users will see others' changes to the notes in real time.

## Structure
I began with my starterpack from short assignment three then organized the rest of my code into `src` and `services`. The `src` folder contains the three components used in the app...
* `app` holds the map of notes and the top z-index that is used to layer the notes. It has functions to update and retrieve data from Firebase and to render the whole app, including the create bar and the individual notes.
* `createbar` houses the logic to take text input and create a new note with the text input as the title when the "submit" button is pressed. It passes this information back up to `app` through callbacks.
* `note` renders each individual note as a Draggable object and has functions to pass edit, delete, and drag information up to `app` on button clicks.

The `services` folder just contains `database.js` which includes functions to get and update data from Firebase in real time. 

I used a few JavaScript libraries to help with the app's functionality, including...
* Immutable.js to safely deal with the map of notes
* react-draggable to handle the dragging and position updating for each note
* react-textarea-autosize to automaticaly change the size of the text input area as the user types


## Results
I now have a web app where users can add notes, edit the content, drag notes, delete notes, and sync the changes across multiple devices. For extra credit, I added in a dropdown icon that toggles to hide or show the content of the notes, and I set the z-index so that a note displays on top of other notes when it is clicked on. The app is hosted [here](http://emma-cs52-notes.surge.sh/).

![](https://media.giphy.com/media/dh2oVW7NkWzJZXPaVt/giphy.gif)

The functionality of the app all worked eventually, though I had some bugs with properly updating the note position after dragging and deleting notes as I got used to the react-draggable library. If I were to revisit this project, I'd like to add in more organizational features, like the ability to recolor notes based on category or to place the notes within different boards. 
