import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Page3.css"; // Import the CSS file
import axios from "axios";

function Page3() {
  const location = useLocation();
  const { noteID } = location.state;
  const { lectureID } = location.state;
  const [noteFeedbacks, setNoteFeedbacks] = useState([]);
  const [noteName, setNoteName] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [transcriptVisible, setTranscriptVisible] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    console.log("id from prev page");
    console.log(noteID);
    console.log(lectureID);
    setTranscript(lectureID.transcript);
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/note/${noteID}`
        );
        console.log(response.data);
        setNoteName(response.data.name);
        setNoteFeedbacks(response.data.feedback);
        setNoteContent(response.data.content);

        
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteID, lectureID]);

  const toggleTranscriptVisibility = () => {
    setTranscriptVisible(!transcriptVisible);
  };

  return (
    <div className="page3-container">
      <h1 className="page3-title">
        {noteName ? `${noteName}` : "Lecture Notes"}
      </h1>
      <div className="notes-box">
        {noteContent && (
          <div>
            <p>{noteContent}</p>
          </div>
        )}
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
      <button
        onClick={toggleTranscriptVisibility}
        className="transcript-button"
      >
        {transcriptVisible ? "Hide Transcript" : `View ${lectureID.name} Transcript`}
      </button>
      {transcriptVisible && (
        <div className="transcript-box">
          <textarea
            className="transcript-textarea"
            readOnly
            value={transcript}
          />
        </div>
      )}
    </div>
  );
}

export default Page3;
