import moment from 'moment'
import uuidv4 from 'uuid/v4'

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e){
        return []
    }
}

//Save Notes
const saveNotes = () => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

//Update Notes
function updateNote(id,updates){
    const note = notes.find((note)=>note.id===id)
    if (!note){
        return
    }
    if (typeof updates.title === 'string'){
        note.title = updates.title
        note.editedAt = moment().valueOf()
    }
    if (typeof updates.body === 'string'){
        note.body = updates.body
        note.editedAt = moment().valueOf()
    }

    saveNotes()
}

//get notes function to export
const getNotes = ()=>notes

//Create Note
function createNote(){
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: moment().valueOf(),
        editedAt: moment().valueOf()
    })
    saveNotes(notes)
    return id
}

// Remove Note
const removeNote = (id) => {
    const i = notes.findIndex((note) => note.id === id)
    if (i > -1){
        notes.splice(i,1)
        saveNotes()
    }
}

//Sort Notes
function sortNotes(sortBy){
    const notes = getNotes()
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
            if(a.title.toUpperCase() > b.title.toUpperCase()){ //a came after b
                return 1
            }else if(b.title.toUpperCase() > a.title.toUpperCase()){ //b came after a
                return -1
            }else{
                return 0
            }
        })
    }
    return notes
}

let notes = loadNotes()

export {getNotes,createNote,removeNote,saveNotes,sortNotes,updateNote}