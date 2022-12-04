import './App.css';
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Note from "./Components/Note";
import "bootstrap/dist/css/bootstrap.min.css";
import { fromEvent } from "rxjs";
import { useEffect, useState, useRef } from "react";
import AddNotes from "./Components/AddNotes";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const ref = useRef(null);

  useEffect(() => {
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const onDelete = (id) => {
    let updatedNotes = notes.filter((note) => note.id !== id);
    updatedNotes = updatedNotes.filter((note) => note.parent !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const click = fromEvent(
      document.getElementsByClassName("delete-note"),
      "click"
    ).subscribe((clicked) => {
      console.log("clicked delete", clicked.target.id);
      onDelete(+clicked.target.id);
    });

    return () => {
      click.unsubscribe();
    };
  }, [notes]);

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
              deleteRef={ref}
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
