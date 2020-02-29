const newId = (() => {
  let id = 0;
  return () => ++id;
})();

class Employee {
  static EMPLOYEES = [];
  constructor(input) {
    let _id = newId();
    this.id = () => _id;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.birthday = input.birthday;
    this.salary = input.salary;
    this.position = input.position;
    this.department = input.department;
    Employee.EMPLOYEES.push(this);
  }

  get age() {
    return Math.floor((new Date() - new Date(this.birthday)) /
        (1000*60*60*24*365.25));
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  quit() {
    Employee.EMPLOYEES.splice(Employee.EMPLOYEES.findIndex((el) => {
       return el.id() === this.id();
    }), 1);
  }

  retire() {
    console.log(`It was such a pleasure to work with you!`);
    this.quit();
  }

  getFired() {
    console.log(`Not a big deal!`);
    this.quit();
  }

  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }

  changePosition(newPosition) {
    this.position = newPosition;
  }

  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  changeParams(params) {
    for (let item in params) {
      switch(item) {
        case 'salary':
          this.changeSalary(params[item]);
          break;
        case 'position':
          this.changePosition(params[item]);
          break;
        case 'department':
          this.changeDepartment(params[item]);
          break;
        default:
          throw new Error(`Something went wrong!`);
      }
    }
  }

  getPromoted(benefits) {
    this.changeParams(benefits);
    console.log(`Yoohooo!`);
  }

  getDemoted(punishment) {
    this.changeParams(punishment);
    console.log(`Damn!`);
  }
}

class Manager extends Employee {
  constructor(input) {
    super(input);
    this.position = 'manager';
  }

  get managedEmployees() {
    return Employee.EMPLOYEES.filter((el) => {
      return (el.department === this.department) &&
          (el.position !== 'manager');
    }) 
  }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
  constructor(input) {
    super(input);
    this.department = 'hr';
  }
}

class SalesManager extends Manager {
  constructor(input) {
    super(input);
    this.department = 'sales';
  }
}


// task 3

const canPromote = (manager) => ({
  promote: (person, params) => {
    if (manager.managedEmployees.includes(person)) {
      person.getPromoted(params);
    } else {
      console.log(`Cannot promote ${person} from another department.`)
    }
  }
});

const ManagerPro = (manager) => {
  return Object.assign(manager, canPromote(manager))
};




// tests

let a = new Employee({
  firstName: 'John',
  lastName: 'Doe',
  birthday: '02/21/2000',
  salary: 5000,
});

let b = new Employee({
  firstName: 'John2',
  lastName: 'Doe2',
  birthday: '02/23/2000',
  salary: 5000,
  position: 'position2',
});

let m = new Manager({department:'lohi', firstName:'Vasya'});

console.log(a.age, b.age, a.fullName);
console.log(Employee.EMPLOYEES);
b.getPromoted({salary:7500,position:'yoptapos',department:'yoptadept'});
a.getFired();
console.log(Employee.EMPLOYEES);
b.getDemoted({salary:500,position:'loh',department:'lohi'});
console.log(Employee.EMPLOYEES);

console.log(m.managedEmployees);

console.log('task 3');
let managerPro = ManagerPro(m);
console.log(managerPro);
console.log(managerPro.managedEmployees);
managerPro.promote(b, {salary:50,position:'kurwa'});
console.log(Employee.EMPLOYEES);
