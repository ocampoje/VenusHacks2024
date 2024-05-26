import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import Page2 from "./Page2";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function extractFeedbackArray(response) {
  // Extract the response text
  const responseText = response.response;

  // Use regex to find the array-like structure part between /**@**/ markers
  const feedbackArrayMatch = responseText.match(
    /\/\*\*@\*\*\/\s*\[(.*?)\]\s*\/\*\*@\*\*\//s
  );

  if (feedbackArrayMatch) {
    const feedbackArrayString = `[${feedbackArrayMatch[1]}]`;

    return JSON.parse(feedbackArrayString);
  } else {
    return responseText;
  }
}

function AllNotesButton() {
  const navigate = useNavigate();

  const handleAllNotesClick = () => {
    console.log("button has been pressed");
    navigate(`/page2/`);
  };

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
  const [Lecture_Content, setLectureContent] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    const LecID = Lecture_ID.toString();
    console.log("Lecture ID:", LecID);

    try {
      // Make POST request to add note
      const addNoteResponse = await axios.post(
        "http://localhost:3001/addNote",
        {
          noteName: Note_Name,
          noteContent: Note_Content,
          noteFeedback: [],
          lectureId: LecID,
        }
      );

      if (addNoteResponse.data && addNoteResponse.data.noteId) {
        const noteId = addNoteResponse.data.noteId;
        setNoteID(noteId);

        try {
          // Fetch lecture content
          const lectureResponse = await axios.get(
            `http://localhost:3001/lecture/${LecID}`
          );
          setLectureContent(lectureResponse.data);

          try {
            // Ensure the state is updated before making the GPT query
            const gptResponse = await axios.post(
              "http://localhost:3001/gpt/query",
              {
                transcript: lectureResponse.data,
                notes: Note_Content,
              }
            );
            const feedbackArray = extractFeedbackArray(gptResponse.data);
            console.log("Feedback Array:", feedbackArray);

            // Put request to update note with feedback
            const updateResponse = await axios.put(
              `http://localhost:3001/note/${noteId}`,
              {
                noteFeedback: feedbackArray,
              }
            );

            console.log("Update Response:", updateResponse.data);
            alert(
              "Your notes have been saved! View what you missed in All ReCaps."
            );
          } catch (gptError) {
            console.error("Failed to generate response:", gptError);
            alert("Try Again! Make sure all fields are complete.");
          }
        } catch (lectureError) {
          console.error("Failed to get lecture:", lectureError);
        }
      } else {
        console.error("Failed to add note:", addNoteResponse.data);
      }
    } catch (addNoteError) {
      console.error(addNoteError);
    }
  };

  {
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
        <li className="note-title">
          <label>Give Your Notes A Title: </label>
          <input
            value={Note_Name}
            placeholder="Insert Title"
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
        <div className="buttons-container">
          <AllNotesButton />
          <SubmitButton />
        </div>
      </div>
    );
  }
}
