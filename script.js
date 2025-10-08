const promptTitle = document.getElementById('prompt-title')
const promptContent = document.getElementById('prompt-content')
const titleWrapper = document.getElementById('title-wrapper')
const contentWrapper = document.getElementById('content-wrapper')


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

function init() {
    attachAllEditableHandlers()
    updateAllEditableStates()
}

init()
