import { useContext } from "react"
import { Link } from "react-router-dom"
import avatarImg from '../../assets/avatar.png'
import './index.css'
import { AuthContext } from "../../contexts/auth";
import { FiHome, FiSettings, FiUser } from 'react-icons/fi'
import { AiOutlinePoweroff } from "react-icons/ai";


export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);

    async function handleLogOut() {
        await logout();
    }

    return (
        <>
            <div className="sidebar">
                <div>
                    <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="" />
                </div>


                <Link to="/dashboard">
                    <FiHome color="#FFF" size={24} />
                    Chamados
                </Link>
                <Link to="/customers">
                    <FiUser color="#FFF" size={24} />
                    Clientes
                </Link>
                <Link to="/profile">
                    <FiSettings color="#FFF" size={24} />
                    Perfil
                </Link>

                <Link to="/">
                    <button onClick={handleLogOut}><AiOutlinePoweroff color="#FFF" size={24} /></button>
                    Sair
                </Link>


            </div>

        </>
    )
}