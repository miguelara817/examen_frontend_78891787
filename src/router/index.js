import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutorView from '../views/AutorView.vue'
import AutorCrear from '../views/AutorCrear.vue'
import AutorModificar from '../views/AutorModificar.vue'
import ClienteView from '../views/ClienteView.vue'
import ClienteCrear from '../views/ClienteCrear.vue'
import ClienteModificar from '../views/ClienteModificar.vue'
import LibroView from '../views/LibroView.vue'
import LibroCrear from '../views/LibroCrear.vue'
import LibroModificar from '../views/LibroModificar.vue'
import PrestamoView from '../views/PrestamoView.vue'
import PrestamoCrear from '../views/PrestamoCrear.vue'
import PrestamoModificar from '../views/PrestamoModificar.vue'
import ReporteClientes from '../views/ReporteClientes.vue'
import ReportePrestamos from '../views/ReportePrestamos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/autores',
    name: 'autores',
    component: AutorView
  },
  {
    path: '/crearAutor',
    name: 'autoresCrear',
    component: AutorCrear
  },
  {
    path: '/editarAutor/:id',
    name: 'editarAutor',
    component: AutorModificar
  },
  {
    path: '/libros',
    name: 'libros',
    component: LibroView
  },
  {
    path: '/crearLibro',
    name: 'crearLibro',
    component: LibroCrear
  },
  {
    path: '/editarLibro/:id',
    name: 'editarLibro',
    component: LibroModificar
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClienteView
  },
  {
    path: '/crearCliente',
    name: 'crearCliente',
    component: ClienteCrear
  },
  {
    path: '/editarCliente/:id',
    name: 'editarCliente',
    component: ClienteModificar
  },
  {
    path: '/prestamos',
    name: 'prestamos',
    component: PrestamoView
  },
  {
    path: '/registrarPrestamo',
    name: 'registrarPrestamo',
    component: PrestamoCrear
  },
  {
    path: '/registrarDevolucion/:id',
    name: 'registrarDevolucion',
    component: PrestamoModificar
  },
  {
    path: '/reporteClientes',
    name: 'reporteClientes',
    component: ReporteClientes
  },
  {
    path: '/reportePrestamos',
    name: 'reportePrestamos',
    component: ReportePrestamos
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
