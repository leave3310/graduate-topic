<template>
    <v-app-bar color="primary">

        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="isOpenDrawer = !isOpenDrawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <router-link class="text-white text-decoration-none" to="/">專題報告</router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="isOpenDrawer" temporary>
        <v-list density="compact" nav>
            <v-list-item to="/introduce" prepend-icon="mdi-view-dashboard" title="緒論" value="緒論"></v-list-item>
            <v-list-item to="/motivation" prepend-icon="mdi-head-lightbulb" title="研究動機" value="研究動機"></v-list-item>
            <v-list-item to="/purpose" prepend-icon="mdi-account-search-outline" title="研究目的" value="研究目的"></v-list-item>
            <v-list-item to="/content" prepend-icon="mdi-file-outline" title="技術內容" value="技術內容"></v-list-item>
            <v-list-item to="/result" prepend-icon="mdi-map-check" title="研究成果" value="研究成果"></v-list-item>
            <v-list-item to="/summarize" prepend-icon="mdi-sigma" title="總結" value="總結"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue'
const isOpenDrawer = ref(true)
</script>