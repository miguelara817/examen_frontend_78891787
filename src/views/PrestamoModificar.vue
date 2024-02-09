<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Modificar préstamo
                </div>
                <div class="card-body">
                    <form v-on:submit="modificar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-book"></i></span>
                            <select v-model="libro_id" id="libro_id" required class="form-control">
                                <option v-for="libro in libros" :key="libro.id" :value="libro.id">{{ libro.titulo }}</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <select v-model="cliente_id" id="cliente_id" required class="form-control">
                                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.name }}</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-calendar-days"></i></span>
                            <input type="date" v-model="fecha_prestamo" id="fecha_prestamo" required class="form-control">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-sun"></i></span>
                            <input type="text" v-model="dias_prestamo" id="dias_prestamo" placeholder="ingrese la cantidad de días de prestamo" required maxlength="50" class="form-control">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-check"></i></span>
                            <input type="text" v-model="estado" id="estado" placeholder="" required maxlength="50" class="form-control">
                        </div>
                        <div class="d-grid col-6 mx-auto mb-3">
                            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {alerta, enviarSolicitud} from '../funciones';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    export default{
        data(){
            return{
                id:0,
                libro_id: '',
                cliente_id: '',
                fecha_prestamo: '',
                dias_prestamo: '',
                estado: '',
                url: 'http://127.0.0.1:8000/api/v1/prestamos',
                libros: null,
                clientes: null,
                cargando: false
            }
        },
        mounted() {
            this.getLibros();
            this.getClientes();
            const route = useRoute();
            this.id = route.params.id;
            this.url += '/'+this.id;
            this.getPrestamo();
        },
        methods:{
            modificar(){
                event.preventDefault();
                if (this.libro_id === '') {
                    alerta('Seleccione un libro', 'warning', 'libro_id')
                } else if(this.cliente_id === ''){
                    alerta('Seleccione al cliente', 'warning', 'cliente_id')
                } else if(this.fecha_prestamo === ''){
                    alerta('Ingrese una fecha de inicio de préstamo', 'warning', 'fecha_prestamo')
                } else if(this.dias_prestamo.trim() === ''){
                    alerta('Ingrese los días de préstamo', 'warning', 'dias_prestamo')
                } else if(this.estado.trim() === ''){
                    alerta('Ingrese el estado de préstamo', 'warning', 'estado')
                } else {
                    let parametros = {
                        libro_id: this.libro_id,
                        cliente_id: this.cliente_id,
                        fecha_prestamo: this.fecha_prestamo,
                        dias_prestamo: this.dias_prestamo,
                        estado: this.estado
                    }
                    
                    enviarSolicitud('PUT', parametros, this.url, 'Prestamo modificado')
                }
            },
            getPrestamo(){
                axios.get(this.url).then(
                    res => {
                        this.libro_id = res.data.libro_id;
                        this.cliente_id = res.data.cliente_id;
                        this.fecha_prestamo = res.data.fecha_prestamo;
                        this.dias_prestamo = res.data.dias_prestamo;
                        this.estado = res.data.estado;
                        this.cargando = false;
                    }
                );
            },
            getLibros(){
                axios.get('http://127.0.0.1:8000/api/v1/libros').then(
					res => {
						this.libros = res.data;
						this.cargando = false;
					}
				);
            },
            getClientes(){
                axios.get('http://127.0.0.1:8000/api/v1/clientes').then(
					res => {
						this.clientes = res.data;
						this.cargando = false;
					}
				);
            }
        }
    }

</script>