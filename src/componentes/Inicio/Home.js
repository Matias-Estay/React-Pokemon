import React, { Component } from 'react';
import Layout from '../reutilizables/layout.js';
import Loader from '../reutilizables/loader.js';
import {BsSearch, BsXCircle, BsFillStarFill,BsList} from 'react-icons/bs'
import { InputGroup, FormControl, Modal} from 'react-bootstrap';
import axios from 'axios';
export default class Home extends Component {
    state ={
        cargando:false,
        busqueda: '',
        fav:false,
        abrir_modal:false,
        pokemones:[],
        pokemon:[],
    }

    componentDidMount(){
        this.setState({cargando:true});
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=255',{}).then((resultado)=>{
            for(var i =0;i<resultado.data.results.length;i++){
                resultado.data.results[i].name=resultado.data.results[i].name.charAt(0).toUpperCase() + resultado.data.results[i].name.slice(1)
                resultado.data.results[i]['favorite']=false;
            }
            this.setState({pokemones:[...resultado.data.results]})
            this.setState({cargando:false});
            this.setState({abrir_modal:false});
        });
    }

    filtro_pokemones_todos(){
        var resultado=[];
        if(this.state.busqueda!==''){
            resultado = this.state.pokemones.filter(item => {
                return (
                    item.name
                    .toLowerCase()
                    .indexOf(this.state.busqueda.toLowerCase()) > -1
                );
            });
        }else{
            resultado = this.state.pokemones;
        }
        return resultado;
    }
    filtro_pokemones_favoritos(){
        var resultado = this.state.pokemones.filter(item => {
            return (
            item.name
                .toLowerCase()
                .indexOf(this.state.busqueda.toLowerCase()) > -1 && 
            item.favorite === true
            );
        });
        return resultado;
    }
    Setbusqueda(e){
        this.setState({busqueda: e.target.value});
    }

    Cargar_datos(item){
        this.setState({cargando:true});
        axios.get(item.url,{}).then((resultado)=>{
            resultado.data.name = resultado.data.name.charAt(0).toUpperCase() + resultado.data.name.slice(1)
            this.setState({pokemon:resultado.data});
            this.setState({cargando:false});
            this.setState({abrir_modal:true});
        });
    }

    Cerrar_modal(){
        this.setState({abrir_modal:false});
    }

    Copy_clipboard(){
    
    }

    Favorito(item){
        var index = this.filtro_pokemones_todos().findIndex(x=>x.name === item.name);
        let aux= this.state.pokemones;
        aux[index].favorite=!aux[index].favorite;
        this.setState({pokemones:aux});
    }

    render() {
        return (
        <Layout h_center={false}>
            <Loader cargando={this.state.cargando}/>
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <InputGroup className="bg-white border-right-0 mb-3">
                                <InputGroup.Text id="basic-addon1" style={{background:'none', }}>
                                    <span class="input-group-text p-0" style={{background:'none', border:'none'}}>
                                        <BsSearch/>
                                    </span>
                                </InputGroup.Text>
                            <FormControl
                                onChange={this.Setbusqueda.bind(this)}
                                placeholder="Búsqueda"
                            />
                        </InputGroup>
                    </div>
                    {
                        (this.state.fav?this.filtro_pokemones_favoritos().length!==0:this.filtro_pokemones_todos().length!==0)?
                        <div class="row justify-content-center mt-3">
                            {(this.state.fav===false?this.filtro_pokemones_todos():this.filtro_pokemones_favoritos()).map((item, index) => {
                                return (                           
                                <div class="row w-100 justify-content-center" key={index}>
                                    <div class="container-fluid bg-white shadow-sm mb-2 p-2 w-100">
                                        <div class="row">
                                            <div cols="8" class="col pointer" align-v="center" style={{alignSelf: 'center'}} onClick={(e)=>{this.Cargar_datos(item)}}>
                                                {item.name}
                                            </div>
                                            <div class="col col-4">
                                                <button class="favorito shadow-sm btn btn-light" onClick={()=>{this.Favorito(item)}}>
                                                    <BsFillStarFill color={(this.filtro_pokemones_favoritos().filter(poke => poke.name === item.name).length>0)?'orange':'grey'}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                            );
                            })}
                        </div>
                        :
                        <div class="row justify-content-center mt-3">
                            <div class="col col-12">
                                <div class="container-fluid">
                                    <div class="row justify-content-center">
                                        <h4>Uh-Oh!</h4>
                                    </div>
                                    <div class="row justify-content-center">
                                        looks like you lost your way
                                    </div>
                                    <div class="row justify-content-center">
                                        <a class="poke-btn btn" href="/">
                                        Go back Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <Modal
                        show={this.state.abrir_modal}
                        onClose={this.Cerrar_modal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                            <Modal.Body>
                            <div class="container-fluid">
                                <div class="row align-items-center card">
                                    <img alt="Banner" class="position-relative w-100 h-100 img-fluid" style={{top: 0,left: 0}} src="/assets/banner.png"/>
                                    <div align-self="center" class="col h-100 w-100 position-absolute" align-v="center" style={{textAlign:'center'}}>
                                        <img alt="Sprite" class="img-fluid rounded-circle h-100 mt-2" src={this.state.pokemon.sprites!==undefined?this.state.pokemon.sprites.front_default:''}/>
                                    </div>
                                    <div align-self="end" class="col h-100 w-100 position-absolute" align-v="top" style={{textAlign:'right'}}>
                                        <button class="translucid mt-2" onClick={()=>{this.Cerrar_modal()}}>
                                            <BsXCircle style={{background:'none'}}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="container-fluid">
                                <div class="row align-items-center m-3">
                                    <h5>
                                        Name: {this.state.pokemon.name}
                                    </h5>
                                </div>
                                    <hr/>
                                <div class="row align-items-center m-3">
                                    <h5>
                                        Weight: {this.state.pokemon.weight}
                                    </h5>
                                </div>
                                    <hr/>
                                <div class="row align-items-center m-3">
                                    <h5>
                                        Height: {this.state.pokemon.height}
                                    </h5>
                                </div>
                                    <hr/>
                                <div class="row align-items-center m-3">
                                    <h5>
                                    Types: {this.state.pokemon.types!=undefined? this.state.pokemon.types[0].type.name + (this.state.pokemon.types[1]!=undefined?", "+this.state.pokemon.types[1].type.name:''):''}
                                    </h5>
                                </div>
                                <hr/>
                                <div class="container-fluid h-100">
                                    <div class="row justify-content-center align-items-center h-100 p-1" align-h="between">  
                                        <div class="col col-xl-10  col-lg-10 col-md-10 col-sm-10" align-v="center">
                                            <button class="poke-btn" onClick={()=>{this.Copy_clipboard()}}>
                                                Share with my friends
                                            </button>
                                        </div>
                                        <button class="favorito shadow-sm btn btn-light" onClick={()=>{this.Favorito(this.state.pokemon)}}>
                                            <BsFillStarFill color={(this.filtro_pokemones_favoritos().filter(poke => poke.name === this.state.pokemon.name).length>0)?'orange':'grey'}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={()=>{this.Cerrar_modal()}}>Close</button>
                            </Modal.Footer>
                        </Modal>
                </div>
                <footer class="footer">
                    <div class="container-fluid h-100">
                    <div class="row justify-content-center align-items-center h-100">  
                        <div class="col col-xl-2 col-sm-6" align-v="center">
                            <button class={this.state.fav===false?'poke-btn p-1 w-100':'poke-btn-deactive p-1 w-100'} onClick={()=>{this.setState({fav:!this.state.fav})}}>
                                <BsList/>
                                All
                            </button>
                        </div>
                        <div class="col col-xl-2 col-sm-6" align-v="center">
                            <button class={this.state.fav===true?'poke-btn p-1 w-100':'poke-btn-deactive p-1 w-100'} onClick={()=>{this.setState({fav:!this.state.fav})}}>
                                <BsFillStarFill/>
                                Favorites
                            </button>
                        </div>
                    </div>
                    </div>
                </footer>
        </Layout>
        );
    }
}