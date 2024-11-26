//<a href="/listausuario" className="usuario">ListaUsuário</a> 
// npm install styled-components react-router-dom
import './header.css';
import { Link } from 'react-router-dom';
import useAuth from '../../services/useAuth'; // Certifique-se de que o caminho está correto

function Header() {
    const { isAuthenticated } = useAuth(); // Verifica se o usuário está autenticado

    return (
        <>
            <header>
                <img src="../images/logo.jpeg" alt="Logo PowerFlex" id='logoimg' />
                <Link to="/" className="logo">PowerFlex</Link>
                <nav className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <span className="separator">|</span>
                    {isAuthenticated && (
                        <>
                            <Link to="/agenda" className="nav-item">Agenda</Link>
                            <span className="separator">|</span>
                            <Link to="/aluno" className="nav-item">Aluno</Link>
                            <span className="separator">|</span>
                        </>
                    )}
                    <Link to="/login" className="nav-item">Login</Link>
                </nav>
            </header>
        </>
    );
}

export default Header;