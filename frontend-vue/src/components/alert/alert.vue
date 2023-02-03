<template>
    <div v-if="mostrar" :class="'alert alert-' + tipo + ' ' + (isItem ? 'alertItem' : '') + ' alert-dismissible fade show'" role="alert">
        <label><strong>{{ titulo }}</strong> {{ mensaje }}</label>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="cerrar">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>
    
<script>
    import alerta from './alert.js';
    export default alerta;
</script>

<style type="scss">
    @import './alert.scss';
</style>