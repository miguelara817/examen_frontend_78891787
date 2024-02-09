<template>
  <nav class="navbar navbar-expand-lg bg-info">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tienda de libros</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
          </li>
          <router-link class="nav-link" to="/autores">Autores</router-link>
          <router-link class="nav-link" to="/libros">Libros</router-link>
          <router-link class="nav-link" to="/clientes">Clientes</router-link>
          <router-link class="nav-link" to="/prestamos">Prestamos</router-link>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Reportes
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/reporteClientes">Lista de clientes con libros vencidos</router-link></li>
              <li><router-link class="dropdown-item" to="/reportePrestamos">Lista de préstamos segmentados por semana y mes</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>

</template>

