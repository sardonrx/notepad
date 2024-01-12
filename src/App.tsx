import React, { useState } from 'react';
import "./App.css";

// Interface for the Note
interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  // Step 1: State variables
  const [notes, setNotes] = useState<Note[]>([
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Step 2: Event handlers
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if title and content are not empty
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote: Note = {
        id: notes.length + 1,
        title,
        content,
      };

      setNotes([newNote, ...notes]);

      // Step 5: Clear the form inputs
      setTitle("");
      setContent("");
    }
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    // Create an updated note object
    const updatedNote: Note = {
      id: selectedNote.id,
      title,
      content,
    };

  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

    setNotes(updatedNotesList); // Set the updated notes array to the state
    setTitle(""); // Reset the title input
    setContent(""); // Reset the content input
    setSelectedNote(null); // Reset the selectedNote state
  };

  const handleCancel = () => {
    setTitle(""); // Reset the title input
    setContent(""); // Reset the content input
    setSelectedNote(null); // Reset the selectedNote state
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    // Create a new array excluding the note with the specified id
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes); // Set the updated notes array to the state
  };

  // Step 6: JSX
  return (
    <div className="app-container">
      {/* Step 7: Form */}
      <form onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {/* Step 8: Conditional rendering for buttons */}
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      {/* Step 9: Display notes */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              {/* Step 10: Delete button */}
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
