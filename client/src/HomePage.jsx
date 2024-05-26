import React from 'react';
import { useState } from 'react';
import './HomePage.css';
import axios from "axios";

function textBox(){
  return (
    <div>
      <input> Enter Text Here
      </input>
    </div>
  )
}

function SubmitButton(){
  const SubmitQuery = () => {

  };
  return (
    <div className="submit-button-container">
      <button onClick={SubmitQuery} className="compare-notes-button">
        Submit ReCap
      </button>
    </div>
  )
}

function AllNotesButton(){
  const handleAllNotesClick = () => {
  };
  
  return (
    <div className="all-notes-button-container">
      <button onClick={handleAllNotesClick} className="all-notes-button">
        View All ReCaps
      </button>
    </div>
  )
}

// function SelectClassButton() {
//   const SelectClass = () => {};

//   return (
//     <div className="select-class-container">
//       <button onClick={SelectClass} className="select-class-button">
//         Select a class:
//       </button>
//     </div>
//   );
// }

function SelectLectureButton() {
  const SelectLecture = () => {};

  return (
    <div className="select-lecture-container">
      <button onClick={SelectLecture} className="select-lecture-button">
        Select a Lecture:
      </button>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function() {
  const fullwidthInput = document.getElementById('full-width-input');
  const fullsizeTextarea = document.getElementById('full-size-textarea');

  function adjustToWindowSize() {
    fullwidthInput.style.width = window.innerWidth + 'px';
    fullsizeTextarea.style.width = window.innerWidth + 'px';
    fullsizeTextarea.style.height = window.innerHeight + 'px';
  }
});

export default function HomePage() {
  const lectureResults = getLectures();
  async function getLectures() {
    try {
      const lectureResults = await axios.get("http://localhost:3001/lectures");
      console.log(lectureResults.data);
      populateDropdown(lectureResults.data)
      
    } catch (error) {
      console.error(error);
    }};
  
    function populateDropdown(lectures) {
      const dropdown = document.getElementById('lectureDropdown');
      lectures.forEach(lecture => {
        const option = document.createElement('option');
        option.value = lecture.id; // Assuming each lecture has an 'id' you want as the value
        option.text = lecture.title; // And a 'title' to display in the dropdown
        dropdown.add(option);
      });
    }

  function SubmitButton(){
    const SubmitQuery = () => {
  
    };
    return (
      <div className="submit-button-container">
        <button onClick={handleAddNote} className="compare-notes-button">
          Submit ReCap
        </button>
      </div>
    )
  }

  const [Note_Name, setNoteName] = useState("");
  const [Note_Content, setNoteContent] = useState("");
  const [Note_Feedback, setNoteFeedback] = useState("");
  const [Lecture_ID, setLectureID] = useState("");
  const [Note_ID, setNoteID] = useState("");
  const [lectures, setLectures] = useState([]);

  const [Lecture_Name, setLectureName] = useState("");
  const [Lecture_Content, setLectureContent] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const response = await axios.post("http://localhost:3001/addNote", {
        noteName: Note_Name,
        noteContent: Note_Content,
        noteFeedback: [],
        lectureId: Lecture_ID,
      });
      console.log(response.data);
      setLectures(response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const response = await axios.post("http://localhost:3001/addLecture", {
        lectureName: Lecture_Name,
        lectureTranscript: Lecture_Content,
      });
      console.log(response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      // Make put request to update not
      const response = await axios.put(`http://localhost:3001/note/${Note_ID}`, 
      {
        noteName: Note_Name,
        noteFeedback: Note_Feedback,
        noteContent: Note_Content,
      });
      console.log(response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };
    {const [Note_Name, setNoteName] = useState('');
    const [Note_Content, setNoteContent] = useState('');
    const [selectedLecture, setSelectedLecture] = useState('');
  
    const handleNoteNameChange = (e) => {
      setNoteName(e.target.value);
    };
  
    const handleNoteContentChange = (e) => {
      setNoteContent(e.target.value);
    };
  
    const handleLectureChange = (e) => {
      setSelectedLecture(e.target.value);
    };

  document.addEventListener('DOMContentLoaded', getLectures);

  return (
    <div className="homepage-container">
      <div className="title-container">
        <h1 className="righteous-regular">ReCap</h1>
        <p className="subheading">Take note of what you missed.</p>
      </div>
      <div className="select-lecture-container">
        <label htmlFor="lectureSelect" className="select-lecture-label">Select a Lecture:</label>
        <select id="lectureDropdown" className="select-lecture-dropdown" value={selectedLecture} onChange={handleLectureChange}>
          <option value="">-- Select a lecture --</option>
          <option value="Lecture 1">Lecture 1</option>
          <option value="Lecture 2">Lecture 2</option>
          <option value="Lecture 3">Lecture 3</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
        <li className="note-title">
          Note Title 
          <input value={Note_Name} onChange={handleNoteNameChange}></input>
        </li>
        <li>
          <p className="notes-input"></p>
          <textarea rows="20" value={Note_Content} id="dynamic-input" placeholder="Insert Notes" onChange={handleNoteContentChange}></textarea>
        </li>
      </ul>
      <div className="buttons-container">
        <AllNotesButton />
        <SubmitButton />
      </div>
    </div>
  );
}
}