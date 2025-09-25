<template>
    <v-container class="pa-6" fluid>
        <v-btn color="primary" :to="{ path: '/catalogo' }">
            Volver al Catálogo
        </v-btn>

    <v-row justify="center">
        <v-col cols="12" md="8">
        <h2>Detalle del producto</h2>
        <p><strong>ID:</strong> {{ id }}</p>

        <div v-if="producto">
            <p><strong>Nombre:</strong> {{ producto.nombre }}</p>
            <p><strong>Precio:</strong> {{ producto.precio }}</p>
            <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>
            <p><strong>Stock:</strong> {{ producto.stock }}</p>
        </div>

        <p v-else>Cargando / validando…</p>
        </v-col>
    </v-row>
    </v-container>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  productos: { type: Array, default: () => [] }, // viene de App.vue
  id: { type: [String, Number], required: true } // viene del router (props: true)
})

const router = useRouter()
const id = computed(() => Number(props.id))

const producto = computed(() =>
    props.productos.find(p => Number(p.id) === id.value)
)

// Si la lista ya está cargada y NO existe el producto, mandamos a 404
watchEffect(() => {
    if (props.productos.length > 0 && !producto.value) {
    router.replace({ name: 'notfound' })
    }
})
</script>
