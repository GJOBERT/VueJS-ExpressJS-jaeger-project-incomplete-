<template lang="html">
  <v-footer
  dark
  padless
  >
  <v-card
  flat
  tile
  class="blue-grey darken-4 white--text text-center footercard"
  >
  <!-- <v-card-text>
  <v-btn
  v-for="icon in icons"
  :key="icon"
  class="mx-4 white--text"
  icon
  >
  <v-icon size="24px">{{ icon }}</v-icon>
  </v-btn>
  </v-card-text> -->


  <v-divider></v-divider>

  <v-card-text class="white--text copyright">
    {{ new Date().getFullYear() }} — <strong>Projet JAEGER made with 💕 by the JAG team</strong>
  </v-card-text>
  </v-card>
  </v-footer>
</template>

<script>
export default {
  name:"generalFooter"
}
</script>

<style lang="css" scoped>
</style>
