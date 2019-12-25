const EMAIL_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 6;
let credentials = {
  'user@gmail.com':'UserPass',
  'admin@gmail.com':'AdminPass'
};
let email, password, authenticated = false;

// login
email = prompt('Please enter your email');
if (!email) {
  alert('Canceled.');
} else if (email.length < EMAIL_MIN_LENGTH) {
  alert('I don\'t know any emails having name length less than 5 symbols');
} else if (credentials[email]) {
  password = prompt('Please enter password');

  // verify password and authenticate user
  if (!password) {
    alert('Canceled.');
  } else if (credentials[email] === password) {
    authenticated = true;
  } else {
    alert('Wrong password');
  }

} else {
  alert('I don\'t know you');
}

// change password
if (authenticated) {
  let passwordChange = confirm('Do you want to change your password?');
  if (!passwordChange) {
    alert('You have failed the change.');
  } else {
    let oldPassword = prompt('Enter the old password');
    if (!oldPassword) {
      alert('Canceled.');
    } else if (oldPassword === password){
      let newPassword = prompt('Enter the new password');
      if (!newPassword) {
        alert('Canceled');
      } else {
        if (newPassword.length < PASSWORD_MIN_LENGTH) {
          alert('It’s too short password. Sorry.');
        } else {
          let newPassword2 = prompt('Enter new password again');
          alert(newPassword2 === newPassword ?
            'You have successfully changed your password.' :
            'You wrote the wrong password.');
        }
      }
    } else {
      alert('Wrong password');
    }
  }
}