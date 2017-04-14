
// Store items in global array so I dont have to constantly query the dom
let garageItems = [];

$(document).ready(()=>{
  fetchGarageItems()
})

closeGarage = () => {
  let listHeight = $('.items-list').height() + 10
  $('.garage').animate({height: listHeight});
  $('.open-garage').text('Open')
}

$('.open-garage').on('click', () => {
  if ($('.garage').height() === 0) {
    closeGarage()
  } else {
    $('.open-garage').text('Close')
    $('.garage').animate({height: '0px'});
  }
  console.log('click');
})

fetchGarageItems = () => {
  return fetch('/api/items')
  .then((response) => { return response.json() })
  .then((items) => {
    garageItems = items
    renderGarageItems()
    closeGarage()
    updateCount()
  })
}

itemElement = (item) => {
  return `<li class='item' data-id='${item.id}'>${item.name}</li>`
}

$('.items-list').on('click', '.item', (e) => {
  let itemId = $(e.currentTarget).data('id')
  renderSelectedItem(itemId)
})

renderSelectedItem = (itemId) => {
  let item = garageItems.find((item) => { return itemId == item.id })
  $('.selected-item').html(`<p class='selected-text'>Name: ${item.name} Reason: ${item.reason} Cleanliness: ${item.cleanliness}</p>`)
}

renderGarageItems = () => {
  garageItems.map((item) => {
    $('.items-list').append(itemElement(item))
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
    $('.items-list').append(itemElement(item))
    garageItems.push(item)
    closeGarage()
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
  let sparklingItems = garageItems.filter((item)=>{return item.cleanliness == 'sparkling'})
  let dustyItems = garageItems.filter((item)=>{return item.cleanliness == 'dusty'})
  let rancidItems = garageItems.filter((item)=>{return item.cleanliness == 'rancid'})
  $('.total-count').text(garageItems.length)
  $('.sparkling-count').text(sparklingItems.length)
  $('.dusty-count').text(dustyItems.length)
  $('.rancid-count').text(rancidItems.length)
}