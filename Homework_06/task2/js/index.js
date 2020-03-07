const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const todos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

function renderTodos() {
  $list.empty();

  for (let todo of todos) {
    const li = document.createElement('li');
    $(li).addClass('item');

    const span = document.createElement('span');
    $(span).addClass('item-text');
    $(span).text(`${todo.text}`);
    if(todo.done) {
      span.classList.add('done');
    }

    const button = document.createElement('button');
    $(button).makeRemoveButton();

    li.append(span, button);
    $list.append(li);
  }
}

function addTodo() {
  event.preventDefault();
  if ($input.val().trim()) {
    todos.unshift({
      text: $input.val(),
      done: false
    })
    renderTodos();
    $input.val('');
  }
}

function removeTodo() {
  const todoText = $(this).prev().text();
  const i = todos.findIndex(el => el.text === todoText);
  todos.splice(i, 1);
  renderTodos();
}

function markTodo() {
  const todoText = $(this).text();
  const i = todos.findIndex(el => el.text === todoText);
  todos[i].done = todos[i].done ? false : true;
  renderTodos();
}

$add.on('click', addTodo);
$list.on('click', '.item-remove', removeTodo)
     .on('click', '.item-text', markTodo);

$.fn.makeRemoveButton = function() {
  this.addClass('item-remove');
  this.text('Remove');
}

// initialize app
renderTodos();