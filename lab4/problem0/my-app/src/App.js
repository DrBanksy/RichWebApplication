import './App.css';
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Note from "./Components/Note";
import "bootstrap/dist/css/bootstrap.min.css";
import { fromEvent } from "rxjs";
import { useEffect, useState, useRef } from "react";
import AddNotes from "./Components/AddNotes";
import { Grid, GridItem } from '@chakra-ui/react'
import { Row, Col } from "react-bootstrap";


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
      <Row>
      {notes.map((note, i) => (
        <Col sm={4}>
          <Note
            key={note.id}
            text={note.note}
            color={note.color}
            id={note.id}
            onDelete={onDelete}
            deleteRef={ref}
            notes={notes}
            setNotes={setNotes}
          ></Note>
        </Col>
      ))}
      </Row>
      
      <AddNotes notesarray={notes} setNotes={setNotes} />
    </div>
  );
}



export default App;
