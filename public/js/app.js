console.log('This is the javascript script.')

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if(data.error){
            return console.log('Unable to fetch weather data')
        }
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errParagraph = document.querySelector('#error-paragraph')
const successParagraph = document.querySelector('#success-paragraph')

errParagraph.textContent = ''
successParagraph.textContent = 'Loading...'

weatherForm.addEventListener('submit', (e) => {
    const address = search.value
    
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                successParagraph.textContent = ''
                return errParagraph.textContent = data.error
            }
            
            const {location, summary, temperature, rainChance, humidity} = data 

            const forecast = location + '.\n' + summary + ', ' + temperature + ' Cº and a chance of rain of ' + rainChance 
            //JSON.stringify(data)
            successParagraph.textContent = forecast
            errParagraph.textContent = ''
        })
    })
    e.preventDefault()
})
