const zero = 0;
let oldName = ''; //global varable for modify page
const rootNode = document.getElementById('root');

// 'Main' page #/main
let mainPage = document.createElement('div');
mainPage.id = '/main';
mainPage.classList.add('page');

let buttonAddNew = document.createElement('button');
buttonAddNew.textContent = 'Add new';
buttonAddNew.id = 'buttonAddNew';
buttonAddNew.addEventListener('click', hashChange('#/add'));

mainPage.append(buttonAddNew);

function renderSets() {
  let sets = JSON.parse(localStorage.getItem('sets')) || [];
  for (let set of sets) {
    if(!mainPage.querySelector(`#${set}`)) {
      let container = document.createElement('div');
      container.id = set;
      container.classList.add('set');
      let containerName = document.createElement('h4');
      containerName.textContent = `${set}`;
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('click', complete);
      container.append(checkbox);
      container.append(containerName);
      let terms = JSON.parse(localStorage.getItem(set));
      for (let term of terms) {
        let termElement = document.createElement('div');
        termElement.textContent = term[zero];
        let defElement = document.createElement('div');
        defElement.textContent = term[1];
        container.append(termElement, defElement);
      }
      let buttonEdit = document.createElement('button');
      buttonEdit.textContent = 'Edit';
      let buttonRemove = document.createElement('button');
      buttonRemove.textContent = 'Remove';
      container.append(buttonEdit, buttonRemove);
      mainPage.append(container);
      buttonRemove.addEventListener('click', remove);
      buttonEdit.addEventListener('click', edit);
    }
  }
  if (mainPage.querySelector('#setsCompletedContainer')){
    mainPage.querySelector('#setsCompletedContainer').remove();
  }
  let setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || [];
  let setsCompletedContainer = document.createElement('div');
  setsCompletedContainer.textContent = 'Completed sets:';
  setsCompletedContainer.id = 'setsCompletedContainer';
  for ( let set of setsCompleted) {
    let setContainer = document.createElement('div');
    setContainer.textContent = set;
    setsCompletedContainer.append(setContainer);
  }
  mainPage.append(setsCompletedContainer);
}

function remove(e) {
  let parent = e.target.parentNode;
  let id = parent.id;
  let sets = JSON.parse(localStorage.getItem('sets'));
  sets.splice(sets.indexOf(id), 1);
  localStorage.setItem('sets', JSON.stringify(sets));
  localStorage.removeItem(id);
  parent.remove();
}

function edit(e) {
  renderModify(e.target.parentNode.id);
  hashChange('#/modify')();
}

function complete(e) {
  let setID = e.target.parentNode.id;
  let sets = JSON.parse(localStorage.getItem('sets'));
  let setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || [];
  sets.splice(sets.indexOf(setID), 1);
  localStorage.setItem('sets', JSON.stringify(sets));
  setsCompleted.unshift(setID);
  localStorage.setItem('setsCompleted', JSON.stringify(setsCompleted));
  e.target.parentNode.remove();
  renderSets();
}

// 'Add new set' page #/add
let addPage = document.createElement('div');
addPage.id = '/add';
addPage.classList.add('page');

let inputNameNew = document.createElement('input');
inputNameNew.id = 'inputNameNew';
inputNameNew.setAttribute('placeholder', 'Enter new set name');

let buttonAddTerms = document.createElement('button');
buttonAddTerms.textContent = 'Add terms';
buttonAddTerms.id = 'buttonAddTerms';
buttonAddTerms.addEventListener('click', addTerms);

let buttonSaveChanges = document.createElement('button');
buttonSaveChanges.textContent = 'Save changes';
buttonSaveChanges.id = 'buttonSaveChanges';
buttonSaveChanges.addEventListener('click', saveChanges);

let buttonCancel = document.createElement('button');
buttonCancel.textContent = 'Cancel';
buttonCancel.id = 'buttonCancel';
buttonCancel.addEventListener('click', cancelAdd);

addPage.append(inputNameNew, buttonAddTerms, buttonSaveChanges, buttonCancel);

function addTerms() {
  let termContainer = document.createElement('div');
  let term = document.createElement('input');
  let definition = document.createElement('input');
  let removeBtn = document.createElement('button');
  term.setAttribute('placeholder', 'Enter term');
  definition.setAttribute('placeholder', 'Enter definition');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', function() {
    termContainer.remove();
  });
  termContainer.classList.add('termContainer');
  termContainer.append(term, definition, removeBtn);
  addPage.append(termContainer);
}

function cancelAdd() {
  inputNameNew.value = '';
  let terms = buttonCancel.parentNode.querySelectorAll('.termContainer');
  for (let t of terms) {
    t.remove();
  }
  hashChange('#/main')();
  renderSets();
}

function saveChanges() {
  if (!inputNameNew.value) {
    alert('please input set name');
  } else if (localStorage.getItem(inputNameNew.value)) {
    alert('set with the same name already exist');
  } else {
    let newSet = inputNameNew.value;
    let sets = JSON.parse(localStorage.getItem('sets')) || [];
    let terms = [];
    let termContainers = addPage.querySelectorAll('.termContainer');
    sets.push(newSet);
    for (let term of termContainers) {
      terms.push([term.children[zero].value, term.children[1].value]);
    }
    localStorage.setItem(newSet, JSON.stringify(terms));
    localStorage.setItem('sets', JSON.stringify(sets));
    cancelAdd();
  }
}

// 'Modify set' page #/modify/:item_id
let modifyPage = document.createElement('div');
modifyPage.id = '/modify';
modifyPage.classList.add('page');

let modifyName = document.createElement('input');
modifyName.setAttribute('placeholder', 'Enter new set name');

let buttonSaveChanges2 = document.createElement('button');
buttonSaveChanges2.textContent = 'Save changes';
buttonSaveChanges2.id = 'buttonSaveChanges2';
buttonSaveChanges2.addEventListener('click', saveModifyChanges);

let buttonCancel2 = document.createElement('button');
buttonCancel2.textContent = 'Cancel';
buttonCancel2.id = 'buttonCancel2';
buttonCancel2.addEventListener('click', cancelModify);

modifyPage.append(modifyName, buttonSaveChanges2, buttonCancel2);

function renderModify(id) {
  oldName = id;
  modifyName.value = id;
  let container = document.createElement('div');
  container.classList.add('modSet');
  let terms = JSON.parse(localStorage.getItem(id));
  for (let term of terms) {
    let termContainer = document.createElement('div');
    termContainer.classList.add('termCont');
    let termElement = document.createElement('input');
    termElement.value = term[zero];
    let defElement = document.createElement('input');
    defElement.value = term[1];
    termContainer.append(termElement, defElement);
    container.append(termContainer);
  }
  modifyPage.append(container);
}

function cancelModify() {
    modifyName.value = '';
    let terms = buttonCancel2.parentNode.querySelector('.modSet');
    terms.remove();
    hashChange('#/main')();
    renderSets();
  }

function saveModifyChanges() {
  if (!modifyName.value) {
    alert('please input set name');
  } else if (localStorage.getItem(modifyName.value) &&
        modifyName.value !== oldName) {
    alert('set with the same name already exist');
  } else {
    let modifiedSet = modifyName.value;
    let sets = JSON.parse(localStorage.getItem('sets')) || [];
    sets.splice(sets.indexOf(oldName), 1, modifiedSet);
    localStorage.setItem('sets', JSON.stringify(sets));
    localStorage.removeItem(oldName);
    let terms = [];
    let termContainers = modifyPage.querySelectorAll('.termCont');
    for (let term of termContainers) {
      terms.push([term.children[zero].value, term.children[1].value]);
    }
    localStorage.setItem(modifiedSet, JSON.stringify(terms));
    for (let set of mainPage.querySelectorAll('.set')) {
      set.remove();
    }
    cancelModify();
  }
}

// helping functions
function hashChange(string) {
  return function(){
    window.location.hash = string;
  }
}

// hash change listeners
window.addEventListener('hashchange', renderPage);
function renderPage() {
  for (let page of pages) {
    page.style.display = `#${page.id}` === window.location.hash ? '' : 'none';
  }
}

// launch app
rootNode.append(mainPage, addPage, modifyPage);
const pages = [];
for (let page of document.querySelectorAll('.page')) {
  pages.push(page);
}
renderPage();
window.location.hash = '/main';
renderSets();