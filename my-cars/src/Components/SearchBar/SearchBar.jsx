import React, { useState } from 'react';
import InputCustomizado from '../InputCustomizado/InputCustomizado';
import axios from 'axios';
import './SearchBar.scss'

export default function SearchBar(props) {

  const [search, setSearch] = useState("")

  const getVehicleByKeyword = (q) => {
    axios.get(`http://localhost:5000/vehicle/search?vehicle=${q}`)
    .then(res => {
      props.setCars(res.data)
      props.setIsSearch(true)
    })
    .catch(error => console.log(error))
  }

  const handleSearch = (e) => {
        const currentValue = e.currentTarget.value;
        let typingTimer;

        e.currentTarget.onkeyup = (e) => {
            clearTimeout(typingTimer);
            
            if(e.key === "Enter") {
              getVehicleByKeyword(currentValue);
            }
        }
        e.currentTarget.onkeydown = () => {
            clearTimeout(typingTimer);
        }
    }
  return (
    <div className="search-container">
      <InputCustomizado className="search-bar" type="text" placeholder="Pesquisar..." onChange={(e) => handleSearch(e)}/>    </div>
  )
}