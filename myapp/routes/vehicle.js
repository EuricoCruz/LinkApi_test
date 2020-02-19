var express = require('express');
var router = express.Router();
const Vehicle = require('../models/vehicle')
const axios = require('axios')

// add vehicle
router.post('/', (req, res) => {

  let {vehicle, brand, description, year} = req.body;
  Vehicle.create({vehicle, brand, description, year})
  .then(() => {
    res.send('adicionado')
  })
  .catch(err => {
    console.log(err)
  })
})


// get all vehicles
router.get('/', (req, res, next) => {
    Vehicle.find()
    .then(vehicle => {
      res.status(200).json(vehicle)
    })
    .catch(err => console.log(err))
});


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
});

// route to searchbar
router.get("/search", (req, res) => {
    let q = req.query
    console.log(/q/)
    Vehicle.find({ vehicle: {$regex: q.vehicle, $options: 'i'}})
    .then(vehicle => {
      console.log(vehicle)
    res.status(200).json(vehicle)
    })
    .catch(err => console.log(err))
});

// get details of one vehicle
router.get('/:id', (req, res, next) => {
  id = req.params.id
  Vehicle.findById({_id: id})
  .then(vehicle => {
    res.status(200).json(vehicle)
  })
  .catch(err => console.log(err))
});


// edit all data from a vehicle with put
router.put('/:id', (req, res) => {
  let {vehicle, year, description, brand} = req.body
  let updated = Date.now()
  const id = req.params.id;
  Vehicle.update({_id: id}, {vehicle, year, description, brand, updated})
  .then(vehicle => {
    res.json(vehicle)
  })
  .catch(err => console.log(err))
})


// edit specific data from a vehicle with patch
router.patch('/:id', (req, res) => {
  id = req.params.id
  let data = req.body
  let updated = Date.now()
  data.updated = updated
  
  Vehicle.update({_id:id}, {$set: data})
  .then(vehicle => {
    console.log(vehicle)
    res.status(200).json(vehicle)
    })
  .catch(err => console.log(err))
})


// delet vehicle
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Vehicle.deleteOne({_id: id})
  .then(res.send('deletado'))
  .catch(err => console.log(err))
})




module.exports = router;
