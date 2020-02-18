const axios = require('axios')

let brand_url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
let vehicles = []
const myFunction = async () => {
  setTimeout(function(){ 
    vehicles.map(vehicle => console.log(vehicle))
    // axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos`)
   }, 10000);
}

const getBrands = async () => {
  const response = await axios.get(brand_url)
  await response.data.map(res => {
    axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${res.codigo}/modelos`)
    .then(res => vehicles.push(res.data))
    .catch(err => console.log(err))
  })
  myFunction()  
}


getBrands()