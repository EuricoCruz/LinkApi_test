import React from 'react';
import LoginBox from  "../LoginBox/LoginBox"; 
import './Home.scss'
export default function Home() {
  return (
    <div className="home-container">
      <div>
        <h1 className="main-title">Bem-vindo ao MyCars-API</h1>
      </div>
      <div className="info-container">
        <div className="info-div">
          <p className="info-page">Aqui você pode encontrar diversos carros da tabela Fipe,</p>
          <p className="info-page">alterar, editar e manter apenas os veículos que você gosta</p>
          <p className="info-page">Faça seu login ou cadastre-se e faça parte do grupo</p>
          <p className="info-page">de pessoas apaixonadas por veículos</p>
        </div>
      <LoginBox />
      </div>
    </div>
  )
}