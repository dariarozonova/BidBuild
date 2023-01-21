<template>
  <div>
    <v-app-bar
      color="surface"
      dense
      light
    >   
    <v-divider vertical class="mx-md-3 mx-2 transparent"/>
        <v-toolbar-title @click="$router.push('/')" class="text-md-h5 font-weight-bold curson-pointer indigo--text" >
            BidBuild
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
        outlined
        color="indigo"
        small>
          <NuxtLink to="/login" replace>
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
          <NuxtLink to="/register" replace>
              Reģistrēties
          </NuxtLink>
        <v-icon
        right
        dark>
        mdi-account-plus-outline
        </v-icon>
        </v-btn>
        <v-divider vertical class="mx-md-5 mx-2 transparent"/>
      <v-btn
        outlined
        color="indigo"
        small>
          <NuxtLink to="/pakalpojumi" target="_blank">
              Sludinājumi
          </NuxtLink>
        <v-icon
        right
        dark>
        mdi-shopping-search-outline
        </v-icon>
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {

}
</script>
