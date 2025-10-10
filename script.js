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
const list = document.getElementById('prompt-list')
const search = document.getElementById('search-input')
const btnNew = document.getElementById('btn-new')
const btnCopy = document.getElementById('btn-copy')


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
        const existingPrompt = state.prompts.find((p) => p.id === state.selectedId)

        if (existingPrompt) {
            existingPrompt.title = title || "Sem título"
            existingPrompt.content = content || "Sem conteúdo"
        }
        
    } else {
        const newPrompt = {
            id: Date.now().toString(36),
            title,
            content,
        }
        state.prompts.unshift(newPrompt)
        state.selectedId = newPrompt.id
    }

    renderList(search.value)
    persist()
    alert('Prompt salvo com sucesso!')
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

function createPromptItem(prompt) {
    const tmp = document.createElement('div')
    tmp.innerHTML = prompt.content
    return `
        <li class="prompt-item" data-id="${prompt.id}" data-action="select">
            <div class="prompt-item-content">
                <span class="prompt-item-title">${prompt.title}</span>
                <span class="prompt-item-description">${tmp.textContent}</span>
            </div>
            <button class="btn-icon" aria-label="Remover" data-action="remove">
                <img src="./assets/remove.svg" class="icon icon-trash" alt="Ícone de remover">
            </button>
        </li>
    `
}

function renderList(filterText = "") {
    const filteredPrompts = state.prompts.filter((prompt) => prompt.title.toLowerCase().includes(filterText.toLowerCase().trim())
  ).map((p) => createPromptItem(p)).join("")

  list.innerHTML = filteredPrompts
}

function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts))
    } catch (error) {
        console.error('Erro ao persistir os dados no localStorage:', error)
    }
}

function newPrompt() {
    state.selectedId = null
    promptTitle.textContent = ''
    promptContent.textContent = ''
    updateAllEditableStates()
    promptTitle.focus()
}

function copySelected() {
    try {
       const content = promptContent
        
       if (!navigator.clipboard) {
         console.log("Este navegador não suporta a função de copiar no clipboard")
       }

       navigator.clipboard.writeText(content.innerText)
        alert('Conteúdo copiado')
    } catch (error) {
        console.log('Erro ao copiar o prompt:', error)
    }
}

// Eventos
btnSave.addEventListener('click', save)
btnNew.addEventListener('click', newPrompt)
btnCopy.addEventListener('click', copySelected)
search.addEventListener('input', function (event) {
    renderList(event.target.value)
})
list.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('[data-action="remove"]')
    const item = event.target.closest('[data-id]')

    if (!item) {
        return
    }

    const id = item.getAttribute('data-id')
    state.selectedId = id
    
    if (removeBtn) {
        state.prompts = state.prompts.filter((p) => p.id !== id)
        renderList(search.value)
        persist()
        return
    }

    if (event.target.closest('[data-action="select"]')) {
        const prompt = state.prompts.find((p) => p.id === id)

        if(prompt) {
            promptTitle.textContent = prompt.title
            promptContent.innerHTML = prompt.content
            updateAllEditableStates()
        }
    }
})

function init() {
    load()
    renderList("")
    attachAllEditableHandlers()
    updateAllEditableStates()
    openSidebar()
    closeSidebar()
}

init()
