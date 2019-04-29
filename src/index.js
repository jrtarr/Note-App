import {renderNotes} from './views'
import {createNote} from './notes'
import {setFilters} from './filters' 

let filterUpdates = {
    searchText: undefined,
    sortBy: undefined
}

renderNotes();

//Event Listeners
document.querySelector("#search-text").addEventListener('input',(e) => {
    filterUpdates.searchText = e.target.value
    setFilters(filterUpdates)
    renderNotes()
}) 

document.querySelector('#sort-by').addEventListener('change',(e) => {
    filterUpdates.sortBy = e.target.value
    setFilters(filterUpdates)
    renderNotes()
})

document.querySelector('#new-note').addEventListener('click',(e) => {
    e.preventDefault()
    const id = createNote()
    location.assign(`edit.html#${id}`)
})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        renderNotes()
    }
})