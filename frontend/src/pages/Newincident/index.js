import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const history = useHistory();
    const ongID = localStorage.getItem('ongID');
    async function handleNewIncident(e){
        e.preventDefault();
        const data={
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {
                headers:{
                    authorization: ongID,
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar novo caso');
        }
    }
    
    
    return(
        <div className="newincident-container">
           <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro Novo caso</h1>
                    <p>Faça seu cadastro, novos casos.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft  size={16} color='#e02041'/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input  
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                    />
                    <input  
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                    />
                    <button className="button">Cadastrar</button>
                </form>
            </div> 
        </div>
    );
}