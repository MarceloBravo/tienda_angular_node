<template>
    <nav id="sidebar" :class="'sidebar js-sidebar ' + (isMenuVisible === false ? 'hide-sidebar' : 'show-sidebar')">
            <div class="sidebar-content js-simplebar">
                <a class="sidebar-brand" href="index.html">
                    <span class="align-middle">AdminKit</span>
                </a>
                <ul class="sidebar-nav">

                    <ul v-for="(mnu, key) in menus" 
                        :key="key" 
                        :id="'mnu'+mnu.id" 
                        :class="mnu.submenu.length === 0 ? 'sidebar-item' : 'sidebar-header'"
                    >
                        <label :id="mnu.id" @click="e => this.expandMenu(e)" class='mnu-clickeable open'>
                            <img v-if="mnu.icono" :src="srcImages + mnu.icono" :alt="mnu.icono"/>{{ mnu.nombre }}
                        </label>
                        <AdminSubMenu v-if="mnu.submenu" :subMenu="mnu.submenu"></AdminSubMenu>
                    </ul>

                </ul>
            </div>
        </nav>
</template>

<script>
    import AdminLeftMenu from './adminLeftMenu.js';
    export default AdminLeftMenu;
</script>

<style type="scss">
    @import './adminLeftMenu.scss';
</style>