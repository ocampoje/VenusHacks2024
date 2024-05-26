import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Page3.css'; // Import the CSS file

function Page3() {
  const { id } = useParams(); // Get the lecture ID from the URL
  const [noteFeedbacks, setNoteFeedbacks] = useState([]);
  const [lectureName, setLectureName] = useState("");

  // Fetch lecture name based on the lecture ID
  useEffect(() => {
    const fetchLectureName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/lectures/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lecture details');
        }
        const data = await response.json();
        setLectureName(data.name); // Store fetched lecture name
      } catch (error) {
        console.error('Error fetching lecture name:', error);
      }
    };

    fetchLectureName();
  }, [id]);

  // Fetch note feedbacks based on the lecture ID
  useEffect(() => {
    const fetchNoteFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/notes/${id}/feedbacks`);
        if (!response.ok) {
          throw new Error('Failed to fetch note feedbacks');
        }
        const data = await response.json();
        setNoteFeedbacks(data); // Store fetched note feedbacks
      } catch (error) {
        console.error('Error fetching note feedbacks:', error);
      }
    };

    fetchNoteFeedbacks();
  }, [id]);

  return (
    <div className="page3-container">
      <h1 className="page3-title">{lectureName} Lecture Notes</h1>
      <div className="notes-box">
      </div>
      <div>
        <p className="recap-text">Here's a Recap of what you missed: </p>
        <ul className="note-feedbacks">
          {noteFeedbacks.map((feedback, index) => (
            <li key={index}>
              <p>{feedback}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page3;
