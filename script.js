const promptTitle = document.getElementById('prompt-title')
const promptContent = document.getElementById('prompt-content')
const titleWrapper = document.getElementById('title-wrapper')
const contentWrapper = document.getElementById('content-wrapper')
const btnOpen = document.getElementById('btn-open')
const btnCollapse = document.getElementById('btn-collapse')
const sidebar = document.querySelector('.sidebar')


function updateEditableWrapperState(element, wrapper) {
    const hasText = element.textContent.trim().length > 0
        wrapper.classList.toggle('is-empty', !hasText)
}

function updateAllEditableStates() {
    updateEditableWrapperState(promptTitle, titleWrapper)
    updateEditableWrapperState(promptContent, contentWrapper)
}

function attachAllEditableHandlers() {
    promptTitle.addEventListener("input", () => {
        updateEditableWrapperState(promptTitle, titleWrapper)
    })

    promptContent.addEventListener("input", () => {
        updateEditableWrapperState(promptContent, contentWrapper)
    })
}


function openSidebar() {
    btnOpen.addEventListener('click', () => {
    sidebar.style.display = 'flex'
    btnOpen.style.display = 'none'
})
}

function closeSidebar() {
    btnCollapse.addEventListener('click', () => {
    sidebar.style.display = 'none'
    btnOpen.style.display = 'block'
})
}

function init() {
    attachAllEditableHandlers()
    updateAllEditableStates()
    openSidebar()
    closeSidebar()
}

init()
