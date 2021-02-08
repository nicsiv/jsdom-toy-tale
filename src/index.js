const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toysURL = "http://localhost:3000/toys"
const toyCollectionDiv = document.getElementById('toy-collection')
let addToy = false 

  addBtn.addEventListener("click", () => {

    // hide & seek with the form

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


function fetchToys(){
    fetch(toysURL)
    .then( res => res.json() )
    .then( toys => { 
      toys.forEach(function(toy){
        addToyToDOM(toy)
      })
  })
}


function addToyToDOM(toy){
  
    let h2 = document.createElement("h2")
    h2.innerText = toy.name
    
    let toyImage = document.createElement("img")
    toyImage.setAttribute('src', toy.image)
    toyImage.setAttribute('class', 'toy-avatar')

    let likesPTag = document.createElement('p')
    likesPTag.innerText = toy.likes

    let likesButton = document.createElement("button")
    likesButton.setAttribute('class', 'like-btn')
    likesButton.innerText = 'Like <3'
    likesButton.dataset.id = toy.id
    

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')

    divCard.append(h2, toyImage, likesPTag, likesButton)
    toyCollectionDiv.append(divCard)

}

function submitCreateAToy(){
    const createToyForm = document.querySelector(".add-toy-form")
    createToyForm.addEventListener("submit", function(event){
    
      event.preventDefault()
      
      const inputData = {
      name: event.target['name'].value,
      image: event.target['image'].value,
      likes: 0
      }

      event.target.reset()

      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      }
      fetch(toysURL, reqObj)
      .then(resp => resp.json())
      .then(toy => {console.log(toy)
        addToyToDOM(toy)
      })
    })
  }

   function increaseLikes(){
     document.addEventListener('click', function(event){
        if (event.target.className === "like-btn"){
          const toyId = event.target.dataset.id
          const card = event.target.parentElement
          let newLikes = parseInt(card.querySelector("p").innerHTML)
          newLikes += 1
          // this sets the new value for likes
          const clickData = {
            likes: newLikes
          }
          console.log(toyId)
         const reqObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(clickData)
          }
          fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
        .then(resp => resp.json())
        .then(toy => {
          card.querySelector("p").innerHTML = toy.likes
        })
        }
       

     })
   }


fetchToys()
submitCreateAToy()
increaseLikes()




































// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false;
// let divCollect = document.querySelector('#toy-collection')

//   addBtn.addEventListener("click", () => {

//     // hide & seek with the form

//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });


// function getToys() {
//   return fetch('http://localhost:3000/toys')
//     .then(response => response.json())
//     .then(toys => {
//       toys.forEach(function(toy){
//         renderToy(toy)
//       })
//     })
// }


// function renderToys(toy) {
//   let h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   let img = document.createElement('img')
//   img.setAttribute('src', toy.image)
//   img.setAttribute('class', 'toy-avatar')

//   let p = document.createElement('p')
//   p.innerText = ${toy.likes} likes

//   let btn = document.createElement('button')
//   btn.setAttribute('class', 'like-btn')

//   let divCard = document.createElement('div')
//   divCard.setAttribute('class', 'card')
//   divCard.append(h2, img, p, btn)
//   divCollect.append(divCard)
// }

















