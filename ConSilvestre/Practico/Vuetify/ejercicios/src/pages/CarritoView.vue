<template>
    <div v-if="props.carrito.length === 0" class="carrito-vacio">
        <h1>🛒 Tu carrito está vacío</h1>
        <p>Agregá productos desde el <RouterLink to="/catalogo">catálogo</RouterLink> para verlos aquí.</p>
    </div>
    <v-container v-if="props.carrito.length != 0">
        

        <div class="titulos">
            <h1> CARRITO ACTUAL   </h1>
            <h2> TOTAL A PAGAR: {{ totalGeneral }}</h2>
        </div>

        <v-row>
            <v-col cols="4"> Producto </v-col>
            <v-col cols="3"> Precio </v-col>
            <v-col cols="2" class="text-center"> Unidades </v-col>
            <v-col cols="3" class="text-right"> Subtotal </v-col>
        </v-row>
        <v-divider class="mb-2" />

        <div v-for="p in props.carrito" :key="p.id">
            <v-row class="py-2">
            <v-col cols="4">{{ p.nombre }}</v-col>
            <v-col cols="3">${{ p.precio }}</v-col>
            <v-col cols="1">
                <v-btn color="light-blue accent-1" size="x-small" icon="mdi-minus" rounded="lg" class="text-right" @click="Decrementar(p.id)"></v-btn>
            </v-col>
            <v-col cols="1" class="text-left">{{ p.cantidad }}</v-col>
            <v-col cols="1">
                <v-btn color="light-blue accent-1" size="x-small" icon="mdi-plus" rounded="lg" class="text-left" @click="Incrementar(p.id)" :disabled="!canInc(p.id)"></v-btn>
            </v-col>
            <v-col cols="1" class="text-center" id="subtotales">${{ p.precio * p.cantidad }}</v-col>
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

const totalGeneral = computed(() =>
    props.carrito.reduce((acc, i) =>
    acc + (Number(i.precio) || 0) * (Number(i.cantidad) || 0), 0)
)









</script>

<style>
    .titulos{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carrito-vacio{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>