import React, {useState, useEffect} from 'react';
import InputCustomizado from '../InputCustomizado/InputCustomizado';
import axios from 'axios'
import "./LoginBox.scss"


export default function LoginBox() {

  const [newUser, setNewUser] = useState(false)
  const [values, setValues] = useState({});
  const [hasMsg, setHasMsg] = useState(false)
  const [message, setMessage] = useState('')


  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setHasMsg(false)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const {email, password, name, passwordConfirmation} = values;
    console.log(email, password)
    if(!newUser) {
      if(!email || !password || email === "" || password === "") {
      setHasMsg(true)
      setMessage("É preciso inserir um email e senha")
      return;
      }
      axios.post(`http://localhost:5000/users/login`, {email, password} )
      .then(res => console.log(res))
      .catch(err => console.log(err))

      return;
    } else {
      if(!email || !password || !passwordConfirmation || !name || email === "" || password === "" || name === "" || passwordConfirmation === "") {
      setHasMsg(true)
      setMessage("É preciso preencher todos os campos")

      return;
    } 
    if(password !== passwordConfirmation) {
      setHasMsg(true)
      setMessage("As senhas cadastradas não coincidem")
      return;
    }
      axios.post(`http://localhost:5000/users`, {email, password, name, passwordConfirmation} )
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
  
  console.log(values)
  return (
    <div className="login-box-container"> 

      {!newUser ? 
        <form onSubmit={handleSubmit}>
      <div>
        <h1>Faça seu Login</h1>
        {hasMsg && <span>{message}</span>}
        <InputCustomizado 
          label="Email"
          type="email"
          name="email"
          onChange={(event) => handleChange(event)}
        />  
        <InputCustomizado 
          label="Senha"
          type="password"
          name="password"
          onChange={(event) => handleChange(event)}
        />  
        <div onClick={() => setNewUser(true)}>
          <span>Ainda não tem uma senha?</span><span>Cadastre-se</span>
        </div>
        </div>
        <button type="submit">Cadastrar</button>
        </form>
        : 
      <form onSubmit={handleSubmit}>
        <div>
      <h1>Faça seu Cadastro</h1>
        {hasMsg && <span>{message}</span>}
        <InputCustomizado 
          label="Digite seu nome"
          type="text"
          name="name"
          onChange={(event) => handleChange(event)}
        />  
        <InputCustomizado 
          label="Digite um email"
          type="email"
          name="email"
          onChange={(event) => handleChange(event)}
        />  
        <InputCustomizado 
          label="Digite sua senha"
          type="password"
          name="password"
          onChange={(event) => handleChange(event)}
        />  
        <InputCustomizado 
          label="Digite sua senha novamente"
          type="password"
          name="passwordConfirmation"
          onChange={(event) => handleChange(event)}
        />
        <div  className="" onClick={() => setNewUser(false)}>
          <span>retornar para Login</span>
        </div>
        </div>
        <button type="submit">Cadastrar</button>
        </form>  
      }
    </div>
  )
}