let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters);

//Event Listeners
document.querySelector("#search-text").addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderNotes(notes,filters)
}) 

document.querySelector('#sort-by').addEventListener('change',function(e){
    console.log(e.target.value)
})

document.querySelector('#new-note').addEventListener('click',function(e){
    e.preventDefault()
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: '',
        dateCreated: new Date(),
        lastEdited: new Date()
    })
    saveNotes(notes)
    location.assign(`edit.html#${id}`)
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = getSavedNotes()
        renderNotes(notes,filters)
    }
})