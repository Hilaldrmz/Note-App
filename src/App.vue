<script setup>
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div style="
    min-height: 100dvh; 
    max-width: 100dvw; 
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: transparant;
    background-image: url('../../hologram.png');" >
    
    <Nav style="z-index: 1"/>
    <RouterView style="z-index: 2"/>
    <Footer />
  </div>
</template>

<style scoped>


</style>