
const addButton = document.querySelector('.add-button')
const closeButton = document.querySelector('.input-button-close')
const inputContainer = document.querySelector('.input-container')
const inputTitle = document.querySelector('.input-title-value')
const inputText = document.querySelector('.input-text-value')
const createButton = document.querySelector('.input-button-add')
const postsTitlesValues = document.querySelector('.posts-titles-values')
const postText = document.querySelector('.post-text')
let posts = []
let titleValue = ''
let textValue = ''

const renderPosts = (posts) => {
  postsTitlesValues.innerHTML = ''

  posts.forEach((post, i) => {
    const postTitle = document.createElement('div')
    postTitle.classList.add("post-title")

    const postTitleValue = document.createElement('div')
    postTitleValue.classList.add("post-title-value")
    postTitleValue.innerHTML = post.title
    postTitle.appendChild(postTitleValue)

    if (i === 0) {
      postTitleValue.classList.add("post-title-value-selected")
    }

    postTitleValue.addEventListener('click', (e) => {
      postText.innerHTML = post.value

      const element = document.querySelector('.post-title-value-selected')

      if (element) {
        element.classList.remove('post-title-value-selected')
      }

      postTitleValue.classList.add('post-title-value-selected')
    })

    const postTitleEdit = document.createElement('button')
    postTitleEdit.classList.add("post-title-edit")

    const editImg = document.createElement('img')
    editImg.classList.add("edit-img")
    editImg.src = 'imgs/edit.svg'
    postTitleEdit.appendChild(editImg)

    postTitle.appendChild(postTitleEdit)

    const postTitleDelete = document.createElement('button')
    postTitleDelete.classList.add("post-title-delete")

    postTitleDelete.addEventListener('click', (e) => {
      axios
        .post('http://localhost:3000/post-delete', {
          id: post.id
        })
        .then(() => {
          axios
            .get('http://localhost:3000/posts-get')
            .then(res=>{
              posts = res.data

              renderPosts(posts)

            })
        })
    })

    const deleteImg = document.createElement('img')
    deleteImg.classList.add("delete-img")
    deleteImg.src = 'imgs/delete.svg'
    postTitleDelete.appendChild(deleteImg)

    postTitle.appendChild(postTitleDelete)

    postsTitlesValues.appendChild(postTitle)
  })

  if (posts.length) {
    postText.innerHTML = posts[0].value
  }
}

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
  axios
    .post('http://localhost:3000/post-create', {
      textValue: textValue,
      titleValue: titleValue
    })
    .then(()=>{
      axios
        .get('http://localhost:3000/posts-get')
        .then(res=>{
          posts = res.data

          renderPosts(posts)
        })
    })

  textValue = ''
  titleValue = ''
  inputTitle.value = ''
  inputText.value = ''
  inputContainer.classList.add("hidden")
})

axios
  .get('http://localhost:3000/posts-get')
  .then(res=>{
    posts = res.data

    renderPosts(posts)
  })
