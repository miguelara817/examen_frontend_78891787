<template>
    <div class="col-md-9 col-lg-12 ">
        <div class="my-4 d-flex justify-content-between">
            <h2>Lista de libros</h2>
            <router-link class="btn btn-success" to="/crearLibro"><i class="fa fa-solid fa-plus"></i> Crear nuevo</router-link>
        </div>
        
        <div class="table-responsive small">
            <table class="table table-hover table-striped table-sm table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Lote</th>
                        <th>Descripción</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody id="libros">
                    <tr v-if="this.cargando">
                        <td colspan="7"><h3>Cargando...</h3></td>
                    </tr>

                    <tr v-else v-for="libro, i in this.libros" :key="libro.id">
                        <td v-text="(++i)"></td>
                        <td v-text="libro.id"></td>
                        <td v-text="libro.titulo"></td>
                        <td v-text="libro.autor_id"></td>
                        <td v-text="libro.lote"></td>
                        <td v-text="libro.description"></td>
                        <td v-text="new Date(libro.created_at).toLocaleString('en-US')"></td>
                        <td>
                            <router-link :to="{path:'editarLibro/'+libro.id}" class="btn btn-warning">
                                <i class="fa fa-solid fa-edit"></i>
                            </router-link>
                            &nbsp;
                            <buttton class="btn btn-danger" v-on:click="eliminar(libro.id, libro.titulo)">
                                <i class="fa fa-solid fa-trash"></i>
                            </buttton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
	import {confirmar} from '../funciones'

    export default{
        data(){
            return{
                libros: null,
                cargando: false
            }
        },
        mounted(){
            this.getLibros();
            this.getAutores();
        },
        methods:{
            getLibros(){
                this.cargando = true;
				axios.get('http://127.0.0.1:8000/api/v1/libros').then(
					res => {
						this.libros = res.data;
						this.cargando = false;
					}
				);
            },
			eliminar(id, libros){
				confirmar('http://127.0.0.1:8000/api/v1/libros/', id, '¿Eliminar registro', 'Realmente desea eliminar a '+ libros+'?');
				this.cargando = false;
			},
            getAutores(){
                axios.get('http://127.0.0.1:8000/api/v1/autores').then(
					res => {
						this.autores = res.data;
						this.cargando = false;
					}
				);
            }
        }
    }

</script>