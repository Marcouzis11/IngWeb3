<template>
  <div class="registro-cliente">
    <h2>Registro del Cliente</h2>
    
    <div class="input-group">
      <label for="nombre">Nombre del cliente:</label>
      <input 
        type="text" 
        id="nombre" 
        v-model="clienteNombre" 
        placeholder="Ingresa el nombre aquí" 
        @keyup.enter="registrarCliente">
    </div>
    
    <button @click="registrarCliente">Registrar</button>
    
    <div class="mensaje-confirmacion">
      <p>{{ mensajeConfirmacion }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const clienteNombre = ref('');
const mensajeConfirmacion = ref('');

const registrarCliente = () => {
  if (clienteNombre.value.trim() !== '') {
    // Simulamos el guardado en la "base de datos"
    console.log(`✅ Cliente registrado: ${clienteNombre.value}`);

    // Mostramos el mensaje de confirmación
    mensajeConfirmacion.value = `¡Bienvenido, ${clienteNombre.value}! 🎉`;
    
    // Limpiamos el campo de entrada
    clienteNombre.value = '';
  }
};
</script>

<style scoped>
.registro-cliente {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
}

h2 {
  color: #343a40;
  margin-bottom: 24px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #495057;
  margin-bottom: 8px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

button:hover {
  background-color: #218838;
}

.mensaje-confirmacion {
  margin-top: 20px;
  padding: 16px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  font-weight: bold;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>