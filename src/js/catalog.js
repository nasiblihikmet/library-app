const allBooks = document.querySelector("#allBooks");
const bestseller = document.querySelector("#bestseller");
const newchek = document.querySelector("#new");
const category = document.querySelector("#category")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase, ref, get, set, child, onValue,  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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




function convertData(d) {
  const newData = Object.entries(d);

  const myNewData = newData.map((arr) => {
    const newObj = {
      id: arr[0],
      ...arr[1],
    };

    return newObj;
  });

  return myNewData;
}

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




onValue(ref(database, "category"), renderCategorys);



function renderCategorys(snaphot){
  const data = convertDatas(snaphot.val())
   category.innerHTML = data.map((item)=>{
    return`
    
         <li>
         <button type="button" class="catalog_categories" catID="${item.name}">${item.name}</button>
        </li>
        
   
    `
  }).join("");
  let buttons = document.getElementsByClassName("catalog_categories");
  for(let i = 1; i < buttons.length; i++ ){
    buttons[i].addEventListener("click", function(){
      let id = buttons[i].getAttribute("catID")
      getBook(id);
    })
  }
  return data

}


function getBook(categoryId) {
  const dbRef = ref(database)
  get(child(dbRef, 'books')).then((snapshot) => {
      let bookData
      if (snapshot.exists()) {
          let dataArr = Object.entries(snapshot.val())
          let dataList = dataArr.map((item) => {
              const newObj = {
                  id: item[0],
                  ... item[1],
              };
              return newObj
          })
          let filteredData = dataList.filter((book) => {
              return book.category === categoryId
          })
          if (categoryId) {
              bookData = filteredData
          } else {
              bookData = dataList
          }
          let dataListMap = bookData.map((item, index) => {
              return `
              <div class="swiper-slide">
                  <div class="catalog_box_item">
                      <img src="${item.image}" alt="">
                     <span> ${item.newcheck === true ? 'New' : ''}</span>
            <p>${item.author}</p>
            <h5>${item.title}</h5>
            <a href="book.html?id=${item.id}" >Read more</a>
                  </div>
              </div>
      `
          }).join("")
          allBooks.innerHTML = dataListMap;
          swiperAll.update()
          return dataList
      }
  }).catch((err) => {
      console.log(err, 'err')
  })
}
getBook()



onValue(ref(database, "books"), renderNew);
onValue(ref(database, "books"), renderBestSeller);

function renderNew(snaphot){

  const data = convertData(snaphot.val());
  let filteredBooks = data.filter((book)=>{
    if (book.newcheck === true){
        return book
    }
  })
  newchek.innerHTML = filteredBooks.map((item)=>{
    return `
    <div class="swiper-slide">
     <div class="catalog_box_item">
     <img src="${item.image}" alt="">
    <span>New</span>
     <h5>${item.title}</h5>
     <p>${item.author}</p>
      <a href="book.html?id=${item.id}">Read more</a>
      </div>
   </div>
    `
  }).join("")
  swiperNew.update()
}


function renderBestSeller(snaphot){
  const data = convertData(snaphot.val());
  let filteredBooks = data.filter((book)=>{
    if (book.bestsellerbox === true){
        return book
    }
  })
  bestseller.innerHTML = filteredBooks.map((item)=>{
    return `
    <div class="swiper-slide">
     <div class="catalog_box_item">
     <img src="${item.image}" alt="">
    <span >${item.newcheck === true ? 'New' : ''}</span>
     <h5>${item.title}</h5>
     <p>${item.author}</p>
      <a href="book.html?id=${item.id}">Read more</a>
      </div>
   </div>
    `
  }).join("")
  swiperBestsell.update()
}


const swiperBestsell = new Swiper('.swiper.swiperBestsell', {
  // Optional parameters
  slidesPerView: 10 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});
const swiperAll = new Swiper('.swiper.swiperAll', {
  // Optional parameters
  slidesPerView: 10 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});
const swiperNew = new Swiper('.swiper.swiperNew', {
  // Optional parameters
  slidesPerView: 5 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});














