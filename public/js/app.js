console.log('This is the javascript script.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errParagraph = document.querySelector('#message1')
const successParagraph = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {

    message1.textContent = ''
    message2.textContent = 'Loading...'

    const address = search.value
    
    fetch('/weather?address=' + address).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                message2.textContent = ''
                return message1.textContent = data.error
            }
            
            const {location, summary, temperature, rainChance} = data 

            const forecast = location + '.\n' + summary + ', ' + temperature + ' Cº and a chance of rain of ' + rainChance 
            //JSON.stringify(data)
            message1.textContent = ''
            message2.textContent = forecast
        })
    })
    e.preventDefault()
})
