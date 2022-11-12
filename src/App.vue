<template>
  <v-app>
    <HeaderSection></HeaderSection>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderSection from '@/components/HeaderSection.vue';

</script>

