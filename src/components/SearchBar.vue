<script setup>
import { ref, provide } from 'vue';

const searchQuery = ref('');

provide('searchQuery', searchQuery);
</script>


<template>
    <input type="text" v-model.trim="searchQuery" placeholder="Search..."> 
</template>



<style lang="scss" scoped>

input {
    background-color: $bg-white ;
    border: none;
    box-shadow: $shadow;
    border-radius: 15px;
    text-align: center;
    margin: 0;
    padding: 0;


    &:focus {
        outline: none;
    }
}
</style>