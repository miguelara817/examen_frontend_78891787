<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Modificar libro
                </div>
                <div class="card-body">
                    <form v-on:submit="modificar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-book"></i></span>
                            <input type="text" v-model="titulo" id="titulo" placeholder="Ingrese el titulo del libro" required maxlength="100" class="form-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <select v-model="autor_id" id="autor_id" required class="form-control">
                                <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.name }}</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-box"></i></span>
                            <input type="text" v-model="lote" id="lote" placeholder="Ingrese el lote" required maxlength="10" class="form-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-font"></i></span>
                            <textarea v-model="description" name="description" id="description" cols="30" rows="10" placeholder="Escriba la descripción del libro" required maxlength="200" class="form-control"></textarea>
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
                titulo: '',
                autor_id: '',
                lote: '',
                description: '',
                autores: null,
                url: 'http://127.0.0.1:8000/api/v1/libros',
                cargando: false
            }
        },
        mounted() {
            this.getAutores();
            const route = useRoute();
            this.id = route.params.id;
            this.url += '/'+this.id;
            this.getLibro();
        },
        methods:{
            modificar(){
                event.preventDefault();
                if (this.titulo.trim() === '') {
                    alerta('Escriba el titutlo', 'warning', 'titulo')
                } else if(this.autor_id === ''){
                    alerta('Seleccione un autor', 'warning', 'titulo')
                } else if(this.lote.trim() === ''){
                    alerta('Ingrese el lote', 'warning', 'titulo')
                } else if(this.description.trim() === ''){
                    alerta('Escriba la descripción del libro', 'warning', 'titulo')
                } else {
                    let parametros = {
                        titulo: this.titulo.trim(),
                        autor_id: this.autor_id,
                        lote: this.lote.trim(),
                        description: this.description.trim()
                    }
                    enviarSolicitud('PUT', parametros, this.url, 'Libro modificado')
                }
            },
            getAutores(){
                axios.get('http://127.0.0.1:8000/api/v1/autores').then(
					res => {
						this.autores = res.data;
						this.cargando = false;
					}
				);
            },
            getLibro(){
                axios.get(this.url).then(
                    res=>{
                        this.titulo = res.data.titulo;
                        this.autor_id = res.data.autor_id;
                        this.lote = res.data.lote;
                        this.description = res.data.description;
                    }
                );
            }
        }
    }

</script>