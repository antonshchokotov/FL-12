function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => renderUsers(json));
}

function renderUsers(users) {
  const usersDiv = document.getElementById('users');

  for (let user of users) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    for (let prop in user) {
      const propContainer = document.createElement('div');
      propContainer.classList.add('propContainer');

      if (prop === 'name') {
        propContainer.classList.add('name');
        propContainer.addEventListener('click', showPosts);
      }

      const propName = document.createElement('div');
      propName.classList.add('propName');
      propName.textContent = `${prop}:`;

      const propValue = document.createElement('div');
      propValue.classList.add('propValue');
      propValue.textContent = user[prop];

      propContainer.append(propName, propValue);
      userDiv.append(propContainer);
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editUser);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteUser);
    
    userDiv.append(editButton, deleteButton);
    usersDiv.append(userDiv);
  }
}

function editUser(e) {
  const user = e.target.parentNode;
  const props = user.getElementsByClassName('propContainer');
  const editDiv = document.getElementById('editDiv');
  editDiv.classList.add('editDiv');
  editDiv.innerHTML = '';
  hideUsers();
  for (let prop of props) {
    const name = prop.getElementsByClassName('propName')[0].textContent;
    const value = prop.getElementsByClassName('propValue')[0].textContent;
    const inputValue = document.createElement('input');
    inputValue.value = value;
    const editPropContainer = document.createElement('div');
    editPropContainer.append(name, inputValue); 
    editDiv.append(editPropContainer)
  }
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', saveChanges);
  editDiv.append(saveButton);
}

function saveChanges(e) {
  const editDiv = document.getElementById('editDiv');
  const obj = {};
  const props = e.target.parentNode.getElementsByTagName('div');

  for (let prop of props) {
    obj[prop.textContent.slice(0, prop.textContent.length-1)]
        = prop.getElementsByTagName('input')[0].value;
  }

  const url = `https://jsonplaceholder.typicode.com/users/${obj.id}`;
  sendChanges(obj, url);
}

function sendChanges(obj, url) {
  showSpinner();
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(() => {
    showUsers();
    hideSpinner();
    editDiv.classList.add('editDiv');
    editDiv.innerHTML = '';
  });
}

function deleteUser(e) {
  const user = e.target.parentNode;
  const id = user.children[0].textContent.slice(3);
  showSpinner();
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
  method: 'DELETE'
  }).then(() => hideSpinner());
}

function showPosts(e) {
  const user = e.currentTarget.parentNode;
  const id = user.children[0].textContent.slice(3);
  showSpinner();
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
  .then(response => response.json())
  .then(json => {
    const postsElement = document.getElementById('posts');
    postsElement.innerHTML = '';
    hideUsers();
    postsElement.append(createPostsElement(json));    
    hideSpinner();
  })
}

function createPostsElement(obj) {
  const posts = document.createElement('div');
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.addEventListener('click', showUsers);
  posts.append(backButton);
  for (let post of obj) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = post.title;
    const body = document.createElement('div');
    body.textContent = post.body;
    postDiv.append(title, body);
    posts.append(postDiv);
  }
  return posts;
}

function hideUsers() {
  const users = document.getElementById('users');
  users.style.display = 'none';
}

function showUsers() {
  const posts = document.getElementById('posts');
  posts.innerHTML = '';
  const users = document.getElementById('users');
  users.style.display = 'block';
}

function showSpinner() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
}

function hideSpinner() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}

// initialize app
fetchUsers();