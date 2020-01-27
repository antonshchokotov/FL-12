const zero = 0;
const root = document.getElementById('root');

// mainPage #/main
const mainPage = document.createElement('div');
const mainPageButtonAddNew = document.createElement('button');
const mainPageContent = document.createElement('div');
const mainPageContentActual = document.createElement('div');
const separatorLine = document.createElement('div');
const mainPageContentCompleted = document.createElement('div');
mainPageButtonAddNew.textContent = 'Add new';
separatorLine.innerHTML = '<br/> <hr/> Completed Sets:';
mainPageContentCompleted.classList.add('setCompleted');
mainPageContent.append(mainPageContentActual, separatorLine,
    mainPageContentCompleted);
mainPage.append(mainPageButtonAddNew, mainPageContent);
root.append(mainPage);

// addPage #/add
const addPage = document.createElement('div');
const addPageInputSetName = document.createElement('input');
const addPageButtonAddTerm = document.createElement('button');
const addPageButtonSaveChanges = document.createElement('button');
const addPageButtonCancel = document.createElement('button');
const addPageContent = document.createElement('div');
addPageInputSetName.setAttribute('placeholder', 'Enter new set name');
addPageButtonAddTerm.textContent = 'Add terms';
addPageButtonSaveChanges.textContent = 'Save Changes';
addPageButtonCancel.textContent = 'Cancel';
addPage.append(addPageInputSetName, addPageButtonAddTerm, 
    addPageButtonSaveChanges, addPageButtonCancel, addPageContent);
root.append(addPage);

// modifyPage
const modifyPage = document.createElement('div');
const modifyPageInputSetName = document.createElement('input');
const modifyPageButtonSaveChanges = document.createElement('button');
const modifyPageButtonCancel = document.createElement('button');
const modifyPageContent = document.createElement('div');
modifyPageInputSetName.setAttribute('placeholder', 'Enter new set name');
modifyPageButtonSaveChanges.textContent = 'Save Changes';
modifyPageButtonCancel.textContent = 'Cancel';
modifyPage.append(modifyPageInputSetName, modifyPageButtonSaveChanges,
  modifyPageButtonCancel, modifyPageContent);
root.append(modifyPage);

const hideAllPages = () => {
  mainPage.style.display = 'none';
  addPage.style.display = 'none';
  modifyPage.style.display = 'none';
}

const showMainPage = () => {
  mainPage.style.display = 'block';
  Array.from(mainPageContentActual.children).forEach(x => x.remove());
  Array.from(mainPageContentCompleted.children).forEach(x => x.remove());
  renderSetsFromLocalStorage('setsActual', mainPageContentActual);
  renderSetsFromLocalStorage('setsCompleted', mainPageContentCompleted);
}

const showAddPage = () => {
  addPage.style.display = 'block';
}

const showModifyPage = () => {
  modifyPage.style.display = 'block';
}

const renderSetsFromLocalStorage = (storageKey, setsContainer) => {
  const sets = JSON.parse(localStorage.getItem(storageKey)) || {};
  Object.entries(sets).forEach(([key,value]) => {
    const terms = JSON.parse(localStorage.getItem(key)) || [];
    const set = document.createElement('div');
    const completeButton = document.createElement('button');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');
    set.id = key;
    set.classList.add('set');
    set.textContent = value;
    completeButton.innerHTML = '&check;';
    completeButton.addEventListener('click', completeSet);
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editSet);
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeSet);
    set.prepend(completeButton);
    set.append(removeButton, editButton);
    terms.forEach(([name, def]) => {
      const termContainer = document.createElement('div');
      const termName = document.createElement('div');
      const termDef = document.createElement('div');
      termContainer.classList.add('termContainer');
      termName.textContent = name;
      termName.classList.add('termContent');
      termDef.textContent = def;
      termDef.classList.add('termContent');
      termContainer.append(termName, termDef);
      set.append(termContainer);
    });
    setsContainer.append(set);
  })   
}

const completeSet = (e) => {
  const setId = e.target.parentNode.id;
  const setsActual = JSON.parse(localStorage.getItem('setsActual')) || {};
  const setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || {};
  if (setsActual[setId]) {
    setsCompleted[setId] = setsActual[setId];
    delete setsActual[setId];
  } else {
    setsActual[setId] = setsCompleted[setId];
    delete setsCompleted[setId];
  }  
  localStorage.setItem('setsActual', JSON.stringify(setsActual));
  localStorage.setItem('setsCompleted', JSON.stringify(setsCompleted));
  showMainPage();
}

const addNewTerm = () => {
  const termContainer = document.createElement('div');
  const termName = document.createElement('input');
  const termDef = document.createElement('input');
  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = 'Remove';
  buttonRemove.addEventListener('click', e => e.target.parentNode.remove());
  termContainer.append(termName, termDef, buttonRemove);
  addPageContent.append(termContainer);
}

const addPageSaveChanges = () => {
  const setName = addPageInputSetName.value;
  const setsActual = JSON.parse(localStorage.getItem('setsActual')) || {};
  const setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || {};
  if (!setName) {
    alert('please input set name');
  } else if (Object.values(setsActual).includes(setName)
      || Object.values(setsCompleted).includes(setName)) {
    alert('set with the same name already exist');
  } else {
    setsActual[`id${getID()}`] = setName;
    localStorage.setItem('setsActual', JSON.stringify(setsActual));
    const terms = [];
    Array.from(addPageContent.children).forEach((termContainer) => {
      const term = [];
      termContainer.querySelectorAll('input')
          .forEach(inputElement => term.push(inputElement.value));
      terms.push(term);
    });
    localStorage.setItem(`id${getID(false)}`, JSON.stringify(terms));
    clearAddPage();
    window.location.hash = '#/main';
  } 
}

const addPageCancel = () => {
  clearAddPage();
  window.location.hash = '#/main';
}

const clearAddPage = () => {
  addPageInputSetName.value = '';
  Array.from(addPageContent.children).forEach(x => x.remove());
  addPage.append(addPageContent);
}

const editSet = (e) => {
  const setId = e.target.parentNode.id;
  const terms = JSON.parse(localStorage.getItem(setId));
  const container = document.createElement('div');
  container.id = 'editContainer';
  terms.forEach(([name, def]) => {
    const termContainer = document.createElement('div');
    const termName = document.createElement('input');
    const termDef = document.createElement('input');
    termContainer.classList.add('termContainer');
    termName.textContent = name;
    termName.classList.add('termContent');
    termDef.textContent = def;
    termDef.classList.add('termContent');
    termContainer.append(termName, termDef);
    container.append(termContainer);
  });
  modifyPageContent.append(container);
  window.location.hash = `#/modify/:${setId}`;
  fillModifyPage(container);
}

const fillModifyPage = (container) => {
  const setId = window.location.hash.match(/id[\d]+$/)[zero];
  const setsActual = JSON.parse(localStorage.getItem('setsActual')) || {};
  const setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || {};
  const setName = setsActual[setId] || setsCompleted[setId];
  const terms = JSON.parse(localStorage.getItem(setId));
  modifyPageInputSetName.value = setName;
  const termContainers = container.children;
  for (let i = 0; i < terms.length; i++) {
    termContainers[i].firstChild.value = terms[i][zero];
    termContainers[i].lastChild.value = terms[i][1];
  }
}

const modifySaveChanges = () => {
  const setsActual = JSON.parse(localStorage.getItem('setsActual')) || {};
  const setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || {};
  const setId = window.location.hash.match(/id[\d]+$/)[zero];
  const setName = modifyPageInputSetName.value || '';
  const oldName = setsActual[setId] || setsCompleted[setId];
  const setTerms = [];
  let isNameValid = true;
  if (!setName) {
    alert('set name cannot be empty');
    isNameValid = false;
  } else if (setName !== oldName) {
    Object.entries(setsActual).forEach(([key,value]) => {
      if (key !== setId && value === setName) {
        alert('set with the same name already exist');
        isNameValid = false;
      }
    });
    Object.entries(setsCompleted).forEach(([key,value]) => {
      if (key !== setId && value === setName) {
        alert('set with the same name already exist');
        isNameValid = false;
      }
    });
  }
  if (isNameValid) {
    setsActual[setId]
        ? setsActual[setId] = setName
        : setsCompleted[setId] = setName;
    const container = document.getElementById('editContainer');
    for (let term of container.children) {
      setTerms.push([term.firstChild.value, term.lastChild.value]);
    }
    localStorage.setItem('setsActual', JSON.stringify(setsActual));
    localStorage.setItem('setsCompleted', JSON.stringify(setsCompleted));
    localStorage.setItem(setId, JSON.stringify(setTerms));
    container.remove();
    window.location.hash = '#/main';
  }
}

const removeSet = (e) => {
  const setId = e.target.parentNode.id;
  const setsActual = JSON.parse(localStorage.getItem('setsActual')) || {};
  const setsCompleted = JSON.parse(localStorage.getItem('setsCompleted')) || {};
  setsActual[setId] ? delete setsActual[setId] : delete setsCompleted[setId];
  localStorage.removeItem(setId);
  e.target.parentNode.remove();
  localStorage.setItem('setsActual', JSON.stringify(setsActual));
  localStorage.setItem('setsCompleted', JSON.stringify(setsCompleted));
}

const getID = (isNew = true) => {
  let setIdCounter = localStorage.getItem('setIdCounter') || zero;
  if (isNew) {
    setIdCounter++;
  }
  localStorage.setItem('setIdCounter', setIdCounter);
  return setIdCounter;
}

// event listeners
mainPageButtonAddNew.addEventListener('click', () => {
  window.location.hash = '#/add';
});
addPageButtonAddTerm.addEventListener('click', addNewTerm);
addPageButtonSaveChanges.addEventListener('click', addPageSaveChanges);
addPageButtonCancel.addEventListener('click', addPageCancel);
modifyPageButtonCancel.addEventListener('click', () => {
  Array.from(modifyPageContent.children).forEach(x => x.remove());
  window.location.hash = '#/main';
});
modifyPageButtonSaveChanges.addEventListener('click', modifySaveChanges);
window.addEventListener('hashchange', () => {
  hideAllPages();
  switch (true) {
    case /^#\/main/.test(location.hash):
      showMainPage();
      break;
    case /^#\/add/.test(location.hash):
      showAddPage();
      break;
    case /^#\/modify\/:/.test(location.hash):
      showModifyPage();
      break;
    default:
      showMainPage();
  }
}, false);

// app initialization
hideAllPages();
showMainPage();
window.location.hash = '#/main';