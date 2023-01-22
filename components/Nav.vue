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
const cookies = require('js-cookie');

export default {
  mounted() {
    this.validateSession();
  },

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
  },

  methods: {
    async validateSession() {
        try {
          const sessionId = cookies.get('sessionID');
          console.log(sessionId)
          const response = await this.$axios.post('/api/login/validateSession', {sessionID: sessionId} );
          if (response.status === 200) {
              console.log('Success! response from validate session -- ', response.data.name, response.data.surname, response.data.authenticated)
              this.$store.commit('SET_AUTHENTICATED', true);
              this.$store.commit('SET_USER', { name: response.data.name, surname: response.data.surname });
          } else {
            console.log('cunt.. response from validate session -- ', response.data.name, response.data.surname, response.data.authenticated)
              this.$store.commit('SET_AUTHENTICATED', false);
              this.$store.commit('SET_USER', { name: '', surname: '' });
          }
        } catch (error) {
            console.log(error);
        }
    }
}
  
}
</script>
