
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
    renderGarageItems(items)
  })
}

renderGarageItems = (items) => {
  items.map((item) => {
    $('.items-list').append(`<li> Name: ${item.name} <br/> Reason:  ${item.reason} <br/> Cleanliness: ${item.cleanliness}</li>`)
  })
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
    $('.items-list').append(`<li> Name: ${item.name} <br/> Reason:  ${item.reason} <br/> Cleanliness: ${item.cleanliness}</li>`)
  })

  clearInputs()
}

clearInputs = () => {
  $('.name-input').val("")
  $('.storage-reason-input').val("")
}
