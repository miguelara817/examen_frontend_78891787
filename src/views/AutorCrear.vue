<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Crear un nuevo Autor
                </div>
                <div class="card-body">
                    <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="text" v-model="name" id="name" placeholder="Ingrese el nombre del autor" required maxlength="50" class="form-control">
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
	import {alerta, enviarSolicitud} from '../funciones'

    export default{
        data(){
            return{
                name: '',
                url: 'http://127.0.0.1:8000/api/v1/autores',
                cargando: false
            }
        },
        methods:{
            guardar(){
                event.preventDefault();
                if (this.name.trim() === '') {
                    alerta('Ingrese un nombre', 'warning', 'name')
                }else {
                    let parametros = {name: this.name.trim()}
                    enviarSolicitud('POST', parametros, this.url, 'Autor registrado')
                }
            }
        }
    }

</script>