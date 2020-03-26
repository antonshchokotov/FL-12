import data from './data.js';

class Employee {
  constructor({id, rm_id, name, performance, last_vacation_date, salary}) {
    this.id = id;
    this.rm_id = rm_id;
    this.name = name;
    this.performance = performance;
    this.last_vacation_date = last_vacation_date;
    this.salary = salary;
  }

  createTree(DOMnode) {
    const node = document.createElement('div');
    node.classList.add('employee');
    node.textContent = ` - ${this.id} ${this.name}`;   
    DOMnode.append(node);
  }

  showAvgPoolSalary() {}

  showListOfBadPerformers(DOMnode, averageSalary) {
    if (this.performance === 'low') {
      if (this.salary > averageSalary) {
        const node = document.createElement('div');
        node.classList.add('employee');
        const name = `${this.id} ${this.name}`;
        const salary =
            `Salary: ${this.salary} | Average pool salary: ${averageSalary}`;
        const performance = `Performance: ${this.performance}`;
        node.textContent =`${name} | ${salary} | ${performance}`;
        DOMnode.append(node);
      }
    }
  }
}

class RM {
  constructor({id, rm_id, name, performance,
              last_vacation_date, salary, pool_name}) {
    this.id = id;
    this.rm_id = rm_id;
    this.name = name;
    this.performance = performance;
    this.last_vacation_date = last_vacation_date;
    this.salary = salary;
    this.pool_name = pool_name;
    this.pool = [];
  }

  addEmployee(employee) {
    this.pool.push(employee);
  }

  createTree(DOMnode) {
    const nodePool = document.createElement('div');
    nodePool.classList.add('pool');
    const node = document.createElement('div');
    node.classList.add('rm');
    node.addEventListener('click', e => {
      [...e.target.parentNode.children].forEach(el => {
        el.classList.toggle('hidden')
      });
      e.target.classList.toggle('hidden');

    })
    nodePool.append(node);
    node.textContent = ` + ${this.id} ${this.name} | Pool: ${this.pool_name}`;
    this.pool.forEach(el=>el.createTree(nodePool));
    
    DOMnode.append(nodePool);
  }

  showAvgPoolSalary(DOMnode) {
    const node = document.createElement('div');
    node.classList.add('pool');
    const totalEmployees = this.pool.length;
    const totalSalary = this.pool.reduce((sum, el) => sum + el.salary, 0);
    const averageSalary = totalSalary / totalEmployees;
    node.textContent =
        `Pool: ${this.pool_name} | Average salary: ${averageSalary.toFixed(2)}`;
    DOMnode.append(node);
    this.pool.forEach(el => el.showAvgPoolSalary(DOMnode));
  }

  showListOfBadPerformers(DOMnode, averageSalary = null) {
    if (this.performance === 'low' && averageSalary) {
      if (this.salary > averageSalary) {
        const node = document.createElement('div');
        node.classList.add('employee');
        const name = `${this.id} ${this.name}`;
        const salary = `Salary: ${this.salary} Average salary: ${averageSalary}`
        const performance = `Performance: ${this.performance}`;
        node.textContent =`${name} | ${salary} | ${performance}`;
        DOMnode.append(node);
      }
    }
    const totalEmployees = this.pool.length;
    const totalSalary = this.pool.reduce((sum, el) => sum + el.salary, 0);
    const poolSalary = (totalSalary / totalEmployees).toFixed(2);
    this.pool.forEach(el => el.showListOfBadPerformers(DOMnode, poolSalary))
  }
}


// strategies

function showAll() {
  mainRM.createTree(rootNode);
}

function showPoolsAverage() {
  mainRM.showAvgPoolSalary(rootNode);
}

function showLowPerformers() {
  mainRM.showListOfBadPerformers(rootNode);
}

function renderPage(strategy) {
  rootNode.innerHTML = '';
  strategy();
}


// process data

const rootNode = document.querySelector('#root');
const mainRM = new RM(data.find(el=>!el.rm_id));
createSubordinates(mainRM, data);

function createSubordinates(manager, data) {
  for (let obj of data) {
    if (obj.rm_id === manager.id) {
      manager.addEmployee(obj.pool_name ? new RM(obj) : new Employee(obj));
    }
  }
  for (let subordinate of manager.pool) {
    if (subordinate.pool_name) {
      createSubordinates(subordinate, data)
    }
  }
}


// active tab

const buttons = document.querySelectorAll('button');

function makeTabActive(e) {
  buttons.forEach(button => button.classList.remove('button--active'));
  e.target.classList.add('button--active');
}



// add event listeners

document.querySelector('#all').addEventListener('click', e => {
  renderPage(showAll);
  makeTabActive(e);
});
document.querySelector('#averageSalaryPools').addEventListener('click', e => {
  renderPage(showPoolsAverage);
  makeTabActive(e);
});
document.querySelector('#lowPerformance').addEventListener('click', e => {
  renderPage(showLowPerformers);
  makeTabActive(e);
});