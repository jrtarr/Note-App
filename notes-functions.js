// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e){
        return []
    }
}

//Save Notes
const saveNotes = (notes) => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

//Generate DOM structure for new note
const generateNoteDOM = (note) => {

    //Setup Parent note container
    const newNote = document.createElement('div')
    newNote.classList.add('note')

    //Setup remove button
    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',() => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })

    //Setup Note Text
    const noteText = document.createElement('a')
    note.title.length ? noteText.textContent = note.title : noteText.textContent = 'Unnamed Note'
    noteText.href = `/edit.html#${note.id}`

    //Setup timestamp text
    const lastEdited = document.createElement('span')
    lastEdited.classList.add('last-edited')
    lastEdited.textContent = getEditedAt(note.editedAt)

    //Add button and text to parent container
    newNote.appendChild(removeButton)
    newNote.appendChild(noteText)
    newNote.appendChild(lastEdited)

    return newNote
}

// Render notes
const renderNotes = function(notes,filters){
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    sortNotes(filteredNotes,filters.sortBy)
    document.querySelector('#note-container').innerHTML=''
    filteredNotes.forEach((note) => {
        document.querySelector('#note-container').appendChild(generateNoteDOM(note))
    })
}

// Remove Note
const removeNote = (id) => {
    const i = notes.findIndex((note) => note.id === id)
    if (i > -1){
        notes.splice(i,1)
    }
}
const getEditedAt = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

function sortNotes(notes,sortBy){
    if (sortBy === 'edited'){
        notes.sort((a,b) => {
            if(a.editedAt > b.editedAt){ //a came after b
                return -1
            }else if(b.editedAt > a.editedAt){ //b came after a
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'chron'){
        notes.sort((a,b) => {
            if(a.createdAt > b.createdAt){ //a came after b
                return 1
            }else if(b.createdAt > a.createdAt){ //b came after a
                return -1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'alpha'){
        notes.sort((a,b) => {
            if(a.title > b.title){ //a came after b
                return 1
            }else if(b.title > a.title){ //b came after a
                return -1
            }else{
                return 0
            }
        })
    }
}