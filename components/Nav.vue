<template>
  <div>
    <v-app-bar
      color="surface"
      dense
      light
    >   
    <v-divider vertical class="mx-md-3 mx-2 transparent"/>
        <v-toolbar-title @click="$router.push('/')" class="text-md-h5 font-weight-bold pointer indigo--text">
            BidBuild
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
        outlined
        color="indigo"
        small>
          <NuxtLink to="/SignIn" target="_blank">
            Ienākt
          </NuxtLink>
          <v-icon
          right
          dark>
          mdi-login-variant
          </v-icon>
        </v-btn>
      <v-divider vertical class="mx-md-5 mx-2 transparent"/>
      <v-btn
        outlined
        color="indigo"
        small>
          <NuxtLink to="/LogIn" target="_blank">
              Reģistrēties
          </NuxtLink>
        <v-icon
        right
        dark>
        mdi-account-plus-outline
        </v-icon>
        </v-btn>
      <v-divider vertical class="mx-md-5 mx-2"/>
      <v-btn
        outlined
        color="indigo"
        small>
        Meklēt
        <v-icon
        right
        dark>
        mdi-magnify
        </v-icon>
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>