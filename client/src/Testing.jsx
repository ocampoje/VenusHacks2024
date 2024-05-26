import React from "react";

//subBut.addEventListener("click", getAllData);
import axios from "axios"; // Import axios for making HTTP requests
import { useState } from "react";

function extractFeedbackArray(response) {
  const responseText = response.response;

  const feedbackArrayMatch = responseText.match(
    /\/\*\*@\*\*\/\[(.*?)\]\/\*\*@\*\*\//
  );

  if (feedbackArrayMatch) {
    const feedbackArrayString = `[${feedbackArrayMatch[1]}]`;

    return JSON.parse(feedbackArrayString);
  } else {
    return responseText;
  }
}

function Testing() {
  const [Note_Name, setNoteName] = useState("");
  const [Note_Content, setNoteContent] = useState("");
  const [Note_Feedback, setNoteFeedback] = useState("");
  const [Lecture_ID, setLectureID] = useState("");
  const [Note_ID, setNoteID] = useState("");

  const [Lecture_Name, setLectureName] = useState("");
  const [Lecture_Content, setLectureContent] = useState("");

  const [transcript, setTranscript] = useState("");
  const [notes, setNotes] = useState("");

  const [response, setResponse] = useState("");

  const handleGPT = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const response = await axios.post("http://localhost:3001/gpt/query", {
        transcript: transcript,
        notes: notes,
      });
      const feedbackArray = extractFeedbackArray(response.data);
      setResponse(feedbackArray);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
      setResponse("Error: " + error);
    }
  };
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const response = await axios.post("http://localhost:3001/addNote", {
        noteName: Note_Name,
        noteContent: Note_Content,
        noteFeedback: Note_Feedback,
        lectureId: Lecture_ID,
      });
      console.log(response.data);
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
      const response = await axios.put(
        `http://localhost:3001/note/${Note_ID}`,
        {
          noteName: Note_Name,
          noteFeedback: Note_Feedback,
          noteContent: Note_Content,
        }
      );
      console.log(response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        Add Notes:
        <input
          value={Note_Name}
          placeholder="Note Name"
          onChange={(e) => setNoteName(e.target.value)}
        />
        <input
          value={Note_Content}
          placeholder="Note Content"
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <input
          value={Note_Feedback}
          placeholder="Note Feedback"
          onChange={(e) => setNoteFeedback(e.target.value)}
        />
        <input
          value={Lecture_ID}
          placeholder="Lecture ID"
          onChange={(e) => setLectureID(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div>
        Add Lecture:
        <input
          value={Lecture_Name}
          placeholder="Lecture Name"
          onChange={(e) => setLectureName(e.target.value)}
        />
        <input
          value={Lecture_Content}
          placeholder="Lecture Content"
          onChange={(e) => setLectureContent(e.target.value)}
        />
        <button onClick={handleAddLecture}>Add Lecture</button>
      </div>

      <div>
        Update Notes:
        <input
          placeholder="Note ID"
          value={Note_ID}
          onChange={(e) => setNoteID(e.target.value)}
        />
        <input
          value={Note_Name}
          placeholder="Note Name"
          onChange={(e) => setNoteName(e.target.value)}
        />
        <input
          placeholder="Note Content"
          value={Note_Content}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <input
          value={Note_Feedback}
          placeholder="Note Feedback"
          onChange={(e) => setNoteFeedback(e.target.value)}
        />
        <button onClick={handleUpdateNote}>Update Note</button>
      </div>

      <div>
        <h1>Testing Model</h1>
        <input
          value={transcript}
          placeholder="Transcript"
          onChange={(e) => setTranscript(e.target.value)}
        />
        <input
          value={notes}
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={handleGPT}>Test</button>
      </div>
      <div>
        {/* Other component elements */}

        <form onSubmit={handleGPT}>{/* Form inputs and submit button */}</form>

        <textarea
          value={response}
          readOnly
          style={{ width: "100%", height: "300px", marginTop: "20px" }}
          placeholder="Response will be shown here"
        />
      </div>
    </div>
  );
}

export default Testing;
