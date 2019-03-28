// Read existing notes from localStorage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    } else{
        return []
    }
}

//Save Notes
function saveNotes(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}

//Generate DOM structure for new note
const generateNoteDOM = function(note){
    //Setup Parent note container
    const newNote = document.createElement('div')
    newNote.classList.add('note')
    //Setup remove button
    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })

    //Setup Note Text
    const noteText = document.createElement('a')
    if(note.title.length > 0){
        noteText.textContent = note.title 
    }else{
        noteText.textContent = 'Unnamed Note'
    }
    noteText.href = `/edit.html#${note.id}`
    //Add button and text to parent container
    newNote.appendChild(removeButton)
    newNote.appendChild(noteText)

    return newNote
}

// Render notes
const renderNotes = function(notes,filters){
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    document.querySelector('#note-container').innerHTML=''
    filteredNotes.forEach(function(note){
        document.querySelector('#note-container').appendChild(generateNoteDOM(note))
    })
}

function removeNote(id){
    const i = notes.findIndex(function(note){
        return note.id === id
    })
    if (i > -1){
        notes.splice(i,1)
    }
}

