// src/services/auth.js
export async function loginService(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Usuario para probar el login
        if (email === "test@demo.com" && password === "123456") {
          resolve({ email });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 500);
    });
  }