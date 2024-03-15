import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
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
    measurementId: "G-TNGEJRZG18",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const users = ref(database, "users");

let fullname_input = document.querySelector("#fullname_input");
let email_input = document.querySelector("#email_input");
let join_btn = document.querySelector("#join_btn");
let join_btn1 = document.querySelector("#join-btn");
let rejectBtn = document.querySelector("#rejectBtn");
let modal_body = document.querySelector("#modal_body");

const body = document.body;

rejectBtn.addEventListener("click", function () {
    modal_body.classList.remove("show");
    body.style.overflow = "visible";
});

join_btn1.addEventListener("click", function () {
    modal_body.classList.add("show");
    body.style.overflow = "hidden";
});

join_btn?.addEventListener("click", function (e) {
    e.preventDefault();

    if (email_input.value == "" || fullname_input.value == "") {
        alert("Please check form");
    } else {
        let userInfo = {
            fullname: fullname_input.value,
            email: email_input.value,
        };
        push(users, userInfo);
        fullname_input.value = "";
        email_input.value = "";
        modal_body.classList.remove("show");

    }
    
    push(users, userInfo);
    alert("Added");
});
