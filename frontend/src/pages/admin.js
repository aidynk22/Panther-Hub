import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../styles/admin.css';
import '../styles/shared.css';

function Admin() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rsvpedUsers, setRsvpedUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpUsers, setRsvpUsers] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      const q = query(collection(db, 'events'), where('createdBy', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      if (editEventId) {
        // Update existing event
        const eventRef = doc(db, 'events', editEventId);
        await updateDoc(eventRef, {
          title,
          date,
          location,
          description,
          capacity,
          rsvpedUsers,
        });
        alert('Event updated successfully!');
        setEditEventId(null);
      } else {
        // Create new event
        await addDoc(collection(db, 'events'), {
          title,
          date,
          location,
          description,
          capacity,
          rsvpedUsers,
          createdAt: new Date(),
          createdBy: user.uid
        });
        alert('Event created successfully!');
      }
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setCapacity('');
      setRsvpedUsers([]);
      // Fetch the updated list of events
      const q = query(collection(db, 'events'), where('createdBy', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    } catch (error) {
      console.error('Error creating/updating event:', error);
      alert('Error creating/updating event: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setCapacity(event.capacity);
    setRsvpedUsers(event.rsvpedUsers || []);
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      alert('Event deleted successfully!');
      // Fetch the updated list of events
      const user = auth.currentUser;
      const q = query(collection(db, 'events'), where('createdBy', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    }
  };

  const handleViewRSVPs = async (event) => {
    setSelectedEvent(event);
    const rsvpUserIds = event.rsvpedUsers || [];
    const rsvpUserDocs = await Promise.all(rsvpUserIds.map(uid => getDoc(doc(db, 'users', uid))));
    const rsvpUserData = rsvpUserDocs.map(doc => doc.data());
    setRsvpUsers(rsvpUserData);
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
    <div className="admin-page page-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="profile-button" onClick={() => navigate('/profile')}>View Profile</button>
      <h1>Admin Page</h1>
      <p>Manage events and users here.</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editEventId ? 'Update Event' : 'Create Event'}</button>
      </form>
      <h2>Created Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map(event => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <p>Capacity: {event.capacity}</p>
              <button className="edit-button" onClick={() => handleEdit(event)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(event.id)}>Delete</button>
              <button className="view-rsvp-button" onClick={() => handleViewRSVPs(event)}>View RSVPs</button>
            </li>
          ))
        ) : (
          <p>No events created yet.</p>
        )}
      </ul>
      {selectedEvent && (
        <div className="rsvp-modal">
          <h2>RSVPed Users for {selectedEvent.title}</h2>
          <ul>
            {rsvpUsers.length > 0 ? (
              rsvpUsers.map((user, index) => (
                <li key={index}>{user.name} ({user.email})</li>
              ))
            ) : (
              <p>No users have RSVPed for this event.</p>
            )}
          </ul>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Admin;