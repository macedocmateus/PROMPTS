const STORAGE_KEY = 'prompts_storage'

const state = {
    prompts: [],
    selectedId: null,
}

const promptTitle = document.getElementById('prompt-title')
const promptContent = document.getElementById('prompt-content')
const titleWrapper = document.getElementById('title-wrapper')
const contentWrapper = document.getElementById('content-wrapper')
const btnOpen = document.getElementById('btn-open')
const btnCollapse = document.getElementById('btn-collapse')
const sidebar = document.querySelector('.sidebar')
const btnSave = document.getElementById('btn-save')


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

function save() {
    const title = promptTitle.textContent.trim()
    const content = promptContent.innerHTML.trim()
    const hasContent = promptContent.textContent.trim()

    if (!title || !hasContent) {
        alert('Título e conteúdo não podem estar vazios.')
        return
    }

    if (state.selectedId) {
        
    } else {
        const newPrompt = {
            id: Date.now().toString(36),
            title,
            content,
        }
        state.prompts.unshift(newPrompt)
        state.selectedId = newPrompt.id
    }

    persist()
}

function load() {
    try {
        const storage = localStorage.getItem(STORAGE_KEY)
        state.prompts = storage ? JSON.parse(storage) : []
        state.selectedId = null
    } catch (error) {
        console.log('Erro ao carregar os dados do localStorage:', error)
    }
}

function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts))
        alert('Prompt salvo com sucesso!')
    } catch (error) {
        console.error('Erro ao persistir os dados no localStorage:', error)
    }
}

btnSave.addEventListener('click', save)

function init() {
    load()
    attachAllEditableHandlers()
    updateAllEditableStates()
    openSidebar()
    closeSidebar()
}

init()
