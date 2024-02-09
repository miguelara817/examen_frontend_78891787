<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Crear nuevo cliente
                </div>
                <div class="card-body">
                    <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-book"></i></span>
                            <input type="text" v-model="name" id="name" placeholder="Ingrese el nombre del cliente" required maxlength="50" class="form-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-box"></i></span>
                            <input type="text" v-model="email" id="email" placeholder="Ingrese correo electrónico del cliente" required maxlength="50" class="form-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-box"></i></span>
                            <input type="text" v-model="celular" id="celular" placeholder="Ingrese el celular del cliente" required maxlength="50" class="form-control">
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

    export default{
        data(){
            return{
                name: '',
                email: '',
                celular: '',
                url: 'http://127.0.0.1:8000/api/v1/clientes',
                cargando: false
            }
        },
        methods:{
            guardar(){
                event.preventDefault();
                if (this.name.trim() === '') {
                    alerta('Escriba el nombre del cliente', 'warning', 'name')
                } else if(this.email.trim() === ''){
                    alerta('Escriba el correo electrónico del cliente', 'warning', 'email')
                } else if(this.celular.trim() === ''){
                    alerta('Escriba el celular del cliente', 'warning', 'celular')
                } else {
                    let parametros = {
                        name: this.name.trim(),
                        email: this.email.trim(),
                        celular: this.celular.trim()
                    }
                    enviarSolicitud('POST', parametros, this.url, 'Cliente registrado')
                }
            }
        }
    }

</script>