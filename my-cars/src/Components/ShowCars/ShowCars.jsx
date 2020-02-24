import React, {useState, useEffect, useLayoutEffect} from 'react';
import axios from 'axios';
import CarCard from './carsCard/CarsCard';
import SearchBar from '../SearchBar/SearchBar'
import {useHistory} from 'react-router-dom'
import "./ShowCars.scss"

export default function ShowCars() {
  const pageSize = 9;
  const [cars, setCars] = useState([]);
  const history = useHistory()
        
  const [nPaginas, setNPaginas] = useState(1);
  const [index, setIndex] = useState(0);
  const [slicedData, setSlicedData] = useState([]);
  const [isSearch, setIsSearch] = useState(false)

  const addWay = () => {
     history.push("/addCar")
  }

  const changeOffset = i => {
    if (i >= 0 && i < nPaginas) {
      setIndex(i);
      const startIndex = i * pageSize;
      const endIndex = pageSize + startIndex;
      const slicedData = cars.slice(startIndex, endIndex);
      setSlicedData(slicedData);
      console.log(slicedData);
    }
  };
  console.log(isSearch, cars)

  if(isSearch) {
      const npaginas = Math.ceil(cars.length / pageSize);
      setNPaginas(Math.round(npaginas));

      const slicedData = cars.slice(index * pageSize, pageSize);
      setSlicedData(slicedData); 
      setIsSearch(false)
  }


  useEffect(() => {
    axios.get(`http://localhost:5000/vehicle`)
    .then(res => {
      setCars(res.data)
      const npaginas = Math.ceil(res.data.length / pageSize);
            setNPaginas(Math.round(npaginas));

      const slicedData = res.data.slice(index * pageSize, pageSize);
      setSlicedData(slicedData);
    })
    .catch(erro => console.log(erro))
  }, [])

  const paginaArr = [...Array(nPaginas)].map((v, i) => i + 1);
  return (
    <div className="cars-container">
   <SearchBar setIsSearch={setIsSearch} setCars={setCars}/>
    <h1>Navegue e veja as diferentes opções de veículos</h1>
      <button onClick={addWay} className="add-button">Adicionar novo veículo</button>
      <div className="car-cards-container">
        {slicedData.map(car => {
          return <CarCard car={car}/>
        })}
      </div>   

      <div className="pagination-account">
                  <a
                     onClick={() => changeOffset(index - 1)}
                     className="previous"
                     disabled={index == 0}
                  >
                     Anterior
                     </a>
                  {paginaArr.length > 0 && (
                     <ul class="pagination-list">
                        {paginaArr
                           .slice(
                              index > 5 ? index - 5 : 0,
                              index > 5 ? index + 5 : 10
                           )
                           .map((v, i) => (
                              <li>
                                 <a
                                    onClick={() => changeOffset(v - 1)}
                                 >
                                    {v}
                                 </a>
                              </li>
                           ))}
                           <li>
                              <a
                                 onClick={() => changeOffset(paginaArr.length - 1)}
                              >
                              </a>
                           </li>
                     </ul>
                  )}

                  <a
                     onClick={() => changeOffset(index + 1)}
                     className="next"
                     disabled={index == nPaginas - 1}
                  >
                     Próxima
              </a>
            </div>   
    </div>
  )
}

