window.addEventListener('load', () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector('.temperature-description')
        let temperatureDegree = document.querySelector('.temperature-degree')
        let locationTimeZone = document.querySelector('.timezone')



        if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
                    long = position.coords.longitude
                    lat = position.coords.latitude
                    
                    const proxy = 'https://cors-anywhere.herokuapp.com/';
                    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
                    
                    fetch(api)
                    .then(data => {
                        return data.json()
                    })
                    .then(d =>{
                        console.log(d)
                        const {temperature, summary, icon}= d.currently
                        let celsius = convertFtoC(temperature)
                        temperatureDegree.innerText = celsius
                        let description = transalate(summary)
                        temperatureDescription.innerText = description
                        locationTimeZone.innerHTML = d.timezone

                        setIcons(icon, document.querySelector('.icon'))

                    })
                });
            }

        function setIcons(icon, iconID){
            const skycons = new Skycons({color: 'white' })
            const currentIcon = icon.replace(/-/g, "_").toUpperCase()
            skycons.play()
            return skycons.set(iconID, Skycons[currentIcon])
        }

        function convertFtoC(fTemparature){
             return parseFloat((fTemparature - 32) * 5/9).toFixed(1)
        }

        function transalate(word){
            switch(word){
                case 'clear':
                    word = 'limpo'
                break;
                case cloudy:
                    word = 'Nublado'
                break;
                case 'Rain':
                    word = 'Chuva'
                break;
                default: word = ''
            }

            return word 
        }
 




})