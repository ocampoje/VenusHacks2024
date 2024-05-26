import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Page2.css";

function NoteButton({ note }) {
  const navigate = useNavigate();

  const handleNoteClick = () => {
    console.log(note._id)
    navigate(`/page3/${note.name}`, { state: { noteID: note._id , lectureID : note.lecture_id} });
  };

  return (
    <div className="lecture-button-container">
      <button onClick={handleNoteClick} className="lecture-button">
        {note.name}
      </button>
    </div>
  );
}

export default function Page2() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      const noteData = data.map((note) => ({
        _id: note.NoteId,
        name: note.NoteName,
        lecture_id: note.LectureId,
      }));
      setNotes(noteData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="p2-container">
      <h1 className="righteous-regular">Recent ReCaps</h1>
      <ul style={{ color: "#ba55d3", listStyleType: "none", padding: 0 }}>
        {notes.map((note) => (
          <li key={note._id}>
            <NoteButton note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
}
