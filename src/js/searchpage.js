// Firebase konfiqurasiyası və tətbiqin başlatılması
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
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

const searchBtnEl = document.querySelector('#searchBtnEl');
const inputSearchEl = document.querySelector('#inputSearchEl');
const swiper_div = document.querySelector('#swiper_div');

// const book = document.querySelector('.book');
// const book_name = document.querySelector('.book_name');
// const author = document.querySelector('.author');
// const title = document.querySelector('.title');
// Axtarış düyməsinə klikləndikdə kitabları axtaran funksiya
function searchBooks(query) {
  // Firebase-dən kitabları almaq
  const booksRef = ref(database, 'books');

  get(booksRef).then((snapshot) => {
    const data = snapshot.val();
    const books = Object.values(data);

    const filteredBooks = books.filter((book) => {
      const title = book?.title?.toLowerCase();
      const author =
        typeof book.author === 'string' ? book.author.toLowerCase() : '';
      return (
        title?.includes(query.toLowerCase()) ||
        author?.includes(query.toLowerCase())
      );
    });

  

    renderBooks(filteredBooks);
  });
}

function renderBooks(books) {
    if(!books.length){
        alert('not found');
        inputSearchEl.value = ''
        return;
    } 
  let swiperDiv = books.map((book) => {

    return `
 <div class="swiper-slide" >  
  <div class="box2" >
      <div class="book1" >
        <img
          class="book" id="book_img"
          src="${book.image}"
          alt="book"
        />
      </div>
      <div class="book_title" id="book_title_div">
        <h2 class="book_name" id="book_name_h2">${book.title}</h2>
        <p class="author" id="author_p">${book.author}</p>
        <p class="title" id="title_p">${removeTags(book.desc)}
        </p>
      </div>
     
    </div>
    </div>
  
    `;
  });
  
  swiper_div.innerHTML = swiperDiv.join('');
}

function removeTags(str) { 
  if ((str===null) || (str==='')) 
      return false; 
  else
      str = str.toString(); 

  return str.replace( /(<([^>]+)>)/ig, '')
}

searchBtnEl.addEventListener('click', () => {
  const searchTerm = inputSearchEl.value.trim();
  if(searchTerm.length == 0){
    alert("Enter the book name")
  }else{
    searchBooks(searchTerm);
  }
});

// Firebase-dəki məlumatı səhifə yüklənərkən göstərmək üçün renderBooks funksiyasını buraya əlavə edirik
// onValue(ref(database, 'books'), (snapshot) => {
//   const data = snapshot.val();
//   const books = Object.values(data);

//   renderBooks(books);
// });













