<template>
  <header style="display:flex; gap:16px; padding:12px 16px; border-bottom:1px solid #eee;">
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink :to="{ name: 'catalogo' }">Productos</RouterLink>
    <RouterLink :to="{ name: 'carrito' }">Carrito ({{ totalQty }})</RouterLink>
    <RouterLink :to="{ name: 'registroCliente'}">Clientes</RouterLink>
    <v-toolbar-title>Mi Tienda</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Usuario logueado -->
    <span v-if="auth.user.value">{{ auth.user.email }}</span>
    <v-btn v-if="auth.isAuthenticated()" @click="logout" text>
      Salir
    </v-btn>
  </header>

  <!-- Vista dinámica -->
  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      :productos="productos"
      :carrito="listaCarrito"
      @add-to-cart="AddById"
      @remove-from-cart="RemoveById"
      @inc-qty="AddQty"
      @dec-qty="RemoveQty"
    />
  </RouterView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store'
import router from './router'

// ---------- Productos ----------
const productos = ref([
  { id: 101, nombre: 'Mouse Pro', precio: 123, stock: 5, descripcion: 'Mouse con muchas luces y características innovadoras' },
  { id: 102, nombre: 'Teclado Mecánico', precio: 123, stock: 0, descripcion: 'Teclado con Switches Cherry Red' },
  { id: 103, nombre: 'Monitor 24"', precio: 123, stock: 3, descripcion: 'Monitor con muchos HZ panel IPS con HDR' },
  { id: 104, nombre: 'Pad XXL', precio: 123, stock: 12, descripcion: 'Pad con nanotecnología' },
  { id: 105, nombre: 'Auriculares BT', precio: 123, stock: 7, descripcion: 'Auriculares con amplificación y NoiseReduction 2.0' },
  { id: 106, nombre: 'Webcam 1080p', precio: 123, stock: 0, descripcion: 'Webcam inalámbrica con USB-C, ideal para montañismo' },
  { id: 107, nombre: 'Hub USB-C 7p', precio: 123, stock: 4, descripcion: 'HUB con 7 entradas USB y 2 HDMI' },
  { id: 108, nombre: 'Silla Gamer', precio: 123, stock: 2, descripcion: 'Silla Gamer con Leds y Comodidad 3.0 de Sillas.Co' },
  { id: 109, nombre: 'Micrófono USB', precio: 123, stock: 9, descripcion: 'Micrófono con sensibilidad x1000' },
  { id: 110, nombre: 'Soporte Monitor', precio: 123, stock: 1, descripcion: 'Soporte para monitores de hasta 5kg' }
])

// ---------- Carrito ----------
const listaCarrito = ref([])
const totalQty = computed(() =>
  listaCarrito.value.reduce((acc, i) => acc + i.cantidad, 0)
)

function AddById(id) {
  const p = productos.value.find(x => x.id === id)
  if (!p || p.stock <= 0) return
  if (listaCarrito.value.some(i => i.id === id)) return

  listaCarrito.value.push({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    cantidad: 1
  })
}

function RemoveById(id) {
  const idx = listaCarrito.value.findIndex(i => i.id === id)
  if (idx !== -1) listaCarrito.value.splice(idx, 1)
}

function AddQty(id) {
  const item = listaCarrito.value.find(i => i.id === id)
  const product = productos.value.find(p => p.id === id)
  if (!item || !product) return
  if (item.cantidad < product.stock) item.cantidad++
}

function RemoveQty(id) {
  const idx = listaCarrito.value.findIndex(i => i.id === id)
  if (idx === -1) return
  const item = listaCarrito.value[idx]

  if (item.cantidad > 1) {
    item.cantidad--
  } else {
    listaCarrito.value.splice(idx, 1)
  }
}

// ---------- Auth ----------
const auth = useAuthStore()
const logout = () => {
  auth.logout()
  router.push("/login")
}
</script>

<style>
a.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}
</style>

