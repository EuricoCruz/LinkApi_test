import React, { useState, useEffect } from 'react';
import InputCustomizado from '../InputCustomizado/InputCustomizado';
import { useHistory } from 'react-router-dom'
import UpdateCard from './UpdateCard/UpdateCard'
import axios from 'axios'
import "./UpdateForm.scss";



export default function UpdateForm(props) {
  const history = useHistory()
  const [values, setValues] = useState({})
  const [hasMsg, setHasMsg] = useState(false)
  const [message, setMessage] = useState('')
  const [update, setUpdated] = useState(false)
  const [updateAll, setUpdateAll] = useState(false)
  const [updateOnly, setUpdateOnly] = useState(false)
  const [car, setCar] = useState("")
  const updateAllCar = () => {
    setUpdateAll(true)
    setUpdateOnly(false)
  }

  const updatePartOfCar = () => {
    setUpdateAll(false)
    setUpdateOnly(true)
  }


  useEffect(() => {

    axios.get(`http://localhost:5000/vehicle/${props.location.state.detail._id}`)
    .then(res => setCar(res.data))
    .catch(error => console.log(error))

  }, [])

  const saveAllEdition = (event) => {
    event.preventDefault()
  const { vehicle, brand, year, description} = values
      if (!vehicle || !brand || !year || !description) {
      setHasMsg(true)
      setMessage("É preciso preencher todos os campos")
      return
    }
    if(year < "1979" || year > "2020") {
      setHasMsg(true)
      setMessage("O ano precisa estar compreendido entre 1979 e 2020")
      return
    }

    if (description !== "gasolina" && description !== "alcool" && description !== "flex" && description !== "diesel") {
      setHasMsg(true)
      setMessage("O tipo de combustível não é válido")
      return
    }
    axios.put(`http://localhost:5000/vehicle/${car._id}`, {vehicle, brand, year, description})
    .then(res => {
      setUpdated(true)
      setHasMsg(true)
      setMessage("Atualizado com sucesso")
      setUpdateAll(false)
      setUpdateOnly(false)
      setCar(values)
    })
    .catch(error => console.log(error))
  
}

const saveLittleEdition = (event) => {
  event.preventDefault()
  const { vehicle, brand, year, description} = values
  let data = values
    if (!vehicle && !brand && !year && !description) {
      setHasMsg(true)
      setMessage("Pelo menos um campo precisa ser preenchido")
      return
    }
    if( year !== "" && year < "1979" || year !== "" && year > "2020") {
      setHasMsg(true)
      setMessage("O ano precisa estar compreendido entre 1979 e 2020")
      return
    }

    if (description && description !== "gasolina" && description !== "alcool" && description !== "flex" && description !== "diesel") {
      console.log(data)
      console.log(description)
      setHasMsg(true)
      setMessage("O tipo de combustível não é válido")
      return
    }
    axios.patch(`http://localhost:5000/vehicle/${car._id}`, {year, description, brand, vehicle})
    .then(res => {
      console.log(res)
      setUpdated(true)
      setHasMsg(true)
      setMessage("Atualizado com sucesso")
      setUpdateAll(false)
      setUpdateOnly(false)
      axios.get(`http://localhost:5000/vehicle/${car._id}`)
      .then(res => setCar(res.data))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}



  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setHasMsg(false)
  };
  return (
    <div className="update-container">
      <div>
      <h1>Descrição do veículo</h1>
        {update && hasMsg && <p>{message}</p>}
        <UpdateCard car={car} updateAll={updateAllCar} updateOnly={updatePartOfCar}/>
      </div>
      {
        updateAll &&
      <div>
      <h1>Atualizar todos os campos</h1>
        <form className="form-container" onSubmit={saveAllEdition}>
          {hasMsg && <p>{message}</p>}
          <InputCustomizado label="Veículo" name="vehicle" type="text" onChange={handleChange}/>
          <InputCustomizado label="Marca" name="brand" type="text" onChange={handleChange}/>
          <InputCustomizado label="Ano" name="year" type="text" onChange={handleChange}/>
          <InputCustomizado label="Descrição" name="description" type="text" onChange={handleChange}/>
          <div className="div-button">
          <button  className="edit-button" type="submit">Atualizar</button>
          </div>
        </form>
      </div>
      }
      {updateOnly &&
      <div>

      <h1>Atualizar somente preenchidos</h1>
        {hasMsg && <p>{message}</p>}
        <form className="form-container" onSubmit={saveLittleEdition}>
          <InputCustomizado label="Veículo" name="vehicle" type="text" type="text" onChange={handleChange}/>
          <InputCustomizado label="Marca" name="brand" type="text" type="text" onChange={handleChange} />
          <InputCustomizado label="Ano" name="year"  type="text" onChange={handleChange} />
          <InputCustomizado label="Descrição" name="description" type="text" onChange={handleChange} />
          <div className="div-button">
            <button className="edit-button" type="submit">Atualizar</button>
          </div>
        </form>
      </div>
      }
    </div>
  )
}