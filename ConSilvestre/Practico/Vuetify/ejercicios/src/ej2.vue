<template>
    <v-container id="busqueda" class="divBusqueda">
        <form @submit.prevent="buscarNombre" class="barraBusqueda"></form>
        <v-text-field v-model="nombreBuscado"
        label="Busca tu producto por nombre:"
        placeholder="Nombre de producto"/>

        <v-list>

        </v-list>
    </v-container>
</template>

<script>
function buscarNombre(){

}
</script>

<style>

</style>