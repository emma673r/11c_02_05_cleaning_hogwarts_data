"use strict";

window.addEventListener("DOMContentLoaded", start);

// all my const
const allCleanStudents = [];

const Student = {
  firstName: "",
  middleName: "unknow middle name",
  nickName: "unknown nick name",
  lastName: "",
  imageSrc: "image.jpg",
  house: "",
};

const studentList = document.getElementById("student_list");
const template = document.getElementById("student").content;
// const singleStudent = document.querySelectorAll(".single_student");

const url = "https://petlatkea.dk/2021/hogwarts/students.json ";

// all my variables

let list;

// start
function start() {
  //   console.log(`start`);
  fetchData();
}

// ****** CONTROLLER
//* step 1 : async fetch data
async function fetchData() {
  const response = await fetch(url);
  list = await response.json();

  //   console.log(`allStudents is :`, list);

  prepareStudents(list);
}

// ****** MODEL
//* step 2 : init loop for each student aka prepare the student list
function prepareStudents(list) {
  //   console.log(`prepareStudents`);

  //   console.table(list);
  //   foreach student
  list.forEach((student) => {
    // console.log(`forEach working`);
    cleanStudentData();
  });
}

// *step 3 clean the data
function cleanStudentData() {
  //   console.log(`cleanStudentData`);
  //   foreach jsonStudent (not to confuse with const student!!)
  list.forEach((elm) => {
    const student = Object.create(Student);
    // ** make variables for each properties in (old) array
    // they are : fullname, gender and house
    let fullName;
    let gender;
    let house;

    //* 3.1 trim each new let for whitespace (as a start - global thing to do)
    // ! SHOULD ALL :  be lowercase as default and trim
    fullName = elm.fullname.trim();
    gender = elm.gender.trim();
    house = elm.house.trim();

    fullName = fullName.toLowerCase();
    gender = gender.toLowerCase();
    house = house.toLowerCase();

    // console.log(`fullName is _${fullName}_`);
    // console.log(`gender is _${gender}_`);
    // console.log(`house is _${house}_`);

    // *make new array for all srtings in fullname
    let fullNameArray = fullName.split(" ");
    // console.log(fullNameArray);

    //* 3.2 Clean and set values for the object student (specify steps)
    // ** 3.2.1 firstname
    let firstName = fullNameArray[0];
    // ! SHOULD : first char uppercase
    firstName = firstName[0].toUpperCase() + firstName.substring(1);
    student.firstName = firstName;
    // console.log(firstName);
    // console.log(student);

    // ** 3.2.2 middleName
    let indexOfFirst = fullName.indexOf(` `);
    let indexOfLast = fullName.lastIndexOf(` `);

    let middleName = (fullName = fullName.substring(indexOfFirst, indexOfLast));

    // ! SHOULD : first char uppercase + display undefined if student doesnt have one
    // if middle name is empty display undefined middle name
    if (middleName === "") {
      student.middleName = "undefined middle name";
    } else {
      // if middle includes a space - replace space with empty character (" " to "")
      if (middleName.includes(" ")) {
        middleName = middleName.replace(" ", "");
      }
      // uppercase first letter
      middleName = middleName[0].toUpperCase() + middleName.substring(1);
      console.log(`middleName is _${middleName}_`);
      student.middleName = middleName;
    }
    // console.log(student);
    // ** 3.2.3 nickName
    // ! SHOULD : find string inside of "" and isolate + display undefined if student doesnt have one

    // ** 3.2.4 lastName
    let lastName = fullNameArray[fullNameArray.length - 1];
    // console.log(lastName);
    // ! SHOULD : first char uppercase
    lastName = lastName[0].toUpperCase() + lastName.substring(1);
    student.lastName = lastName;
    // console.log(student);

    // ** 3.2.5 gender
    // ! SHOULD : first char uppercase
    gender = gender[0].toUpperCase() + gender.substring(1);
    student.gender = gender;
    // console.log(student);
    // ** 3.2.6 imgSrc
    // ! SHOULD : find from directory (.images/smthg) + make all to lowercase + make usre it ends with either .png or .jpg

    // ** 3.2.7 house
    // ! SHOULD : first char uppercase
        house = house[0].toUpperCase() + house.substring(1);
        student.house = house;
        
        console.log(student);
  });

  //* PUSH each elm in new clean array :   allCleanStudentList.push(elm)
}

// ***** VIEW
//* step 4 display/show the data
function displayStudents() {
  console.log(`displayStudents`);
  // ** 4.1  foreach student loop

  // ** 4.2  CLONE const clone = template cloneNode(true)
  // ** 4.2.1  clone qS [data-field="firstName"] = student.firstName.value (?? do you need the value at the end, test)
  // ** 4.2.2  clone qS [data-field="MiddleName"] = student.middleName
  // ** 4.2.3  clone qS [data-field="NickName"] = student.NickName
  // ** 4.2.4  clone qS [data-field="LastName"] = student.lastName
  // ** 4.2.5  clone qS [data-field="gender"] = student.gender
  // ** 4.2.6  clone qS [data-field="imgSrc"].src = student.imgSrc
  // ** 4.2.7  clone qS [data-field="house"] = student.house

  // ** 4.3 APPEND studentList.appenChild(clone);

  //   end
}
