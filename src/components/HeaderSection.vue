<template>
    <v-app-bar color="primary">

        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="isOpenDrawer = !isOpenDrawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <router-link class="text-white text-decoration-none" to="/">專題報告</router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="isOpenDrawer" temporary>
        <v-list density="compact" nav>
            <v-list-item to="/introduce" prepend-icon="mdi-view-dashboard" title="競賽說明" value="競賽說明"></v-list-item>
            <v-list-item to="/environment" prepend-icon="mdi-forum" title="使用環境" value="使用環境"></v-list-item>
            <v-list-item to="/modelChoice" prepend-icon="mdi-forum" title="模型選擇" value="模型選擇"></v-list-item>
            <v-list-item to="/modelStructure" prepend-icon="mdi-forum" title="模型架構" value="模型架構"></v-list-item>
            <v-list-item to="/unComplete" prepend-icon="mdi-forum" title="未完成的優化" value="未完成的優化"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue'
const isOpenDrawer = ref(true)
</script>