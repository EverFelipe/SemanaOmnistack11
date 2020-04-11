import React, {useState,useEffect} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'; 
import api from '../../services/api';

export default function Profile(){
    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');
    const [incidents,setIncidents] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        api.get('profile', {
            headers: {
                authorization: ongID,
            }
        }).then(response=>{
            setIncidents(response.data);
            console.log(response.data);
        })
    },[ongID]);
    async function handleDeleteIncidents(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    authorization: ongID,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao tentar deletar o Caso')
        }
    }


    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem, {ongName}</span>
                <Link className="button" to="incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>handleDeleteIncidents(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8a3" />
                    </button>
                </li>
                ))}
            </ul>

        </div>
    );
}