const axios = require('axios')
const mongoose = require('mongoose')


let brand_url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
const saveFunction = async () => {
  const response = await axios.get(brand_url)
  await response.data.forEach(marca => {
    axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos`)
    .then(veiculos => veiculos.data.modelos.forEach(veiculo => {
      veiculos.data.anos.forEach(async carro => {
      information = carro.nome.split(" ")
      let vehicle = veiculo.nome;
      console.log(vehicle)
      let brand = marca.nome
      let year =  information[0];
      let description = information[1] 
      axios.post(`http://localhost:5000/vehicle`, {vehicle, brand, year, description})
      .then(status => console.log("salvo"))
      .catch(error => console.log(error))
      // console.log(vehicles)
      })
    }))
    .catch(err => console.log(err))
  })  
}

saveFunction()