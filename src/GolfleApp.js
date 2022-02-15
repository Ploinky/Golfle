import React from 'react';
import Golfle from './Golfle'
import HowTo from './HowTo'
import styles from './GolfleApp.module.scss'
import {Route, Routes} from 'react-router-dom'

// Main app
function GolfleApp() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
       <a href="/"><h1>Golfle</h1></a>
       <a href="/how-to"><h4>How to</h4></a>
      </header>
      <Routes>
        <Route  exact path="/" element={<Golfle/>}/>
        <Route exact path="/how-to" element={<HowTo/>}/>
      </Routes>
    </div>
  )
}

export default GolfleApp;