import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './CarsCard.scss'

export default function CarCard(props) {
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()

  const handleDelete = (e, id) => {
    e.preventDefault()
    console.log(id)
    axios.delete(`http://localhost:5000/vehicle/delete/${id}`)
    .then(res => {
      console.log(res)
      setDeleted(true)
    })
    .catch(erro => console.log(erro))
  } 

  const toUpdate = (vehicle) => {
  history.push({
  pathname: '/update',
  state: { detail: vehicle}
    })
  }

  return (
    <div className="car-card-box">
    {!deleted ?
    <div className="car-card">
      <div className="info-div">
        <span className="info-title">Veículo: </span><span className="info-car">{props.car.vehicle}</span>
      </div>
      <div className="info-div">
        <span className="info-title">Marca: </span><span className="info-car">{props.car.brand}</span>
      </div>
      <div className="info-div">
       <span className="info-title">Ano: </span><span className="info-car">{props.car.year}</span>
      </div>
      <div className="info-div">
        <span className="info-title">Descrição: </span><span className="info-car">{props.car.description}</span>
      </div>
      <div className="button-div">
        <button className="delete-button" type="button" onClick={(e) => handleDelete(e, props.car._id)}>Deletar</button>
        <button  className="update-button" type="button" onClick={() => toUpdate(props.car)}>Editar</button>
      </div>
    </div>
    :
      <div className="car-card">
      <p className="deleted-message">Produto Deletado</p>
      </div>
    }
    </div>
    

  )
}