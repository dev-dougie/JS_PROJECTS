import React from 'react';
import './style.css'
import { CallToAction } from '../CallToAction';
import { DeviceContext } from '../../context/service';
import { useState } from 'react';

export const Header = () => {
    const isMobile = React.useContext(DeviceContext);
    const [showMenu, setShowMenu] = useState(false);


    return (
        <>
            {isMobile.isMobile ?
                <>
                    <header>
                        <div className='logo'>
                            <img src="../../../assets/logo-mobile.svg" alt="Menu" />
                        </div>
                        <button className='hamburguer' onClick={() => showMenu == false ? setShowMenu(true) : setShowMenu(false)}>
                            <img src={showMenu ? "../../../assets/menu-buguer-close.svg" : "../../../assets/menu-buguer-open.svg"} alt="Menu" />
                        </button>
                    </header>
                    <nav className={showMenu ? 'mobile-menu-container' : 'hidden'}>
                        <ul className='menu-navigator'>
                            <li className='menu-item'><a href="#">Home</a></li>
                            <li className='menu-item'><a href="#">Menu</a></li>
                            <li className='menu-item'><a href="#">Recompensas</a></li>
                            <li className='menu-item'><a href="#">Gift Cards</a></li>
                            <li className='menu-item'><a href="#">Lojas</a></li>
                        </ul>
                    </nav>
                </> :
                <>
                    <header>
                        <div className='logo'>
                            <img src="../../../assets/logo-desktop.svg" alt="Logo Rocketseat" />
                        </div>
                        <nav>
                            <ul className='menu-navigator'>
                                <li className='menu-item'><a href="#">Home</a></li>
                                <li className='menu-item'><a href="#">Menu</a></li>
                                <li className='menu-item'><a href="#">Recompensas</a></li>
                                <li className='menu-item'><a href="#">Gift Cards</a></li>
                                <li className='menu-item'><a href="#">Lojas</a></li>
                            </ul>
                        </nav>
                        <CallToAction text="PEGAR MEU CAFÉ" />
                    </header>
                </>}

        </>
    )
}