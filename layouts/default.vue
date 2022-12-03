<template>
  <v-app dark>
    <AppHeader />
    <v-main>
      <Nuxt />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    this.$store.dispatch('getInitialData')
    this.$store.dispatch('getInitialHistorical')
  },
}
</script>
