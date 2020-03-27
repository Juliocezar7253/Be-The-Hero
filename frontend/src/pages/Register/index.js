import React, { useState } from 'react'; // Importando o React
import { Link, useHistory } from 'react-router-dom'; // importando a função de Link
import api from '../../services/api'; // importante a biblioteca api para trabalhar com o banck-end

import { FiArrowLeft } from 'react-icons/fi' // Importando o ícone de Flecha para esquerda
import './styles.css' // Importando o arquivo styles css
import LogoImg from '../../assets/logo.svg'; // Importando a imagem da Logo para utilizar no projeto

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (error){
      alert('Erro ao cadastrar, tente novamente.')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />

          <h1> Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos de sua ONG.</p>
          
          <Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar
					</Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email" placeholder="E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="Whatsapp" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)} 
            />
            <input placeholder="UF" style={{ width: 80 }} 
              value={uf}
              onChange={e => setUf(e.target.value)}/>
          </div>

          <button className="button">Cadastrar</button>
        </form>
      </div>      
    </div>
  );
}