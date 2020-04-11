import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
export default function Logon(){
    const [id, setID] = useState('');
    const history = useHistory(); //navegação atraves de uma função javascript
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongID',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile');

        }catch(err){
            alert("Falha no Login");
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={ e =>setID(e.target.value)}
                    />
                    <button type="submit" className="button" onClick={handleLogin}>Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn  size={16} color='#e02041'/>
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroImg} alt="heros"/>
        </div>
    );
}