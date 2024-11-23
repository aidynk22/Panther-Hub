const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add a new user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRef = db.collection('users').doc();
    await userRef.set({
      name,
      email,
      password,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).send({ id: userRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new event
app.post('/events', async (req, res) => {
  const { title, date, location, description, attendees } = req.body;
  try {
    const eventRef = db.collection('events').doc();
    await eventRef.set({
      title,
      date,
      location,
      description,
      attendees,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).send({ id: eventRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;