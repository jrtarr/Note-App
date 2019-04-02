const noteID = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const lastEdited = document.querySelector('.last-edited')
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteID)

if (!note){
    location.assign('/index.html')
}

//Load initial values if existing
noteTitle.value = note.title
noteBody.value = note.body
lastEdited.textContent = `Last Edited: ${moment(note.editedAt).fromNow()}`

//Event Listeners
noteTitle.addEventListener('input',(e) => {
    note.title = e.target.value
    note.editedAt = moment().valueOf()
    lastEdited.textContent = getEditedAt(note.editedAt)
    saveNotes(notes)
})
noteBody.addEventListener('input',(e) => {
    note.body = e.target.value
    note.editedAt = moment().valueOf()
    lastEdited.textContent = getEditedAt(note.editedAt)
    saveNotes(notes)
})
document.querySelector('#remove-note').addEventListener('click',(e) => {
    removeNote(noteID)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteID)
        
        if (!note){
            location.assign('/index.html')
        }
        
        //Load initial values if existing
        noteTitle.value = note.title
        noteBody.value = note.body
        lastEdited.textContent = getEditedAt(note.editedAt)
    }
})
