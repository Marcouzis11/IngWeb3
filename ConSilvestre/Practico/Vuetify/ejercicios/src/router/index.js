import { createRouter, createWebHistory } from 'vue-router'

// (1) Vistas (pages)
import CarritoView from '@/pages/CarritoView.vue'
import ListadoProductos from '@/pages/ListadoProductos.vue'
import NotFound from '@/pages/NotFound.vue'

// (2) Definición de rutas
const routes = [
  { path: '/',        name: 'home',    component: ListadoProductos },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  // 404 catch-all
  //{ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

// (3) Crear y exportar el router
const router = createRouter({
  history: createWebHistory(),   // usa URLs limpias (sin #)
  routes,
  scrollBehavior() { return { top: 0 } }, // sube al tope en cada navegación
})

export default router
