const axios = require('axios')
const mongoose = require('mongoose')
const Vehicle = require("./models/vehicle")

// setting db configuration
mongoose.connect('mongodb://localhost/LinkApi', { autoIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to mongoDB');
});


let brand_url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
let allVehicles = []

const saveFunction = () => {
  setTimeout(function(){ 
    allVehicles.map((veiculo, index) => {
      let vehicle = veiculo.nome;
      let brand = veiculo.marca;
      let information = veiculo.ano.split(" ")
      let year = information[0]
      let description = information[1] 
      console.log(vehicle, brand, year, description)

      axios.post(`http://localhost:5000/vehicle`, {vehicle, brand, year, description})
      .then(log => console.log(console.log(`salvando ${index} de ${allVehicles.length}`)))
      .catch(error => console.log(error))
      
    })
    // axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos`)
   }, 15000);
}



const getBrandsAndModels = async () => {
  const response = await axios.get(brand_url)
  const vehicles = await response.data.map(brand => {
    axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos`)
    .then(veiculos => veiculos.data.modelos.map(veiculo => {
      veiculos.data.anos.map(carro => {
      
      let vehicle = {"nome": veiculo.nome, "codVehicle": veiculo.codigo, "marca": brand.nome, "codBrand": brand.codigo, 'ano': carro.nome }
      console.log(vehicle)
      allVehicles.push(vehicle)

      })
    }))
    .catch(err => console.log(err))
  }) 
  saveFunction()
}

getBrandsAndModels()