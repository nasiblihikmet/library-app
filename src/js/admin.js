import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "./firebase.js";
import { createData, writeSetData, readData, listenForChanges, convertData, deleteData } from "./firebase.js";

const usernameInp = document.querySelector(".username-input");
const passwordInp = document.querySelector(".password-input");
const joinBtn = document.querySelector(".login-form_btn");
const logoutBtn = document.querySelector("#logoutBtn");

const adminLoginScreen = document.querySelector(".admin-login");
const adminPanelScreen = document.querySelector(".admin-panel");

const srcInput = document.querySelector("#srcInput");
const srcBtn = document.querySelector("#srcBtn");
const srcResult = document.querySelector("#srcResult");
const srcList = document.querySelector("#srcList");

const bookForm = document.querySelector('#bookForm')
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookImage = document.querySelector("#bookImage");
const bookDesc = document.querySelector("#bookDesc");
const addBtn = document.querySelector("#addBtn");
const besteller = document.querySelector("#checkbox");
const newchek = document.querySelector("#new");

const bookTypeList = document.querySelector("#bookTypeList");

// About store 
const aboutBookTitle = document.querySelector("#aboutBookTitle");
const aboutBookImage = document.querySelector("#aboutBookImage");
const aboutBookDesc = document.querySelector("#aboutBookDesc");
const aboutAddBtn = document.querySelector("#aboutAddBtn");

const booksTable = document.querySelector("#booksTable");
const contactTable = document.querySelector("#contactTable");
const usersTable = document.querySelector("#usersTable");


window.addEventListener("load", function () {
    adminLoginScreen.classList.add("d-none");
    adminPanelScreen.classList.add("d-none");
    const isSignedIn = localStorage.getItem("signedIn");

    if (isSignedIn) {
        adminLoginScreen.classList.add("d-none");
        adminPanelScreen.classList.remove("d-none");
    }
    checkAuthState();
});

// Sign In functionality
joinBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const username = usernameInp.value.trim();
    const password = passwordInp.value.trim();
    const alertEl = document.querySelector("#alertEl");

    if (!username || !password) {
        alertEl.classList.remove("d-none");
        alertEl.innerHTML = "All fields must be filled";

        setTimeout(() => {
            alertEl.classList.add("d-none");
        }, 2000);

        return;
    }

    await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log(userCredential);
            localStorage.setItem("signedIn", "true");
            adminLoginScreen.classList.add("d-none");
            adminPanelScreen.classList.remove("d-none");
        })
        .catch((err) => {
            console.log(err);
            usernameInp.value = "";
            passwordInp.value = "";
            alertEl.classList.remove("d-none");
            alertEl.innerHTML = "Username or password are incorrect";

            setTimeout(() => {
                alertEl.classList.add("d-none");
            }, 2000);
        });
});

async function checkAuthState() {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            adminLoginScreen.classList.add("d-none");
            adminPanelScreen.classList.remove("d-none");
        } else {
            adminLoginScreen.classList.remove("d-none");
            adminPanelScreen.classList.add("d-none");
        }
    });
}

// LogOut functionality
logoutBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    localStorage.removeItem("signedIn")
    await signOut(auth);
});

// Search a book 
srcInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        srcBtn.click();
    }
});

srcBtn.addEventListener("click", async function () {
    const title = srcInput.value;
    if(!title){
        alert('Search field is empty')
        return
    }
    await myPromise(title);
    srcResult.classList.remove('d-none');
    srcInput.value = "";
});

async function myPromise(bookTitle) {
    try {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;
        const response = await fetch(url);
        const data = await response.json();
        renderItem(data);

        srcResult.style.backgroundColor = "#f1f0f0";
        srcResult.style.height = "250px";
    } catch (err) {
        console.log(err);
        if (err) {
            srcResult.style.backgroundColor = "#d9534f";
            srcResult.style.height = "50px";
            srcList.innerHTML = `<li>${bookTitle.toUpperCase()} was not found</li>`;
            setTimeout(() => {
                srcList.innerHTML = '';
                srcResult.classList.add('d-none')
            }, 2000)
        }
    }
}

function renderItem(data) {
    const book = data.items;
    srcList.innerHTML = book.map((item) => `
    <li data-id=${item.id} class="search-result"><i class="far fa-clock"></i>${item.volumeInfo.title}</li>`
        )
        .join("");
}

// Fetch a book
async function getBookByID(BookID) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${BookID}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
}

// Select a Book from the list
srcList.addEventListener("click", async (e) => {
    const bookID = e.target.dataset.id;
    const bookForm = await getBookByID(bookID);

    bookTitle.value = bookForm.volumeInfo.title;
    bookAuthor.value = bookForm.volumeInfo.authors.toString()
    bookImage.value = bookForm.volumeInfo.imageLinks.thumbnail;
    bookDesc.value = bookForm.volumeInfo.description;

    srcResult.classList.add('d-none');
  });

//   Add a Book to Firebase
  addBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const bestsellerbox = besteller.checked;
      const newcheck = newchek.checked;
      const category = bookTypeList.value;

      const title = bookTitle.value;
      const author = bookAuthor.value;
      const image = bookImage.value;
      const desc = bookDesc.value;

      const book = {
          title,
          author,
          image,
          desc,
          category,
          newcheck,
          bestsellerbox,
      };

      createData("books", book);
      bookForm.reset()
      alert("added");
  });

// Add About store Info
aboutAddBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const aboutTitle = aboutBookTitle.value;
    const aboutImage = aboutBookImage.value;
    const aboutDesc = aboutBookDesc.value;
    const form = {
        aboutTitle,
        aboutImage,
        aboutDesc,
    };

    writeSetData("/about", form);
    alert("Added");

    aboutBookTitle.value = ''
    aboutBookImage.value = ''
    aboutBookDesc.value = ''

});

// Join us Table
readData("users").then((data) => {
    const users = convertData(data);
    usersTable.innerHTML = users
        .map(
            (el, i) => `
    <tr>
        <td scope="row">${i + 1}</td>
        <td>${el.fullname}</td>
        <td>${el.email}</td>
    </tr>
    `
        )
        .join("");
});

// Books Table
listenForChanges("books", (data) => {
    const books = convertData(data);

    booksTable.innerHTML = books
        .map(
            (book, i) => `
    <tr>
    <td scope="row">${i + 1}</td>
    <td class="text-start">
        <img
            class="me-1 book-table_img"
            src="${book.image}"
            alt="${book.title} book"
        />
        ${book.title}
    </td>
    <td>${book.desc.slice(0, 50)}...</td>
    <td>${book.category}</td>
    <td>${book.author}<i data-id="${book.id}" class="fa-solid fa-trash ps-1"></i></td>
</tr>
    `
        )
        .join("");
});

// Delete a book
booksTable.addEventListener("click", (e) => {
    let isTrashIcon = e.target.classList.contains("fa-trash");
    if (isTrashIcon) {
        const bookId = e.target.dataset.id;
        // console.log(e.target.dataset.id);
        deleteData("books/", bookId);
    }
});

// Contacts table
readData("contacts").then((data) => {
    const contactInfo = convertData(data);
    contactTable.innerHTML = contactInfo
        .map(
            (el, i) => `
        <tr>
            <td scope="row">${i + 1}</td>
            <td>${el.name_Input}</td>
            <td>${el.address_Input}</td>
            <td>${el.email_Input}</td>
            <td>${el.phone_Input}</td>
        </tr>
        `
        )
        .join("");
});
