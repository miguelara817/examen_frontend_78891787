<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Modificar autor
                </div>
                <div class="card-body">
                    <form v-on:submit="modificar">
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
	import {alerta, enviarSolicitud} from '../funciones';
    import { useRoute } from 'vue-router';
    import axios from 'axios';

    export default{
        data(){
            return{
                id: 0,
                name: '',
                url: 'http://127.0.0.1:8000/api/v1/autores',
                cargando: false
            }
        },
        mounted(){
            const route = useRoute();
            this.id = route.params.id;
            this.url += '/'+this.id;
            this.getAutor();
        },
        methods:{
            getAutor(){
                axios.get(this.url).then(
                    res=>{
                        this.name = res.data.name;
                    }
                );
            },
            modificar(){
                event.preventDefault();
                if (this.name.trim() === '') {
                    alerta('Ingrese un nombre', 'warning', 'name')
                }else {
                    let parametros = {name: this.name.trim()}
                    enviarSolicitud('PUT', parametros, this.url, 'Autor modificado')
                }
            }
        }
    }

</script>