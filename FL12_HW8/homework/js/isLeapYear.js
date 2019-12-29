function isLeapYear(date) {
  let year = new Date(date).getFullYear();
  if (year) {
    return new Date(year, 1, 29).getDate() === 29 ?
    `${year} is a leap year` : `${year} is not a leap year`;
  } else {
    return 'Invalid Date';
  }
}

isLeapYear('2020-01-01 00:00:00'); // =>  ‘2020 is a leap year’
isLeapYear('2020-01-01 00:00:00777'); // =>  ‘Invalid Date’
isLeapYear('2021-01-15 13:00:00'); // =>  ‘2021 is not a leap year’
isLeapYear('2200-01-15 13:00:00'); // =>  ‘2200 is not a leap year’
isLeapYear(1213131313135465656654564646542132132131); // =>  ‘Invalid Date’
isLeapYear(1213131313); // => ‘1970 is not a leap year’


