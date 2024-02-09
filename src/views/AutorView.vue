<template>
    <div class="col-md-9 col-lg-12 ">
        <div class="my-4 d-flex justify-content-between">
            <h2>Lista de autores</h2>
            <router-link class="btn btn-success" :to="{path: 'crearAutor/'}" tag="button"><i class="fa fa-solid fa-plus"></i> Crear nuevo</router-link>
        </div>
        
        <div class="table-responsive small">
            <table class="table table-hover table-striped table-sm table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre y Apellido</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody id="autores">
                    <tr v-if="this.cargando">
                        <td colspan="4"><h3>Cargando...</h3></td>
                    </tr>

                    <tr v-else v-for="autor, i in this.autores" :key="autor.id">
                        <td v-text="(++i)"></td>
                        <td v-text="autor.id"></td>
                        <td v-text="autor.name"></td>
                        <td v-text="new Date(autor.created_at).toLocaleString('en-US')"></td>
                        <td>
                            <router-link :to="{path:'editarAutor/'+autor.id}" class="btn btn-warning">
                                <i class="fa fa-solid fa-edit"></i>
                            </router-link>
                            &nbsp;
                            <buttton class="btn btn-danger" v-on:click="eliminar(autor.id, autor.name)">
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
                autores: null,
                cargando: false
            }
        },
        mounted(){
            this.getAutores();
        },
        methods:{
            getAutores(){
                this.cargando = true;
				axios.get('http://127.0.0.1:8000/api/v1/autores').then(
					res => {
						this.autores = res.data;
						this.cargando = false;
					}
				);
            },
			eliminar(id, nombre){
				confirmar('http://127.0.0.1:8000/api/v1/autores/', id, '¿Eliminar registro', 'Realmente desea eliminar a '+ nombre+'?');
				this.cargando = false;
			}
        }
    }

</script>