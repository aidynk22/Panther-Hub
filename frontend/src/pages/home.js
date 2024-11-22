import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date && data.date.toDate ? data.date.toDate().toLocaleDateString() : data.date, // Handle both Firestore timestamp and string date
        };
      });

      // Sort events by the number of RSVPed users in descending order
      const sortedEvents = eventsData.sort((a, b) => (b.rsvpedUsers?.length || 0) - (a.rsvpedUsers?.length || 0));
      setEvents(sortedEvents);
    };
    fetchEvents();
  }, []);

  const handleRSVP = async (eventId, isRSVPed) => {
    const user = auth.currentUser;
    if (user) {
      const eventRef = doc(db, 'events', eventId);
      if (isRSVPed) {
        await updateDoc(eventRef, {
          rsvpedUsers: arrayRemove(user.uid)
        });
        alert('RSVP removed!');
      } else {
        await updateDoc(eventRef, {
          rsvpedUsers: arrayUnion(user.uid)
        });
        alert('RSVP successful!');
      }
      // Refresh events data
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    } else {
      alert('You need to be logged in to RSVP.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="home-page">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="profile-button" onClick={() => navigate('/profile')}>View Profile</button>
      <h1>Home Page</h1>
      <p>Welcome to the Campus Event Hub!</p>
      <button className="events-button" onClick={() => navigate('/events')}>View All Events</button>
      <h2>Recommended Events</h2>
      <ul className="events-list">
        {events.length > 0 ? (
          events.map(event => {
            const user = auth.currentUser;
            const isRSVPed = user && event.rsvpedUsers?.includes(user.uid);
            return (
              <li key={event.id} className="event-item">
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                  <p>Description: {event.description}</p>
                  <p>Capacity: {event.capacity}</p>
                  <p>RSVPed Users: {event.rsvpedUsers?.length || 0}</p>
                </div>
                <button
                  className={`rsvp-button ${isRSVPed ? 'rsvp-button-red' : ''}`}
                  onClick={() => handleRSVP(event.id, isRSVPed)}
                >
                  {isRSVPed ? 'Delete RSVP' : 'RSVP'}
                </button>
              </li>
            );
          })
        ) : (
          <p>No events available.</p>
        )}
      </ul>
    </div>
  );
}

export default Home;