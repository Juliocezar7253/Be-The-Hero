import React, {useState} from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function NewIncident(){

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewmIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{ 
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                },
            });
            alert('Caso cadastrado com sucesso!');
            history.push('/profile');
        } catch(error){
            alert('Erro ao cadastar o caso, tente novamente!');
        }

    }

    return(
      <div className="new-incident-container">
          <div className="content">
              <section>
                  <img src={LogoImg} alt="Be The Hero" />

                  <h1>Cadastrar Novo Caso</h1>
                  <p>Descreva o caso detalhadamente para encontrar o seu herói para resolver isso</p>  
               <Link className="back-link" to="/profile">
                   <FiArrowLeft size={16} color="#E02041" />
                   Voltar para Casos
               </Link>
              </section>

            <form onSubmit={handleNewmIncident}>
                <input placeholder="Título do Caso" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea placeholder="Descrição" 
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input placeholder="Valor em Reais" 
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                <button className="button">Cadastrar</button>
            </form>

          </div>
      </div>
    );
}