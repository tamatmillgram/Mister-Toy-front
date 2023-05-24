import { Link, NavLink } from 'react-router-dom'
import LogoImg from '../assets/img/logo.png'


export default function AppHeader() {
    return (
        <header className="app-header">
         <Link className="logo" to="/"><img src={LogoImg} alt="" /></Link>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}