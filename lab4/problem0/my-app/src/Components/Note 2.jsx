import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  FormControl } from "react-bootstrap";
import { Button, ButtonGroup} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'


function Note({
    color,
    id,
    text,
    children,
    parent,
    onDelete,
    setNotes,
    notes,
  }) {

    const [isEditing, setIsEditing] = useState(null);
    const [editedContent, setEditedContent] = useState(null);
    useEffect(() => {
      if (isEditing === false) {
        const updatedNotes = notes.map((note) => {
          return {
            ...note,
            note: note.id === id ? editedContent : note.note,
          };
        });
        setNotes(updatedNotes);
      }
    }, [isEditing]);

    return (
      <Container maxW='300px' border="1px" mx="auto" mt="10px" p="20px" centerContent
        style={{
          background: color,
        }}
      >
        <span>Note ID: {id}</span>
        {isEditing ? (
          <FormControl
            onChange={(e) => {
              setEditedContent(e.target.value);
            }}
            defaultValue={text}
          />
        ) : (
          <p>{text}</p>
        )}
        <div
          style={{
            background: color,
            padding: "15px",
          }}
        >
          <ButtonGroup >
            <Button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              variant="solid"
            >
              Edit Note
            </Button>
            <Button
              id={id}
              className="delete-note"
              variant="solid"
            >
              Delete Note
            </Button>
          </ButtonGroup>

          <div>{children}</div>
        </div>
      </Container>
    );
}

  
export default Note;