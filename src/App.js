import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/poke-style.css';
import Layout from './componentes/reutilizables/layout.js';
 const App = ()=>{
  return(
    <>
      <Layout h_center={true}>
          <div class="row justify-content-center">
            <img responsive alt="Vue logo" src="/assets/logo_pikachu.png" class="ml-5 fluid" style={{width:600+'px'}}/>
          </div>
          <div class="row justify-content-center"> 
            <h3 style={{'text-align':'center'}}>
              Welcome to the pokédex
            </h3>
          </div>
          <div class="row justify-content-center">
            <p class="text-justify text-center">
              The digital encyclopedia created by Professor Oak is an invaluable tool 
              to Trainers in the Pokémon world.
            </p>
            <small>
              Desarrollado por Matìas Ignacio Estay Cubillos para muestra. 
            </small>
          </div>
          <div class="row justify-content-center">
            <a class="poke-btn btn" href="/inicio">Get Started</a>
          </div>
      </Layout>
    </>
  );
}

export default App