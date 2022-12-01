import React from "react";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { Button, ButtonGroup } from '@chakra-ui/react';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDownIcon } from '@chakra-ui/icons'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'

export default function AddNotes({ notesarray, setNotes }) {
    const [color, setColor] = useState(null);
    const [parent, setParent] = useState(null);
    const [note, setNote] = useState(null);

    const parentNotes =
    notesarray && notesarray.filter((note) => note.parent === null);
  
    useEffect(() => {
      if (notesarray.length === 0) {
        setParent(null);
      }
    }, [notesarray]);
  
    const onAdd = () => {
      if (!note) {
        return;
      }
      const notes = localStorage.getItem("notes");
      const notesIdCounter = +localStorage.getItem("notesIdCounter");
      if (notes) {
        const notesArray = JSON.parse(notes);
        notesArray.push({
          parent: !parent ? null : +parent,
          id: notesIdCounter + 1,
          note,
          color,
        });
        localStorage.setItem("notes", JSON.stringify(notesArray));
        localStorage.setItem("notesIdCounter", notesIdCounter + 1);
        setNotes(notesArray);
      } else {
        const notes = [
          {
            parent: null,
            id: 1,
            note,
            color,
          },
        ];
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("notesIdCounter", 1);
        setNotes(notes);
      }
    };
  
    const colorChoices = {
      blue: "blue",
      yellow: "yellow",
      red: "red",
      pink: "pink"
    };
  
    return (
        <div
        style={{
          width: "300px",
          margin: "0 auto",
          margintop: "0px",
          border: "1px solid black",
          padding: "40px",
        }}
      >
        <FormControl
          onChange={(e) => {
            setNote(e.target.value);
          }}
          as="textarea"
          placeholder="New note"
        />{" "}
        <ButtonGroup
          style={{
            margin: "10px 0",
          }}
        >
          <DropdownButton
          onSelect={(noteId) => {
            setParent(+noteId);
          }}
          title={"Parent Note"}
          variant="secondary"
        >
          <Dropdown.Item eventKey={null}>No Parent</Dropdown.Item>
          {parentNotes?.map((p) => {
            return (
              <Dropdown.Item active={parent === p.id} eventKey={p.id}>
                {p.id}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
          <DropdownButton
            onSelect={(color) => {
              setColor(colorChoices[color]);
            }}
            title={"Color"}
            variant="secondary"
          >
            <Dropdown.Item active={color === colorChoices["blue"]} eventKey="blue">
              Blue
            </Dropdown.Item>
            <Dropdown.Item
              active={color === colorChoices["yellow"]}
              eventKey="yellow"
            >
              Yellow
            </Dropdown.Item>
            <Dropdown.Item active={color === colorChoices["red"]} eventKey="red">
              Red
            </Dropdown.Item>
            <Dropdown.Item active={color === colorChoices["pink"]} eventKey="pink">
              Pink
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
        <br />
        <Button onClick={onAdd}>Add Note</Button>
      </div>
    );
  }
  