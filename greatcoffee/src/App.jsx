import React, { useState } from 'react'
import './App.css'
import { CallToAction } from './components/CallToAction';
import { Header } from './components/Header';
import { DeviceContext } from './context/service';


function App() {

  const isMobile = React.useContext(DeviceContext);


  return (
    <>
      {
        isMobile.isMobile ?
          <>
            <Header />
            <main>
              <p>O café que fará seu código decolar para o próximo nível.</p>
              <CallToAction text={'Pegar meu café'} />
              <h1 className='title-main'>Great Coffee</h1>
              <h1 className='subtitle-main'> &lt; Great Code /&gt; </h1>
              <img src="../../assets/rocket-coffee.png" alt="Imagem Café" />
            </main>
          </>
          :

          <>
            <Header />
            <main>
              <h1>Great Coffee</h1>
              <h1> &lt; Great Code /&gt; </h1>
              <img src="../../assets/rocket-coffee.png" alt="Imagem Café" />
            </main>
          </>


      }

    </>
  )
}

export default App
