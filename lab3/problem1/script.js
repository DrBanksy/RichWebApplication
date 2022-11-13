
const { Observable, fromEvent } = rxjs;

// saves users notes to local storage in browser
const saveUsersNotes = function(noteArray) {
    localStorage.setItem("notes", JSON.stringify(noteArray));
}

// remove note from local storage
const removeNote = function(noteId, selectedElement) {
    const notesContainer = document.getElementById("notes-container");
    const allNotes = getAllNotesFromLocalStorage();
    const targetNote = allNotes.filter(it => it.id == noteId)[0];
    const i = allNotes.indexOf(targetNote);
    if(i > -1) { allNotes.splice(i, 1);}
    saveUsersNotes(allNotes);
    notesContainer.removeChild(selectedElement);
}

// update contents of current note
const updateCurrentNote = function(noteId, updatedText) {
    let i = 0;
    const storedNotes = getAllNotesFromLocalStorage();
    const targetNote = storedNotes.find(note => note.id == noteId);
    targetNote.text = updatedText;
    console.log(targetNote);
    saveUsersNotes(storedNotes);
}

// add the new note
const add = function() {
    const addNoteBtn = document.getElementById(".add-note-btn");
    const colorChoices = document.getElementById("colorChoices");
    const notesContainer = document.getElementById("notes-container");
    const color = colorChoices.value.toString();
    if(!color) {
        return false;
    }
    const obj = {
        id: Math.floor(Math.floor(Date.now() / 1000) ),
        text: "",
        color: color
    };
    const noteElement = newNoteElement(obj.id, obj.text, obj.color);
    notesContainer.insertBefore(noteElement, addNoteBtn);
    const storedNotes = getAllNotesFromLocalStorage();
    storedNotes.push(obj);
    saveUsersNotes(storedNotes);
}

// create the html element
const newNoteElement = function(noteId, text, color) {
    const newEl = document.createElement("textarea");
    newEl.value = text;
    newEl.classList.add("usernote");
    newEl.placeholder = "Enter text here";
    const noteDate = document.createElement("p");
    const date = new Date();
    const datetext = document.createTextNode(date.getFullYear());
    noteDate.appendChild(datetext);
    newEl.addEventListener("dblclick", () => {
        const deleteNotet = confirm("Delete note?");
        if(deleteNotet != false) {removeNote(noteId, newEl);}
    });
    // newEl.addEventListener("change", () => {
    //     updateCurrentNote(noteId, newEl.value);
    // });
    const changed = fromEvent(document, 'change');
    changed.subscribe(updateCurrentNote(noteId, newEl.value));
    console.log(newEl.id);
    console.log(color)
    newEl.style.backgroundColor = color?.toString();
    return newEl;
}

//retreives all notes from local storage
const getAllNotesFromLocalStorage = () => {
    if(localStorage.getItem("notes") == null) {
        return JSON.parse("[]");
    } else {
        console.log(localStorage.getItem("notes"));
        return JSON.parse(localStorage.getItem("notes"));
    }
    
}

// loop through each note in local storage
// and create the html element
getAllNotesFromLocalStorage().every((note, index, array) => {
    console.log("test");
    const addNoteBtn = document.getElementById(".add-note-btn");
    const notesContainer = document.getElementById("notes-container");
    const noteElement = newNoteElement(note.id, note.text, note.color);
    notesContainer.insertBefore(noteElement, addNoteBtn);
    return true;
});



