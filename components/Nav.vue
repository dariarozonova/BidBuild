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
        <template v-if="authenticated">
          <span>{{ name }} {{ surname }}</span>
        </template>
        <template v-else>
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
        </template>
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
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    name() {
      return this.$store.state.authenticated ? this.$store.state.user.name : '';
    },
    surname() {
      return this.$store.state.authenticated ? this.$store.state.user.surname : '';
    }
  }
}
</script>
