import './App.css';
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Note from "./Components/Note";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import AddNotes from "./Components/AddNotes";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const onDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };
  return (
    <div className="App">
      <VStack spacing='10px'>
        {notes.map((note) => {
          const isParent = !note.parent;
          if (note.parent) {
            return null;
          }
          const children = notes.filter((n) => n.parent === note.id);
          return (
            <Note
              key={note.id}
              text={note.note}
              color={note.color}
              id={note.id}
              onDelete={onDelete}
              notes={notes}
              setNotes={setNotes}
            >
              {children.map((c) => {
                return (
                  <Note
                    parent={note.id}
                    id={c.id}
                    text={c.note}
                    color={c.color}
                    onDelete={onDelete}
                    notes={notes}
                    setNotes={setNotes}
                  />
                );
              })}
            </Note>
          );
        })}
      </VStack>
      <AddNotes notesarray={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
