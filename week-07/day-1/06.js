'use strict';

// An average Green Fox attendee codes 6 hours daily
// The semester is 17 weeks long
//
// Print how many hours is spent with coding in a semester by an attendee,
// if the attendee only codes on workdays.
//
// Print the percentage of the coding hours in the semester if the average
// work hours weekly is 52

var daily = 6;
var semester = 17;
var workHour = 52;
var week = 7;

var codingHourSemester = daily * semester * week;
var avarageWorkHour = 52;
var semesterWorkHour = avarageWorkHour * semester;

console.log(semesterWorkHour/codingHourSemester);



