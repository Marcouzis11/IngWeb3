<template>
    <form @submit.prevent="registrarCliente" class="nombreEscribir">
    <v-text-field
        v-model="clienteNombre"
        label="Nombre del cliente"
        placeholder="Ej: Juan Pablo Ruiz"
    />

    <div class="div-boton">
        <v-btn :disabled="!puedeRegistrar" @click="registrarCliente">
        Registrar
        </v-btn>
    </div>

    <v-alert v-if="mensajeConfirmacion" type="success">
        {{ mensajeConfirmacion }}
    </v-alert>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const clienteNombre = ref('')
const mensajeConfirmacion = ref('')

const puedeRegistrar = computed(() => clienteNombre.value.trim().length > 0)

function registrarCliente () {
    if (!puedeRegistrar.value) return

    console.log(`✅ Cliente registrado: ${clienteNombre.value}`)
    mensajeConfirmacion.value = `¡Bienvenido/a, ${clienteNombre.value}! 🎉`
}
</script>

<style scoped>
</style>
