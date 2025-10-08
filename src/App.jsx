import { useState } from 'react'
import Mapa from './components/map/index.jsx'
import './App.css'
import { loader } from './utils/loader.jsx'

function App() {
  loader.hide();
  return (
    <>
      <div>
          <Mapa/>
      </div>
      
    </>
  )
}

export default App
