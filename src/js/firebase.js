import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, get, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);
const auth = getAuth(firebaseapp);

// Create
export const createData = (path, data) => {
    const newRef = push(ref(database, path), data);

    return newRef.key;
};

export function convertData(d) {
    const newData = Object.entries(d);
    const myNewData = newData.map((kicikArr) => {
        const newObj = {
            id: kicikArr[0],
            ...kicikArr[1],
        };

        return newObj;
    });

    return myNewData;
}

//Write
export function writeSetData(path, data) {
    const setKey = set(ref(database, path), data);
    return setKey.key;
}
// Read once
export const readData = (path) => {
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
};

// Listen for changes
export const listenForChanges = (path, callback) => {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
};

// Delete
export const deleteData = (path, id) => {
    const dataRef = ref(database, path + id);
    remove(dataRef)
}

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };
