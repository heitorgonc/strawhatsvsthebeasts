<template>
    <div>
        <b-button fluid variant="danger" size="lg" class="btn" @click="atack(true)">Super Atack</b-button>
    </div>
</template>

<script>
export default {
    props:{
        atack: Function
    }
}
</script>

<style>
</style>