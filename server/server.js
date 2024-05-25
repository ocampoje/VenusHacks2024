require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var gptRouter = require("./routes/gpt");
var testRouter = require("./routes/test");

const cors = require("cors");
const mongoose = require("mongoose");
// mongodb models
const LectureModel = require("./models/Lecture");
const NoteModel = require("./models/Note");

// port to use
const PORT = process.env.PORT || 3001;
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((err) => console.log(err));

//#region mongo db endpoints

// curl http://localhost:3001/lectures
app.get("/lectures", async (req, res) => {
  try {
    const lectures = await LectureModel.find();
    const formattedLectures = lectures.map((lecture) => ({
      LectureName: lecture.name,
      LectureTranscript: lecture.transcript,
    }));
    res.json(formattedLectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).send("Failed to fetch lectures");
  }
});

// curl http://localhost:3001/notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await NoteModel.find().populate({
      path: "lecture_id",
      select: "name transcript",
    });
    const formattedNotes = notes.map((note) => ({
      NoteName: note.name,
      NoteContent: note.content,
      NoteFeedback: note.feedback,
      LectureId: note.lecture_id,
      Lecture: note.lecture_id
        ? { name: note.lecture_id.name, transcript: note.lecture_id.transcript }
        : { name: "N/A", transcript: "N/A" },
    }));
    res.json(formattedNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Failed to fetch notes");
  }
});

app.post("/addLecture", async (req, res) => {
  const { lectureName, lectureTranscript } = req.body;

  try {
    // Check if lecture already exists
    const existingLecture = await LectureModel.findOne({
      name: lectureName,
    }).exec();
    if (existingLecture) {
      return res
        .status(400)
        .json({ message: "Lecture with this name already exists." });
    }
    // If not, create a new lecture
    const newLecture = new LectureModel({
      name: lectureName,
      transcript: lectureTranscript,
    });
    await newLecture.save();
    res
      .status(201)
      .json({ message: "Lecture added successfully", lecture: newLecture });
  } catch (error) {
    console.error("Error adding lecture:", error);
    res
      .status(500)
      .json({ message: "Failed to add lecture due to server error" });
  }
});

app.post("/addNote", async (req, res) => {
  const { noteName, noteContent, noteFeedback, lectureId } = req.body;

  // Check if note with name already exists
  const existingNote = await NoteModel.findOne({
    name: noteName,
  }).exec();
  if (existingNote) {
    return res
      .status(400)
      .json({ message: "Note with this name already exists." });
  }

  // Check if lecture exists
  const Lecture = await LectureModel.findById;
  if (!Lecture) {
    return res.status(400).json({ message: "Lecture not found." });
  }

  const newNote = new NoteModel({
    name: noteName,
    content: noteContent,
    feedback: noteFeedback,
    lecture_id: lectureId,
  });

  try {
    await newNote.save();
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Failed to add note due to server error" });
  }
});

//curl -X DELETE "http://localhost:3001/deleteNoteByName/{note name}" spaces are %20

app.delete("/deleteNoteByName/:name", async (req, res) => {
  const name = req.params.name; // Correct extraction of name from params
  NoteModel.deleteOne({ name: name })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).send(`Note with name '${name}' deleted successfully.`);
      } else {
        res.status(404).send("Note not found.");
      }
    })
    .catch((err) => {
      console.error("Error during deletion:", err);
      res.status(500).json(err);
    });
});

//curl -X DELETE "http://localhost:3001/deleteLectureByName/{lecture name}" spaces are %20

app.delete("/deleteLectureByName/:name", async (req, res) => {
  const name = req.params.name;
  LectureModel.deleteOne({ name }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send(`Lecture with name '${name}' deleted successfully.`);
    } else {
      res.status(404).send("Lecture not found.");
    }
  });
});

// edit a note by providing note by _id
// curl -X PUT "http://localhost:3001/note/{noteId}" -H "Content-Type: application/json" -d "{\"noteName\":\"new name\",\"noteContent\":\"new content\",\"noteFeedback\":\"new feedback\"}"
app.put("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await NoteModel.findById(noteId);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (req.body.noteName)
      note.name = req.body.noteName;
    if (req.body.noteContent)
      note.content = req.body.noteContent;
    if (req.body.noteFeedback)
      note.feedback = req.body.noteFeedback;

    await note.save();
    res.send(note);
  } catch (error) {
    console.error("Failed to update note:", error);
    res.status(500).send("Internal server error");
  }
});

//#endregion

//#region  endpoints

// curl http://localhost:3001/
app.use("/", indexRouter);
// curl http://localhost:3001/users
app.use("/users", usersRouter);

/*

$body = @{
    systemMessage = "You are a helpful study assistant that will help students"
    query = "text for the notes we submit"
}

$jsonBody = $body | ConvertTo-Json

$response = Invoke-RestMethod -Uri http://localhost:3001/gpt/query -Method Post -ContentType "application/json" -Body $jsonBody

$response

*/

app.use("/gpt", gptRouter);
/*

$body = @{
    systemMessage = "this is a test for a system message"
    query = "Can you help me with this sample query test test?"
}

$jsonBody = $body | ConvertTo-Json

$response = Invoke-RestMethod -Uri http://localhost:3001/test/queryPost -Method Post -ContentType "application/json" -Body $jsonBody

$response

*/
app.use("/test", testRouter);
//curl http://localhost:3001/test/queryGET

//#endregion

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.title = "Error";
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.listen(PORT, () => console.log("Server is running"));
module.exports = app;
