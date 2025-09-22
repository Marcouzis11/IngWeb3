<template>
    <v-container id="busqueda" class="divCosas">
        <form class="barraBusqueda"></form>
        <v-row>
            <v-col cols="3">
                <v-text-field v-model="nombreBuscado"
                label="Busca tu producto en el carrito por nombre"
                placeholder="Nombre de producto"
                />
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-btn color="success"> 
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
            <h1> CARRITO ACTUAL </h1>
        </v-row>

        <v-row>
            <v-col cols="4"> Producto </v-col>
            <v-col cols="3"> Precio </v-col>
            <v-col cols="1"> Unidades </v-col>
            <v-col cols="1" class="text-left"> Subtotal </v-col>
        </v-row>
        <v-divider class="mb-2" />
        
        <div v-for="p in props.carrito" :key="p.id">
            <v-row class="py-2">
            <v-col cols="4">{{ p.nombre }}</v-col>
            <v-col cols="3">${{ p.precio }}</v-col>
            <v-col cols="1">
                <v-btn color="pink" icon="mdi-plus" rounded="lg" class="text-right" @click="Incrementar(p.id)" :disabled="!canInc(p.id)"></v-btn>
            </v-col>
            <v-col cols="1" class="text-left">{{ p.cantidad }}</v-col>
            <v-col cols="1">
                <v-btn color="pink" icon="mdi-minus" rounded="lg" class="text-left" @click="Decrementar(p.id)"></v-btn>
            </v-col>
            <v-col cols="1">${{ p.precio * p.cantidad }}</v-col>
        </v-row>
        <v-divider />
        </div>

    </v-container>
</template>



<script setup>

import { ref, computed, reactive} from 'vue'

const props = defineProps({
    productos: Array,
    carrito: Array
})

const emit = defineEmits(['inc-qty','dec-qty'])

const nombreBuscado = ref('')

/*function buscarNombre() {
    const buscar = nombreBuscado.value.trim().toLowerCase()
    if (buscar == ''){
        return
    }
    
    filtered.value = productos.filter(p => p.nombre.trim().toLowerCase().includes(buscar))
    return 
}*/

function Incrementar(id){
    emit('inc-qty', id)
}

function Decrementar(id){
    emit('dec-qty', id)
}

function canInc(id) {
    const item = props.carrito.find(i => i.id === id)
    const productItem = props.productos.find(p => p.id === id)
    if (!item || !productItem) return false

    return item.cantidad < (productItem.stock ?? 0)
}









</script>

<style>

</style>