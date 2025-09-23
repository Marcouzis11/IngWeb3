<template>
    <v-container class="pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3">Proyecto IngWeb3 Front-End</h1>
      </v-col>
    </v-row>

    <v-row justify="center" align="stretch" class="mt-6" dense>
      <!-- Imagen carrito -->
      <v-col cols="12" sm="6" md="5">
        <v-card class="pa-4" outlined>
          <v-img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="Carrito de compras"
            height="300px"
            contain
          ></v-img>
        </v-card>
      </v-col>

      <!-- Estadísticas -->
      <v-col cols="12" sm="6" md="5">
        <v-card class="pa-6 d-flex flex-column align-center justify-center" outlined>
          <h2 class="text-h4 mb-4">📊 Estadísticas</h2>
          <p class="text-h6">2,281,257 ventas en el último año</p>
          <p class="text-h6">+15% respecto al año anterior</p>
          <p class="text-h6">Promedio diario: 6,250 ventas</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>

<style>

</style>