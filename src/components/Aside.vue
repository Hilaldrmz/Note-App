
<script setup>
import { RouterLink } from "vue-router";

</script>

<template>
    <aside class="aside">
        <div class="aside-items">

            <RouterLink active-class="active" to="/">
                <fa-icon :icon="['far', 'note-sticky']" class="icon" />
            </RouterLink>

            <RouterLink active-class="active" to="/Archive">
                <fa-icon :icon="['fas', 'inbox']" class="icon" />
            </RouterLink>

            <RouterLink active-class="active" to="/Trash">
                <fa-icon :icon="['far', 'trash-can']" class="icon" />
            </RouterLink>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
aside {
    position: absolute;
    display: flex;
    z-index: 2;
    margin-top: 70px;
.aside-items {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    width: max-content;
    padding: 0;
    margin: 0 7px;

    .active {
        font-weight: 900;
        color: peru
    }

    .icon {
        color: #181919;
        box-shadow: $shadow;
        padding: 10px;
        margin: 5px 15px;
        border-radius: 50%;

        &:hover {
            border-radius: 50%;
        }
    }
}}
</style>