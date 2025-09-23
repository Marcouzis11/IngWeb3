import { createRouter, createWebHistory } from 'vue-router'

// (1) Vistas (pages)
import Home from '@/pages/Home.vue'
import CarritoView from '@/pages/CarritoView.vue'
import ListadoProductos from '@/pages/ListadoProductos.vue'
import NotFound from '@/pages/NotFound.vue'
import RegistroClientes from '@/pages/RegistroClientes.vue'
import DetalleProducto from '@/pages/DetalleProducto.vue'

// (2) Definición de rutas
const routes = [
  { path: '/', name:'home', component: Home},
  { path: '/productos',        name: 'productos',    component: ListadoProductos },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  { path: '/clientes', name: 'clientes', component: RegistroClientes},
  {
    path: '/productos/:id',
    name: 'producto',
    component: DetalleProducto,
    // Pasamos el param como prop (queda string, lo casteamos en el componente)
    props: true},
  // 404 catch-all
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
]

// (3) Crear y exportar el router
const router = createRouter({
  history: createWebHistory(),   // usa URLs limpias (sin #)
  routes,
  scrollBehavior() { return { top: 0 } }, // sube al tope en cada navegación
})



export default router
