const axios = require('axios')
const mongoose = require('mongoose')
const Vehicle = require("./models/vehicle")

let brand_url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
let allVehicles = []

const getBrandsAndModels = async () => {
  const response = await axios.get(brand_url)
  const vehicles = await response.data.map(brand => {
    axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos`)
    .then(veiculos => veiculos.data.modelos.map(veiculo => {
      veiculos.data.anos.map(carro => {
      
      let vehicle = {"nome": veiculo.nome, "codVehicle": veiculo.codigo, "marca": brand.nome, "codBrand": brand.codigo, 'ano': carro.nome }
      console.log(vehicle)
      allVehicles.push(vehicle)
      console.log(allVehicles.length)
      })
    }))
    .catch(err => console.log(err))
  }) 

}






getBrandsAndModels()