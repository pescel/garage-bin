// Store items in global array so I dont have to constantly query the dom
let garageItems = [];

$(document).ready(()=>{
  //addGarageItems()
  fetchGarageItems()
})

$('.open-garage').on('click', () => {
  $('.garage').animate({fontSize: '40px'});
  console.log('click');
})

fetchGarageItems = () => {
  fetch('/api/items')
  .then((response) => { return response.json() })
  .then((items) => {
    garageItems = items
    renderGarageItems()
    updateCount()
  })
}

renderGarageItems = () => {
  garageItems.map((item) => {
    $('.items-list').append(`<li>${item.name}</li>`)
  })
}

clearGarageItems = () => {
  $('.items-list').empty()
}

$('.add-item-btn').on('click', (e) => {
  e.preventDefault()

  let newItem = {
    name: $('.name-input').val(),
    reason: $('.storage-reason-input').val(),
    cleanliness: $('.cleanliness-dropdown').val()
  }
  postNewItem(newItem)
})

postNewItem = (newItem) => {
  let url = '/api/items'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  .then((response) => { return response.json() })
  .then((item) => {
    $('.items-list').append(`<li>${item.name}</li>`)
    garageItems.push(item)
    updateCount()
  })

  clearInputs()
}

clearInputs = () => {
  $('.name-input').val('')
  $('.storage-reason-input').val('')
}

$('.sort-btn').on('click', () => {
  sortItems()
})

sortItems = () => {
  // Use .slice() to copy the array so the original is not sorted
  sortedItems = garageItems.slice()
  sortedItems.sort((a, b) => {
    return a.name < b.name
  })
  // If the first item is the same, reverse the order to get A-Z, Z-A effect
  if (garageItems[0].name === sortedItems[0].name){
    sortedItems.reverse()
  }

  garageItems = sortedItems
  clearGarageItems()
  renderGarageItems()
}

updateCount = () => {
  let sparklingItems = garageItems.filter((item)=>{return item.cleanliness == "sparkling"})
  let dustyItems = garageItems.filter((item)=>{return item.cleanliness == "dusty"})
  let rancidItems = garageItems.filter((item)=>{return item.cleanliness == "rancid"})
  $('.total-count').text(garageItems.length)
  $('.sparkling-count').text(sparklingItems.length)
  $('.dusty-count').text(dustyItems.length)
  $('.rancid-count').text(rancidItems.length)
}
