<template>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="pa-6" max-width="400" elevation="8" rounded="xl">
        <h2 class="mb-4 text-center">Iniciar sesión</h2>
  
        <v-form ref="form" @submit.prevent="login">
          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            required
          />
  
          <!-- Contraseña -->
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            required
          />
  
          <!-- Error -->
          <p v-if="error" class="text-red text-center">{{ error }}</p>
  
          <!-- Botón -->
          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            :loading="loading"
            block
          >
            Ingresar
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { loginService } from "@/services/auth";
  import { useAuthStore } from "@/store";
  
  export default {
    name: "Login",
    setup() {
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const loading = ref(false);
      const form = ref(null);
  
      const emailRules = [
        v => !!v || "El email es requerido",
        v => /.+@.+\..+/.test(v) || "Formato de email inválido"
      ];
      const passwordRules = [
        v => !!v || "La contraseña es requerida",
        v => v.length >= 6 || "Mínimo 6 caracteres"
      ];
  
      const auth = useAuthStore();
      const router = useRouter();
  
      const login = async () => {
  error.value = "";
  const valid = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    const userLogged = await loginService(email.value, password.value);
    auth.setUser(userLogged);
    console.log("DEBUG user:", auth.state.user); // 👈 deberías ver { email: "test@demo.com" }
    router.push("/");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
  
      return { email, password, error, loading, form, emailRules, passwordRules, login };
    }
  };
  </script>
  