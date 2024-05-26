import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

function textBox() {
  return (
    <div>
      <input> Enter Text Here</input>
    </div>
  );
}

function AllNotesButton() {
  const handleAllNotesClick = () => {};

  return (
    <div className="all-notes-button-container">
      <button onClick={handleAllNotesClick} className="all-notes-button">
        View All ReCaps
      </button>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const fullwidthInput = document.getElementById("full-width-input");
  const fullsizeTextarea = document.getElementById("full-size-textarea");

  function adjustToWindowSize() {
    fullwidthInput.style.width = window.innerWidth + "px";
    fullsizeTextarea.style.width = window.innerWidth + "px";
    fullsizeTextarea.style.height = window.innerHeight + "px";
  }
});

export default function HomePage() {
  const [lectures, setLectures] = useState([]); // store fetched lecture data
  const [selectedLecture, setSelectedLecture] = useState(""); // lecture ID
  useEffect(() => {
    const getLectures = async () => {
      try {
        const response = await axios.get("http://localhost:3001/lectures2");
        setLectures(response.data); // store fetched lecture data
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      }
    };

    getLectures();
  }, []);

  function SubmitButton() {
    const SubmitQuery = () => {};
    return (
      <div className="submit-button-container">
        <button onClick={handleAddNote} className="compare-notes-button">
          Submit ReCap
        </button>
      </div>
    );
  }

  const [Note_Name, setNoteName] = useState("");
  const [Note_Content, setNoteContent] = useState("");
  const [Note_Feedback, setNoteFeedback] = useState("");
  const [Lecture_ID, setLectureID] = useState("");
  const [Note_ID, setNoteID] = useState("");

  const handleAddNote = async (e) => {
    const LecID = Lecture_ID.toString();
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const response = await axios.post("http://localhost:3001/addNote", {
        noteName: Note_Name,
        noteContent: Note_Content,
        noteFeedback: [],
        lectureId: "66524dbcc0ab0d354c539792",
      });
      console.log(response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };

  {
    const handleNoteNameChange = (e) => {
      setNoteName(e.target.value);
    };

    const handleNoteContentChange = (e) => {
      setNoteContent(e.target.value);
    };

    return (
      <div className="homepage-container">
        <div className="title-container">
          <h1 className="righteous-regular">ReCap</h1>
          <p className="subheading">Take note of what you missed.</p>
        </div>
        <div className="select-lecture-container">
          <label htmlFor="lectureDropdown" className="select-lecture-label">
            Select a Lecture:
          </label>
          <select
            id="lectureDropdown"
            className="select-lecture-dropdown"
            onChange={(e) => setLectureID(e.target.value)}
          >
            <option value="">-- Select a lecture --</option>
            {lectures.map((lecture) => (
              <option key={lecture.LectureId} value={lecture.LectureId}>
                {lecture.LectureName}
              </option>
            ))}
          </select>
        </div>
        <ul style={{ color: "#ba55d3", listStyleType: "none", padding: 0 }}>
          <li className="note-title">
            Note Title
            <input
              value={Note_Name}
              onChange={(e) => setNoteName(e.target.value)}
            ></input>
          </li>
          <li>
            <p className="notes-input"></p>
            <textarea
              rows="20"
              value={Note_Content}
              id="dynamic-input"
              placeholder="Insert Notes"
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
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
