import React, { useState } from 'react';
import InputCustomizado from '../InputCustomizado/InputCustomizado'
import axios from 'axios';
import './AddForm.scss'

export default function AddForm() {
  const [values, setValues] = useState({})
  const [hasMsg, setHasMsg] = useState(false)
  const [message, setMessage] = useState('')
  const [added, setAdded] = useState(false)

  // pega os dados do input
  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setHasMsg(false)
  };

  const addMore = () => {
    setAdded(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const {vehicle, brand, year, description} = values
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
    axios.post(`http://localhost:5000/vehicle`, {vehicle, brand, year, description})
    .then(res => {
      console.log(res)
      setAdded(true)
    })
    .catch(error => console.log(error))
  }
  return (
    <div className="add-container">
      {!added ?
      <form onSubmit={handleSubmit}>
      <h1>Adicione um veículo a coleção</h1>

        {hasMsg && <p>{message}</p>}
        <InputCustomizado type="text" name="vehicle" label="Veículo" onChange={(e) => handleChange(e)}/>
        <InputCustomizado type="text" name="brand" label="Marca" onChange={(e) => handleChange(e)}/>
        <InputCustomizado type="text" name="year" label="Ano (1979 a 2020)" onChange={(e) => handleChange(e)}/>
        <InputCustomizado type="text" name="description" label="Combustível  (gasolina, alcool, diesel ou flex?)" onChange={(e) => handleChange(e)}/>
      <div className="button-div">
        <button type="submit">Salvar</button>
      </div>  
      </form>
      :
      <>
      <p>Veículo adicionado com sucesso</p>
      <div className="button-div">
        <button className="more-add" type="button" onClick={addMore}>Adicionar mais um veículo</button>
      </div>
      </>
      }
    </div>
  )
}