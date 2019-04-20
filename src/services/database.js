import firebase from 'firebase';

// Set the configuration for your app
const config = {
  apiKey: 'AIzaSyBvXvroag7LwIrShaiLYgFkQNCEsDxzEsY',
  authDomain: 'cs52-lab-3-9731b.firebaseapp.com',
  databaseURL: 'https://cs52-lab-3-9731b.firebaseio.com',
  projectId: 'cs52-lab-3-9731b',
  storageBucket: 'cs52-lab-3-9731b.appspot.com',
  messagingSenderId: '491045480076',
};

firebase.initializeApp(config);

// Get a reference to the database service
const db = firebase.database();
db.ref('notes');

export function fetchNotes(callback) {
  db.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function deleteNote(id) {
  db.ref('notes').child(id).remove();
}

export function updateContent(id, content, title) {
  db.ref('notes').child(id).update({ content, title });
}

export function updatePosition(id, x, y) {
  db.ref('notes').child(id).update({ x, y });
}

export function addNote(newNote) {
  db.ref('notes').push(newNote);
}
