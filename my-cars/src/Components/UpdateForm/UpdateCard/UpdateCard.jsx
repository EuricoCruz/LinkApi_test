import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './UpdateCard.scss'

export default function CarCard(props) {
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()

  const toUpdate = (vehicle) => {
  history.push({
  pathname: '/update',
  state: { detail: vehicle}
    })
  }
  console.log(props)
  return (
    <div className="car-card-box">
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
        <button className="delete-button" type="button" onClick={props.updateAll}>Edita tudo</button>
        <button  className="update-button" type="button" onClick={props.updateOnly}>Edita parte</button>
      </div>
    </div>
    </div>
    

  )
}