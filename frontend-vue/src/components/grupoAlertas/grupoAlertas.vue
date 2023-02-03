<template>
    <div class="grupoAlertasContainer" v-if="alertas.length > 0">        
        <Alert 
            v-for="(item, key) in alertas" 
            :key="key" 
            :titulo="item.titulo" 
            :mensaje="item.mensaje" 
            :tipo="item.tipo" 
            :isItem="true"
        />
    </div>
</template>

<script>
    import GrupoAlertas from './grupoAlertas.js';
    export default GrupoAlertas;
</script>

<style type="scss">
    @import './grupoAlertas.scss';
</style>