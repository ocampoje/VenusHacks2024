import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page2.css';

function LectureButton({ lecture }) {
  const navigate = useNavigate();
  console.log(lecture);

  const handleLectureClick = () => {
    navigate(`/page3/${lecture.name}`, { state: { noteID: lecture._id } });
  };

  return (
    <div className="lecture-button-container">
      <button onClick={handleLectureClick} className="lecture-button">
        {lecture.name}
      </button>
    </div>
  );
}


export default function Page2() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await fetch('http://localhost:3001/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch lectures');
      }
      const data = await response.json();
      const lectureData = data.map(note => ({
        _id: note._id,
        name: note.NoteName
      }));
      setLectures(lectureData);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  return (
    <div className="p2-container">
      <h1 className="righteous-regular">Recent ReCaps</h1>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
        {lectures.map(lecture => (

          <li key={lecture._id}>
            <LectureButton lecture={lecture} />
          </li>
        ))}
      </ul>
    </div>
  );
}
