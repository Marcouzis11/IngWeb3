<template>
  <div class="registro-cliente">
    <h1>REGISTRAR CLIENTE</h1>
    <input v-model="clienteNombre" placeholder="Escribe tu nombre aquí">
    <button @click="mostrarNombre">Mostrar Nombre </button>
    <p> {{nombreMostrado}}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const clienteNombre = ref('');   //Crea la variable vacía
const nombreMostrado = ref('')   //Otra variable vacía

function mostrarNombre() {
nombreMostrado.value = clienteNombre.value
}
</script>
