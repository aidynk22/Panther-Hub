import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import '../styles/home.css'; // Import home.css to reuse styles

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
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

  return (
    <div className="home-page"> {/* Use home-page class */}
      <h1>Events Page</h1>
      <p>View and manage events here.</p>
      <button onClick={() => navigate('/home')}>Back to Home</button> {/* Change button label */}
      <h2>All Events</h2>
      <ul className="events-list"> {/* Use events-list class */}
        {events.length > 0 ? (
          events.map(event => {
            const user = auth.currentUser;
            const isRSVPed = user && event.rsvpedUsers?.includes(user.uid);
            return (
              <li key={event.id} className="event-item"> {/* Use event-item class */}
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

export default Events;