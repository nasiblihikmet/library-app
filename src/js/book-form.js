const typeAddBtn = document.querySelector("#typeAddBtn");
const bookTypeList = document.querySelector("#bookTypeList");
const closeBtn = document.querySelector("#closeBtn");
const bookTypeInput = document.querySelector("#bookTypeInput");
const ylwBtnAdd = document.querySelector("#ylwBtnAdd");




// firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase,
    ref,
    push,
    get,
     } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyDGsqCFzK968Iw30ccw_sa63MJ71JH8Ask",
  authDomain: "library-bookstore-47573.firebaseapp.com",
  databaseURL: "https://library-bookstore-47573-default-rtdb.firebaseio.com",
  projectId: "library-bookstore-47573",
  storageBucket: "library-bookstore-47573.appspot.com",
  messagingSenderId: "241881115117",
  appId: "1:241881115117:web:87741476f3375fded59fe4",
  measurementId: "G-TNGEJRZG18"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);

const createData = (path, data) => {
    const newRef = push(ref(database, path), data);
  
    return newRef.key;
  };
  function convertData(d) {
    const newData = Object.entries(d);
  
    const myNewData = newData.map((kicikArr) => {
      const newObj = {
        id: kicikArr[0],
        name:kicikArr[1]
      };
  
      return newObj;
    });
  
    return myNewData;
  }

  // Read
  const readData = (path) => {
   
  
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
  };


ylwBtnAdd.addEventListener("click", function(e){
    e.preventDefault();
    addType.style.visibility = "visible"; 
  });
  closeBtn.addEventListener("click", function(e){
    e.preventDefault();
    addType.style.visibility = "hidden"; 
  });

window.addEventListener('load', (e) =>{
    readData("/category")
    .then((data) =>{
      const categorys = convertData(data);
      console.log(categorys);
      bookTypeList.innerHTML =categorys.map(item =>
        ` <option value=${item.name} selected>${item.name}</option>`
        )
      
    })
})

typeAddBtn.addEventListener("click",()=>{
    const value = bookTypeInput.value;
    bookTypeInput.value = '';
    createData("category", value);
    alert("Category Added!");
    readData("/category")
    .then((data) =>{
      const categorys = convertData(data);
      console.log(categorys);
      bookTypeList.innerHTML =categorys.map(item =>
        ` <option value=${item.name} selected>${item.name}</option>`
        )
      
    })
    .catch((error) => console.error("Error reading data:", error));
  })
