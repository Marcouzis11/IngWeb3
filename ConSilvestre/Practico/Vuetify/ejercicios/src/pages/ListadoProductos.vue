<template>
    <v-container id="busqueda" class="divCosas">
        <form class="barraBusqueda"></form>
        <v-row>
            <v-col cols="3">
                <v-text-field v-model="nombreBuscado"
                label="Busca tu producto por nombre"
                placeholder="Nombre de producto"
                @keyup.enter="buscarNombre"
                />
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-btn color="success" @click="buscarNombre"> 
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="1"> ID </v-col>
            <v-col cols="5"> Producto </v-col>
            <v-col cols="2"> Precio </v-col>
            <v-col cols="3"> Stock </v-col>
        </v-row>
        <v-divider class="mb-2" />

        <div v-if="filtered.length === 0">
            <v-alert type="warning" variant="tonal">
                No se encontraron productos con ese nombre
            </v-alert>
        </div>

        <div v-for="p in filtered" :key="p.id">
            <v-row class="py-2">
            <v-col cols="1">{{ p.id }}</v-col>
            <v-col cols="5">{{ p.nombre }}</v-col>
            <v-col cols="2">${{ p.precio }}</v-col>
            <v-col cols="3" class="text-left">
                <v-chip
                :color="p.stock === 0 ? 'error' : 'success'"
                size="small"
                variant="flat">
                {{ p.stock === 0 ? 'Sin stock' : p.stock }}
                </v-chip>
            </v-col>
            <v-col cols="1">
                <v-btn  :color="btnColor(p)"
                    :prepend-icon="btnIcon(p)"
                    :disabled="btnDisabled(p)"
                    @click="alternarCarrito(p)" >
                </v-btn>
            </v-col>
        </v-row>
        <v-divider />
        </div>
    </v-container>
</template>



<script setup>

import { ref, computed, reactive} from 'vue'


//Datos para probar si funciona
const props = defineProps({
    productos: Array,
    carrito: Array
})

const nombreBuscado = ref('')
const filtered = ref(props.productos)
const emit = defineEmits(['add-to-cart','remove-from-cart'])

function buscarNombre() {
    const buscar = nombreBuscado.value.trim().toLowerCase()
    if (buscar == ''){
        filtered.value = props.productos
        return
    }
    
    filtered.value = props.productos.filter(p => p.nombre.trim().toLowerCase().includes(buscar))
    return 
}

function isAdded(id) {
    return props.carrito.some(item => item.id === id)
}


//Funciones de Botón de Carrito
function btnColor(p) {
    if (p.stock === 0) return 'grey-darken-2'              // gris
    return isAdded(p.id) ? 'success' : 'light-blue accent-1'
}

function btnIcon(p) {
    if (p.stock === 0) return 'mdi-cart-off'      // carrito “bloqueado”
    return isAdded(p.id) ? 'mdi-cart-check' : 'mdi-cart-plus'
}

function btnDisabled(p) {
    return p.stock === 0 && !isAdded(p.id)
}

function alternarCarrito(p) {
    if (isAdded(p.id)) {
    emit('remove-from-cart', p.id)
    } else {
    if (p.stock === 0) return
    emit('add-to-cart', p.id)
    }
}



</script>

<style>

</style>