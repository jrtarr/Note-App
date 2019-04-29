import moment from 'moment'
import {getEditedAt,intializeEdit} from './views'
import {removeNote,saveNotes,updateNote} from './notes'

const noteID = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const lastEdited = document.querySelector('.last-edited')
const removeButton = document.querySelector('#remove-note')

let update = {
    title: undefined,
    body: undefined
}

intializeEdit(noteID)

//Event Listeners
//Update Title
noteTitle.addEventListener('input',(e) => {
    update.title = e.target.value
    console.log()
    updateNote(noteID,update)
    lastEdited.textContent = getEditedAt(moment().valueOf())
    saveNotes()
}) 
//Update Body
noteBody.addEventListener('input',(e) => {
    update.body = e.target.value
    updateNote(noteID,update)
    lastEdited.textContent = getEditedAt(moment().valueOf())
    saveNotes()
})
//Removing Note
removeButton.addEventListener('click',(e) => {
    removeNote(noteID)
    saveNotes()
    location.assign('/index.html')
})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        intializeEdit(noteID)
    }
})
