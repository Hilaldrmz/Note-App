<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Aside from "../components/Aside.vue";
import SearchBar from "../components/SearchBar.vue";


const showAside = ref(false);

</script>


<template>
    <nav>
        <div class="nav-items">

            <fa-icon @click="showAside = !showAside" :icon="['fas', 'bars']" size="lg" style="color: #181919;"
                class="hamburger-icon" />

            <!-- <img src="../../logo.png" alt=""> -->

            <SearchBar/>

            <RouterLink to="/user" class="user">User</RouterLink>
        </div>

    </nav>
    <Transition name="fade" >
        <Aside v-if="showAside" />
    </Transition>
</template>

<style lang="scss" scoped>
nav {
    margin-bottom: 5px;
    display: block;
    padding: 5px;
    border-bottom: $border;
    background-image: url("../../hologram.png");
    background-repeat: no-repeat;
    background-position-y: top;
    position: relative;
    z-index: 2;
    background-color: transparent;


    .nav-items {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        position: relative;
        z-index: 1;

        img {
            @include bg-hologram;
            height: 3dvh;
            // margin-left: -1150px;
            background-color: $bg-dark;
            box-shadow: $shadow;
            border-radius: 100%;
        }
        .hamburger-icon {
            box-shadow: $shadow;
            padding: 10px;
            margin: 5px 15px;
            border-radius: 50%;
            cursor: pointer;

            &:hover {
                border-radius: 50%;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>