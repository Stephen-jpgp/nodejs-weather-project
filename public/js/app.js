const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = '/weather?address='+encodeURIComponent(location)
    messageOne.textContent = ""
    messageTwo.textContent = "Loading weather data..."
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageTwo.textContent = data.error
            }
            else {
                messageOne.textContent = "Temperature is " + data.temperature + " in " + data.placeName
                messageTwo.textContent = data.description
                // console.log(data.temperature)
                // console.log(data.description)
            }
        })
    })
})