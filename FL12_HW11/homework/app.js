const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function createTree(rootNode, structureArray, disp = '') {
  for (let element of structureArray) {
    let currentNode = createNode(element);
    rootNode.append(currentNode);
    if (element.children) {
      createTree(currentNode, element.children, 'none');
    } else if (element.folder) {
      currentNode.append(createNode());
    }
    currentNode.style.display = disp;
  }
}

function createNode(obj = null) {
  let node = document.createElement('div');
  let element = document.createElement('div');
  element.textContent = obj ? obj.title : 'Folder is empty';
  element.classList.add('highlight');
  node.classList.add('node');
  node.addEventListener('click', showHideChildren);
  node.append(element);
  if (obj) {
    let icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.textContent = obj.folder ? 'folder' : 'play_circle_outline';
    node.prepend(icon);
  } else {
    node.style.display = 'none';
  }
  return node;
}

function showHideChildren(e) {
  e.stopPropagation();
  for (let child of e.currentTarget.children) {
    if(child.classList.contains('node')) {
      child.style.display = child.style.display === 'none' ? '' : 'none';
    }
  }
  let icon = e.currentTarget.firstChild;
  if (icon.textContent === 'folder') {
    icon.textContent = 'folder_open';
  } else if (icon.textContent === 'folder_open') {
    icon.textContent = 'folder';
  }
}

createTree(rootNode, structure);