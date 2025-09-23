  <template>
  <header style="display:flex; gap:16px; padding:12px 16px; border-bottom:1px solid #eee;">
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink :to="{ name: 'productos' }">Productos</RouterLink>
    <RouterLink :to="{ name: 'carrito' }">Carrito ({{ totalQty }})</RouterLink>
    <RouterLink :to="{ name: 'clientes'}">Clientes</RouterLink>
  </header>

  <!-- RouterView dinámico -->
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

  const productos = ref([
  { id: 101, nombre: 'Mouse Pro', precio: 123, stock: 5 , descripcion: 'Mouse con muchas luces y caracteristicas innovadoras'},
  { id: 102, nombre: 'Teclado Mecánico', precio: 123, stock: 0, descripcion: 'Teclado con Switches Cherry Red' },
  { id: 103, nombre: 'Monitor 24"', precio: 123, stock: 3, descripcion: 'Monitor con muchos HZ panel IPS con HDR' },
  { id: 104, nombre: 'Pad XXL', precio: 123, stock: 12, descripcion: 'Pad con nanotecnologia' },
  { id: 105, nombre: 'Auriculares BT', precio: 123, stock: 7,descripcion: 'Auriculares con amplificacion y NoiseReduction2.0' },
  { id: 106, nombre: 'Webcam 1080p', precio: 123, stock: 0,descripcion: 'Webcam con Usb, inalambrica y USBC, perfecta para montañismo'},
  { id: 107, nombre: 'Hub USB-C 7p', precio: 123, stock: 4 ,descripcion: 'HUB con 7 entradas USB y 2 HDMI'},
  { id: 108, nombre: 'Silla Gamer', precio: 123, stock: 2,descripcion: 'Silla Gamer con Leds y Comodidad3.0 de Sillas.Co' },
  { id: 109, nombre: 'Microfono USB', precio: 123, stock: 9, descripcion: 'Microfono con sensibilidad x1000' },
  { id: 110, nombre: 'Soporte Monitor', precio: 123, stock: 1, descripcion: 'Soporte con posibilidad para monitores de máximo 5kg' },
  ])

  const listaCarrito = ref([])
  const totalQty = computed(() =>
  listaCarrito.value.reduce((acc, i) => acc + i.cantidad, 0)
  )

  function AddById(id) {
  console.log('AddById ->', id)
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
  console.log('RemoveById ->', id)
  const idx = listaCarrito.value.findIndex(i => i.id === id)
  if (idx !== -1) listaCarrito.value.splice(idx, 1)
}

function AddQty(id) {
  const item = listaCarrito.value.find(i => i.id === id)
  const product = productos.value.find(p => p.id === id)
  if (!item || !product) return

  if (item.cantidad < product.stock) {
    item.cantidad++
  }
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

</script>

<style>
a.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}
</style>
