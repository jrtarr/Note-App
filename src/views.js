import moment from 'moment'
import {sortNotes} from './notes'
import {getFilters} from './filters';
import {getNotes} from './notes'

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
const renderNotes = function(){
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
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

//Initialize Edit Page
const intializeEdit = (noteID)=>{
    const noteTitle = document.querySelector('#note-title')
    const noteBody = document.querySelector('#note-body')
    const lastEdited = document.querySelector('.last-edited')
    let notes = getNotes() //populate notes array from local storage
    let note = notes.find((note) => note.id === noteID) //get specific note

    if (!note){
        location.assign('/index.html') //if no note found bounce back to index.html
    }
    
    //Load initial values if existing
    noteTitle.value = note.title
    noteBody.value = note.body
    lastEdited.textContent = `Last Edited: ${moment(note.editedAt).fromNow()}`
}

const getEditedAt = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

export {generateNoteDOM,renderNotes,getEditedAt, intializeEdit}