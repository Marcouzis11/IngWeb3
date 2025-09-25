import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import NotFound from "../pages/NotFound.vue";
import ListadoProductos from "@/pages/ListadoProductos.vue";
import CarritoView from "@/pages/CarritoView.vue";
import RegistroClientes from "@/pages/RegistroClientes.vue";
import DetalleProducto from "@/pages/DetalleProducto.vue";
import { useAuthStore } from "../store";

const routes = [
  { path: "/", name: "home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: Login },
  { path: "/:pathMatch(.*)*", name: "notfound", component: NotFound },
  { path: "/catalogo", name: "catalogo", component: ListadoProductos, meta: { requiresAuth: true } },
  { path: "/carrito", name: "carrito", component: CarritoView , meta: { requiresAuth: true }},
  { path: "/catalogo/:id", name: "producto", component: DetalleProducto, props: true, meta: { requiresAuth: true } },
  { path: "/registroCliente", name: "registroCliente", component: RegistroClientes, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardas globales
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // 👀 Debug en consola para ver qué tiene el store
  console.log("DEBUG guard -> user:", auth.state.user);

  if (to.meta.requiresAuth && !auth.state.user) {
    console.log("DEBUG guard -> No autenticado, redirigiendo a /login");
    next("/login");
  } else if (to.path === "/login" && auth.state.user) {
    console.log("DEBUG guard -> Ya logueado, redirigiendo a /");
    next("/");
  } else {
    console.log("DEBUG guard -> Paso permitido:", to.fullPath);
    next();
  }
});

export default router;
