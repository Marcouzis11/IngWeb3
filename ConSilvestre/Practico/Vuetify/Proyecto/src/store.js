// src/store.js
import { reactive, computed } from "vue";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null
});

export function useAuthStore() {
  const user = computed(() => state.user);

  function setUser(newUser) {
    state.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  //Para desloguearse, saco el usuario del localStorage
  function logout() {
    state.user = null;
    localStorage.removeItem("user");
  }

  //la clave de todo, lo uso en meta: en las rutas, para q no se saltee el login
  function isAuthenticated() {
    return user.value !== null;   
  }

  return { state, user, setUser, logout, isAuthenticated };
}

