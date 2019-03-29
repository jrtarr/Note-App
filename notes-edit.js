const noteID = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const lastEdited = document.querySelector('.last-edited')
let notes = getSavedNotes()
let note = notes.find(function(note){
    return note.id === noteID 
})

if (note === undefined){
    location.assign('/index.html')
}

//Load initial values if existing
noteTitle.value = note.title
noteBody.value = note.body
lastEdited.textContent = `Last Edited: ${moment(note.editedAt).fromNow()}`

//Event Listeners
noteTitle.addEventListener('input',function(e){
    note.title = e.target.value
    note.editedAt = moment().valueOf()
    lastEdited.textContent = getEditedAt(note.editedAt)
    saveNotes(notes)
})
noteBody.addEventListener('input',function(e){
    note.body = e.target.value
    note.editedAt = moment().valueOf()
    lastEdited.textContent = getEditedAt(note.editedAt)
    saveNotes(notes)
})
document.querySelector('#remove-note').addEventListener('click',function(e){
    removeNote(noteID)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find(function(note){
            return note.id === noteID 
        })
        
        if (note === undefined){
            location.assign('/index.html')
        }
        
        //Load initial values if existing
        noteTitle.value = note.title
        noteBody.value = note.body
        lastEdited.textContent = getEditedAt(note.editedAt)
    }
})
