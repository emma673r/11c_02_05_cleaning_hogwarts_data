"use strict";

window.addEventListener("DOMContentLoaded", start);

// all my const
const allCleanStudents = [];

const Student = {
  firstName: "",
  middleName: "unknow middle name",
  nickName: "unknown nick name",
  lastName: "",
  imageSrc: "image.png",
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
    // ! SHOULD : first char uppercase + display undefined if student doesnt have one
    let middleName = fullName.substring(indexOfFirst, indexOfLast);

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
    // only one student with nickname
    // nickname displayed by putting it between ""

    let nickName = fullName.substring(fullName.indexOf(`"`) + 1, fullName.lastIndexOf(`"`));
    nickName = nickName.charAt(0).toUpperCase() + nickName.substring(1)
    student.nickName = nickName;
    // !somehow nickName[0] is not defined ???? dont understand


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
    let imgSrc;
    // ! SHOULD : have the right name to fetch the right photo from right depository
    //* look at images and student names - find a pattern
    //* all images src have last name written, a _ and first letter firstname
    //* exceptions are : Leanne and the Patils

    // if student name has no last name - Leanne
    if (!fullName.includes(" ")) {
      imgSrc = `no image`;
    }
    // only 2 img src same last name - Patil (Parvati & Padma)
    // so if student name includes patil
    else if (fullName.toLowerCase().includes("patil")) {
      imgSrc = `./images/${lastName.toLowerCase()}_${firstName.toLowerCase()}.png`;
    }
    // if student name has last name and first name and is only one with last name (the OG pattern)
    else {
      imgSrc = `./images/${fullName.substring(fullName.lastIndexOf(" ") + 1).toLowerCase()}_${student.firstName[0].toLowerCase()}.png`;
    }

    student.imgSrc = imgSrc;

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
