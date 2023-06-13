<template>
  <v-app dark>
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="12">
          <h1>Kļūda!</h1>
          <p v-if="this.error.statusCode === 404">Lapa netika atrasta :/</p>
          <p v-else class="red--text">Error : {{error.message}}</p>
          <v-btn nuxt to="/" color="primary" class=text-capitalize>Atgriezties uz sākuma lapu</v-btn>
        </v-col>
      </v-row>
    </v-container>>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Lapa netika atrasta :/',
      otherError: 'Notika kļūda'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
