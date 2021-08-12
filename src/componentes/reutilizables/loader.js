import React from 'react';
import '../../css/loader.css';

const Loader  = ({ cargando }) => {    
    return (
    <>
        <div class="container-fluid f-screen bg-light loader" style={{display: cargando===true?'':'none'}}>
            <div class="row justify-content-center align-items-center h-100 overflowed">
                <div class="col col-xl-3 col-lg-8 col-md-8 col-sm-5 m-3 text-center" align-v="center">
                    <img class="rotating img-fluid" alt="Poke bola" src='/assets/poke-bola.png'/>
                </div>
            </div>
        </div>
    </>     
    )
}

export default Loader
