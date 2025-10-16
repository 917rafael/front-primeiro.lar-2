<template>
  <div>
    <h1>Lista de Usuários</h1>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nome }} - {{ usuario.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const usuarios = ref([]);

onMounted(async () => {
  const response = await api.get("usuarios/");
  usuarios.value = response.data;
});
</script>
