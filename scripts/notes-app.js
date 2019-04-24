let notes = getSavedNotes()

//edited, chron, alph
const filters = {
    searchText: '',
    sortBy: 'edited'
}

renderNotes(notes, filters);

//Event Listeners
document.querySelector("#search-text").addEventListener('input',(e) => {
    filters.searchText = e.target.value
    renderNotes(notes,filters)
}) 

document.querySelector('#sort-by').addEventListener('change',(e) => {
    filters.sortBy = e.target.value
    renderNotes(notes,filters)
})

document.querySelector('#new-note').addEventListener('click',(e) => {
    e.preventDefault()
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: moment().valueOf(),
        editedAt: moment().valueOf()
    })
    saveNotes(notes)
    location.assign(`edit.html#${id}`)
})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        notes = getSavedNotes()
        renderNotes(notes,filters)
    }
})