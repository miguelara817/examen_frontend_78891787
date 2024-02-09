<template>
    <div class="col-md-9 col-lg-12 ">
        <div class="my-4 d-flex justify-content-between">
            <h2>Lista de clientes</h2>
            <router-link class="btn btn-success" to="/crearCliente"><i class="fa fa-solid fa-plus"></i> Crear nuevo</router-link>
        </div>
        
        <div class="table-responsive small">
            <table class="table table-hover table-striped table-sm table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre y Apellido</th>
                        <th>Correo electrónico</th>
                        <th>Celular</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody id="clientes">
                    <tr v-if="this.cargando">
                        <td colspan="6"><h3>Cargando...</h3></td>
                    </tr>

                    <tr v-else v-for="cliente, i in this.clientes" :key="cliente.id">
                        <td v-text="(++i)"></td>
                        <td v-text="cliente.id"></td>
                        <td v-text="cliente.name"></td>
                        <td v-text="cliente.email"></td>
                        <td v-text="cliente.celular"></td>
                        <td v-text="new Date(cliente.created_at).toLocaleString('en-US')"></td>
                        <td>
                            <router-link :to="{path:'editarCliente/'+cliente.id}" class="btn btn-warning">
                                <i class="fa fa-solid fa-edit"></i>
                            </router-link>
                            &nbsp;
                            <buttton class="btn btn-danger" v-on:click="eliminar(cliente.id, cliente.name)">
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
                clientes: null,
                cargando: false
            }
        },
        mounted(){
            this.getClientes();
        },
        methods:{
            getClientes(){
                this.cargando = true;
				axios.get('http://127.0.0.1:8000/api/v1/clientes').then(
					res => {
						this.clientes = res.data;
						this.cargando = false;
					}
				);
            },
			eliminar(id, cliente){
				confirmar('http://127.0.0.1:8000/api/v1/clientes/', id, '¿Eliminar registro', 'Realmente desea eliminar a '+ cliente+'?');
				this.cargando = false;
			}
        }
    }

</script>