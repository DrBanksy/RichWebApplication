import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  FormControl } from "react-bootstrap";
import { Button, ButtonGroup} from '@chakra-ui/react'


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

    return (
      <div
        style={{
          width: parent ? "250px" : "300px",
          margin: "15px auto",
          background: color,
          border: "1px solid black",
        }}
      >
        <span>Note ID: {id}</span>

        <div
          style={{
            background: "#fff",
            padding: "15px",
          }}
        >
          <ButtonGroup>
            <Button>
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