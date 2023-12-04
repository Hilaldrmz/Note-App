
<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
    <footer class="footer">

        <p>&copy;2023 Hilal Durmaz</p>

        <ul class="menu">
            <li class="menu-item">
                <RouterLink to="/" class="menu-link">Home</RouterLink>
            </li>
            <li class="menu-item">
                <RouterLink to="about" class="menu-link">About</RouterLink>
            </li>
            <li class="menu-item">
                <RouterLink to="/" class="menu-link">Team</RouterLink>
            </li>
            <li class="menu-item">
                <RouterLink to="/" class="menu-link">Contact</RouterLink>
            </li>


        </ul>
        <ul class="social-icon">
            <li class="social-icon-item">
                <fa-icon :icon="['fab', 'facebook']" class="social-icon-link"/>
            </li>

            <li class="social-icon-item">
                <fa-icon :icon="['fab', 'linkedin']" class="social-icon-link"/>
            </li>
            <li class="social-icon-item">
                <fa-icon :icon="['fab', 'instagram']" class="social-icon-link"/>
            </li>
            <li class="social-icon-item">
                <fa-icon :icon="['fab', 'twitter']" class="social-icon-link"/>
            </li>
        </ul>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    position: absolute;
    width: 100%;
    background: transparent;
    max-height: 10vb;
    padding: 2px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    bottom: 0;
    border-top: $border;
    

    p {
        color: $text-dark;
        margin: 0 10px;
        font-size: 1rem;
        font-weight: 300;
    }

    .social-icon,
    .menu {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;
        flex-wrap: wrap;
    }

    .social-icon-item,
    .menu-item {
        list-style: none;
        margin: 5px;
    }

    .social-icon-link {
        font-size: 1.5rem;
        color: $text-dark;
        margin: 0 10px;
        display: inline-block;
        transition: 0.5s;

        &:hover {
            transform: translateY(-10px);
        }
    }

    .menu-link {
        font-size: 1.2rem;
        color: $text-dark;
        margin: 0 10px;
        display: inline-block;
        transition: 0.5s;
        text-decoration: none;
        opacity: 0.75;
        font-weight: 300;

        &:hover {
            opacity: 1;
        }
    }

}
</style>