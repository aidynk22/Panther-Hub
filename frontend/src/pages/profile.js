import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/profile.css';
import '../styles/shared.css';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setRole(data.role);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleBack = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="profile-page page-container">
      <h1>Profile Page</h1>
      <p>View and edit your profile here.</p>
      <div className="profile-info form-container">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Password:</strong> {'*'.repeat(8)}</p> {/* Display 8 asterisks for password */}
        <p><strong>Role:</strong> {userData.role}</p>
      </div>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default Profile;