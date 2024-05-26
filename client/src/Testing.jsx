import React from 'react';
import {useState} from 'react';

//subBut.addEventListener("click", getAllData);

export default function Testing() {
    const [addNotes, setNotes] = useState('');
    const [newLecture, setLecture] = useState('');
    const [updateNotes, setUpdateNotes] = useState('');

    function getAllData(formData){
        //let lectureName = document.getElementById('lectureName').value;
        //var noteContent = document.getElementById('noteContent').value;
        //var noteFeedback = document.getElementById('noteFeedback').value;
        //var lectureID = document.getElementById('lectureID').value;
        //console.log(lectureName);

        
    }

  return (
    <div>
        Add Notes:
        <input value={addNotes} onChange={e => setNotes(e.target.value)}/>

        <input value={newLecture} onChange={e => setLecture(e.target.value)}/>
        <input value={updateNotes} onChange={e => setUpdateNotes(e.target.value)}/>



        <button onClick={getAllData}></button>
    </div>
  );
}
