import { readData } from "./firebase.js";

const linkGroup = document.querySelector("#linkGroup")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase, ref, get, set, push, onValue, child  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import { createData } from "./firebase";


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

function writeSetData(path, data){
  const setKey = set(ref(database, path), data);
  return setKey.key

}

const create = (path, data) => {
  const newRef = push(ref(database, path), data);

  return newRef.key;
};


function convertDatas(d) {
  const newData = Object.entries(d);

  const myNewData = newData.map((kicikArr) => {
      const newObj = {
          id: kicikArr[0],
          name: kicikArr[1],
      };

      return newObj;
  });

  return myNewData;
}




onValue(ref(database, "category"), renderCatalog)

function renderCatalog (list){
  const data = convertDatas(list.val()) 
  linkGroup.innerHTML = data.map(item =>
    ` <div class="form-link"><a href="./src/pages/catalog.html" catID="${item.name}">${item.name}</a></div>
                  
    `).join("");
    return data
    

 
}
