document.getElementById('add').addEventListener('click', addVehicle)
const date = new Date().toLocaleDateString();
const time = document.getElementById('date');

time.innerHTML = date





function addVehicle(){

    let carBrand = document.getElementById('car-brand').value;
    let model = document.getElementById('car-model').value;
    let sign = document.getElementById('car-sign').value;
    let color = document.getElementById('car-color').value;

    let time = new Date();

    car = {
        brand: carBrand,
        model: model,
        sign: sign,
        color: color,
        insertOn:{ 
            hour:time.toLocaleTimeString(),
            day: new Date().toLocaleDateString()}
    }

    if(localStorage.getItem('park') === null){
        let cars = [];

        cars.push(car);

        localStorage.setItem('park', JSON.stringify(cars))
    }else{
        let cars = JSON.parse(localStorage.getItem('park'));
        cars.push(car);

        localStorage.setItem('park', JSON.stringify(cars))
    }

    document.getElementById('car-brand').value = '';
    document.getElementById('car-model').value = '';
    document.getElementById('car-sign').value = '';
    document.getElementById('car-color').value = '';

    showPark()
}

function takeCarOff(sign){

    let perg = confirm('Você tem certeza?');

    if(perg === true){

    let cars = JSON.parse(localStorage.getItem('park'));


    for(i = 0; i < cars.length; i ++){
        if(cars[i].sign === sign){
            cars.splice(i, 1);
        }
        localStorage.setItem('park', JSON.stringify(cars));
    }

    showPark();
    }

}



function showPark(){
    let cars = JSON.parse(localStorage.getItem('park'));
    let carsResult = document.getElementById('results');

    carsResult.innerHTML = '';

    for(var i = 0; i< cars.length; i++  ){
        var brand = cars[i].brand;
        var model = cars[i].model;
        var color = cars[i].color;
        var sign = cars[i].sign;
        var entrace = cars[i].insertOn.hour;

        carsResult.innerHTML += `<tr><td>${brand}</td>
                                <td>${model}</td> 
                                <td>${color}</td>
                                <td>${sign}</td>
                                <td>${entrace}</td>
                                <td><button class = 'btn btn-outline-danger' onclick = "takeCarOff(\'`+sign+`\')">Excluir</button>
                                                </tr>`            

    }

   


}

