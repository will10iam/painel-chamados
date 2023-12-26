import { useState, useContext } from "react"
import logo from '../../assets/logo.png'
import './signin.css'
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await signIn(email, password);
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo Claudia" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input
                        text="email"
                        placeholder="insira seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        password="password"
                        placeholder="insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>



                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}