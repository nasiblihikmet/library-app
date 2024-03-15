import { readData } from "./firebase.js";

let comment_input = document.querySelector(".input-comment");
let send_icon = document.querySelector(".send-icon");
let comment = document.querySelector(".anonim-comments");



window.addEventListener('load', function(){
  const url = window.location.search
  const id = url.split('=')[1]

  readData(`books/${id}`)
  .then(data=>{
    renderBookWithID(data)
  })
})

function renderBookWithID(obj){
  const bookInfo = document.querySelector('#bookInfo')
  bookInfo.innerHTML = `
  <div class="description">
    <div class="year-book">2017</div>
    <div><h1 class="book-name">${obj.title}</h1></div>
    <div class="history-add"><p>2 days ago added</p></div>
    <div class="author-name"><p>${obj.author}</p></div>
    <div class="book-title">${obj.desc}</div>
  </div>
  <div class="img-container"><img src="${obj.image}" alt=""></div>
  `
  console.log(obj);
  
}

send_icon.addEventListener("click", async function (e) {
  e.preventDefault(); 
   let value = comment_input.value;
   let commentData = {
    text: value,
    bookId: 'salam',
};
   const response = await createPost (commentData)

  comment_input.value = "";
  renderComment()
});

async function renderComment () {


  const response = await getPosts();
  let arr = response.filter(item=>item.id>100)
  console.log(arr);
  const bookPage = arr.reverse().map((book,i ) =>{
if (i<10){
  

return `

<div class="comm1">
<div class="user1-info">
  <h2>anonim</h2>
  <p>${getCurrentTime()}</p>
</div>
<p>
  ${book.text}
</p>
</div>

`;
}
  }).join('');
  comment.innerHTML = bookPage;
  
}


function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} today`;
}

function getTimeDifferenceInDays(date) {
  const currentDate = new Date();
  const releaseDate = new Date(date);
  const timeDifferenceInMilliseconds = currentDate - releaseDate;
  const daysDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
  return daysDifference;
}


//Get post eleyen zaman Try icinde Request atir 
async function getPosts() {
  try {
    let respons = await fetch('https://blog-api-t6u0.onrender.com/posts', {
      method: "GET",
      headers:{
        'Content-Type': "application/json",
    }
    });
    const data = await respons.json(); // data alir ve return edir
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}


async function createPost(send) {
  try {
    let respons = await fetch('https://blog-api-t6u0.onrender.com/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    });
    let data = await respons.json();
console.log(send);
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}