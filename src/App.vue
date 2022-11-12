<template>
  <v-app>
    <HeaderSection></HeaderSection>
    <v-main class="Main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderSection from '@/components/HeaderSection.vue';

</script>

<style lang="scss">
.Main {
  h2 {
    color: $secondary-darken-1;
    margin-bottom: 15px;
  }

  p {
    color: $primary-darken-1;
    margin-bottom: 20px;
    font-size: 20px;
  }

  ul,
  ol {
    padding-left: 40px;
  }
}
</style>
