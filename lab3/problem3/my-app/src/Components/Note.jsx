import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  FormControl } from "react-bootstrap";
import { Button, ButtonGroup} from '@chakra-ui/react'


function Note({
    noteColor,
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
  
    return (
      <div
        style={{
          width: parent ? "250px" : "300px",
          margin: "15px auto",
          background: noteColor,
          border: "1px solid black",
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
            background: "#fff",
            padding: "15px",
          }}
        >
          <ButtonGroup>
            <Button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              variant="solid"
            >
              Edit Note
            </Button>
            <Button
              onClick={() => {
                onDelete(id);
              }}
              variant="outline"
            >
              Delete Note
            </Button>
          </ButtonGroup>

          <div>{children}</div>
        </div>
      </div>
    );
}

  
export default Note;