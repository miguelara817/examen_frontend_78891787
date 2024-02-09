<template>
    <div class="col-md-9 col-lg-12 ">
        <div class="my-4 d-flex justify-content-between">
            <h2>Lista de préstamos</h2>
            <router-link class="btn btn-success" to="/registrarPrestamo"><i class="fa fa-solid fa-plus"></i> Crear nuevo</router-link>
        </div>
        
        <div class="table-responsive small">
            <table class="table table-hover table-striped table-sm table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Libro</th>
                        <th>Cliente</th>
                        <th>Fecha de préstamo</th>
                        <th>Días de préstamo</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody id="prestamos">
                    <tr v-if="this.cargando">
                        <td colspan="7"><h3>Cargando...</h3></td>
                    </tr>

                    <tr v-else v-for="prestamo, i in this.prestamos" :key="prestamo.id">
                        <td v-text="(++i)"></td>
                        <td v-text="prestamo.id"></td>
                        <td v-text="prestamo.libro_id"></td>
                        <td v-text="prestamo.cliente_id"></td>
                        <td v-text="new Date(prestamo.fecha_prestamo).toLocaleString('en-US')"></td>
                        <!-- <td v-text="prestamo.fecha_prestamo"></td> -->
                        <td v-text="prestamo.dias_prestamo"></td>
                        <td v-text="prestamo.estado"></td>
                        <td>
                            <router-link :to="{path:'registrarDevolucion/'+prestamo.id}" class="btn btn-warning">
                                <i class="fa fa-solid fa-edit"></i>
                            </router-link>
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
                prestamos: null,
                cargando: false
            }
        },
        mounted(){
            this.getPrestamos();
        },
        methods:{
            getPrestamos(){
                this.cargando = true;
				axios.get('http://127.0.0.1:8000/api/v1/prestamos').then(
					res => {
						this.prestamos = res.data;
						this.cargando = false;
					}
				);
            }
        }
    }

</script>