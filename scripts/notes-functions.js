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
    const newNote = document.createElement('a')
    newNote.classList.add('list-item')
    newNote.href = `/edit.html#${note.id}`

    //Setup Note Text
    const noteText = document.createElement('p')
    note.title.length ? noteText.textContent = note.title : noteText.textContent = 'Unnamed Note'
    noteText.classList.add = 'list-item__title'

    //Setup timestamp text
    const lastEdited = document.createElement('p')
    lastEdited.classList.add('last-edited')
    lastEdited.classList.add('list-item__subtitle')
    lastEdited.textContent = getEditedAt(note.editedAt)

    //Add button and text to parent container
    newNote.appendChild(noteText)
    newNote.appendChild(lastEdited)

    return newNote
}

// Render notes
const renderNotes = function(notes,filters){
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    sortNotes(filteredNotes,filters.sortBy)
    document.querySelector('#note-container').innerHTML=''
    if (filteredNotes.length>0){
        filteredNotes.forEach((note) => {
            document.querySelector('#note-container').appendChild(generateNoteDOM(note))
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'You haven\'t created any notes!'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#note-container').appendChild(emptyMessage)
    }
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