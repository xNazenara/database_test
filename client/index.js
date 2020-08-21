
const addButton = document.querySelector('.add-button')
const closeButton = document.querySelector('.input-button-close')
const inputContainer = document.querySelector('.input-container')
const inputTitle = document.querySelector('.input-title-value')
const inputText = document.querySelector('.input-text-value')
const createButton = document.querySelector('.input-button-add')
let titleValue = ''
let textValue = ''
addButton.addEventListener('click', (e) => {
  const invisible = inputContainer.classList.contains('hidden')
  if (invisible) {
    inputContainer.classList.remove("hidden")
  }
})

closeButton.addEventListener('click', (e) => {
  const visible = !inputContainer.classList.contains('hidden')
  if (visible) {
    inputContainer.classList.add("hidden")
  }
})

inputTitle.addEventListener('input', (e) => {
   titleValue = e.target.value
})

inputText.addEventListener('input', (e) => {
  textValue = e.target.value
})

createButton.addEventListener('click', (e) => {
  axios.post('http://localhost:3000/post-create', {
    textValue: textValue,
    titleValue: titleValue
  }).then(res=>alert(res.data))
  textValue = ''
  titleValue = ''
  inputTitle.value = ''
  inputText.value = ''
  inputContainer.classList.add("hidden")
})
