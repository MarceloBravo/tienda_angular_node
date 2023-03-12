<template>
        <li v-for="(mnu, key) in subMenu" :key="key" :id="'mnu'+mnu.id" className="sidebar-item">
            <ul v-if="mnu.subMenus && mnu.subMenus.length > 0">
                <label :click="expandMenu(mnu.id)">
                    <img v-if="mnu.icono" :src="srcImages + mnu.icono" :alt="mnu.icono"/>
                    {{ mnu.nombre }}
                </label>
                <AdminSubMenu :subMenu="mnu.submenus"></AdminSubMenu>
            </ul>

            <label 
                v-if="!mnu.submenus || mnu.submenus.length === 0" 
                className="sidebar-link" :click="e => redirectTo(mnu.link)"
            >
                <img v-if="mnu.icono" :src="srcImages + mnu.icono" :alt="mnu.icono"/>
                {{ mnu.nombre }}
            </label>
        </li>
        
</template>

<script>
    import AdminSubMenu from './adminSubMenu.js';
    export default AdminSubMenu;
</script>

<style lang="scss">
    @import './adminSubMenu.scss';
</style>