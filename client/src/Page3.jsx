import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Page3.css'; // Import the CSS file

function Page3() {
  const { id } = useParams(); // Get the note name from the URL
  const [noteFeedbacks, setNoteFeedbacks] = useState([]);

  // Fetch note feedbacks based on the note name
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/note/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch note feedbacks');
        }
        const data = await response.json();
        setNoteFeedbacks(data.NoteFeedbacks);
      } catch (error) {
        console.error('Error fetching note feedbacks:', error);
      }
    };

    if (id) {
      fetchFeedbacks();
    }
  }, [id]);

  return (
    <div className="page3-container">
      <h1 className="page3-title">Page 3</h1>
      <div>
        <h2>Note Feedbacks</h2>
        <div className="feedback-box">
          {noteFeedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <p>{feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;
