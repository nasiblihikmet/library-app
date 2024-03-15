// Firebase konfiqurasiyası və tətbiqin başlatılması
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  get,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
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

  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const contacts = ref(database, "contacts");
const send_Button = document.querySelector(".send_Button");
let textLength = document.querySelector("#textLength");

send_Button?.addEventListener("click", function(e){
e.preventDefault();
const name_Input = document.querySelector(".name_Input").value.trim();
const address_Input= document.querySelector(".address_Input").value.trim();
const email_Input = document.querySelector(".email_Input").value.trim();
const phone_Input= document.querySelector(".phone_Input").value.trim();
const contactTextarea = document.querySelector("#contactTextarea").value.trim();

if(!name_Input || !address_Input || !email_Input || !phone_Input){
    alert("Please check all informations")
}else if (email_Input.indexOf("@") === -1){
    alert("Please check all informations")
    // showMessage("Please check all informations", true);
}else{
const contactOb = {
     name_Input,
     address_Input,
     email_Input,
     phone_Input,
    contactTextarea,
};
push(contacts,contactOb)
document.querySelector(".name_Input").value = "";
document.querySelector(".address_Input").value = "";
document.querySelector(".email_Input").value = "";
document.querySelector(".phone_Input").value = "";
document.querySelector("#contactTextarea").value = "";
// showMessage("Successful process", false);
textLength.textContent = "0";
console.log("contactOb", contactOb);
}

})

function letterCounter() {
    var enteredText = contactTextarea.value;
    var letterCount =enteredText.length;
if (letterCount > 100) {
contactTextarea.value = enteredText.substring(0, 100);
letterCount = 100;
}
textLength.textContent = letterCount;
}

contactTextarea?.addEventListener("input", function () {
    letterCounter();
  });


  


  
 
  
  
