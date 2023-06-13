<template>
  <div>
    <v-app-bar
      color="surface"
      dense
      light
    >   
    <v-divider vertical class="mx-md-3 mx-2 transparent"/>
        <v-toolbar-title style='cursor: pointer;' @click="$router.push('/')" class="text-md-h5 font-weight-bold curson-pointer indigo--text" >
            BidBuild
        </v-toolbar-title>
        <v-btn
          plain
          disabled
        >
          {{ currentPageText }}
        </v-btn>
        <v-spacer/>
        <template v-if="isAuthenticated">
          <v-btn
            outlined
            color="indigo"
            small
            @click="goToProfile"
          >
            {{ name }} {{ surname }}
            <v-icon
              right
              dark
            >
              mdi-account
            </v-icon>
          </v-btn>

        </template>
        <template v-else>
          <v-btn
            outlined
            color="indigo"
            small
            @click="goToLogin">
              Ienākt
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
            small
            @clik="goToRegister">
              Reģistrēties
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
            small
            @click="goTosludinajumi"
          >
            Sludinājumi
            <v-icon
              right
              dark
            >
              mdi-shopping-search-outline
            </v-icon>
          </v-btn>
          <v-divider vertical class="mx-md-5 mx-2 transparent"/>
          <v-btn
              outlined
              color="indigo"
              small
              @click="goToContact">
                    Palīdzība
              <v-icon
              right
              dark>
              mdi-chat-question-outline
              </v-icon>
            </v-btn>
            <v-divider vertical class="mx-md-5 mx-2 transparent"/>
            <v-btn 
              v-if="isAuthenticated"
              outlined
              color="indigo"
              small
              @click="logout">
                  Izlogoties
              <v-icon
              right
              dark>
              mdi-logout
              </v-icon>
            </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    name() {
      return this.$store.getters.isAuthenticated ? this.$store.getters.getUserInfo.Vards : '';
    },
    surname() {
      return this.$store.getters.isAuthenticated ? this.$store.getters.getUserInfo.Uzvards : '';
    },
    currentPageText() {
      switch (this.$route.path) {
        case '/':
          return 'Home';
        case '/sludinajumi':
          return 'Sludinājumi';
        case '/contact':
          return 'Contact Us';
        case '/profile':
          return 'Mans Profils';
        default:
          return '';
      }
    },
  },

  methods: {

    goToProfile(){
      this.$router.push('/profile')
    },

    goToLogin(){
      this.$router.push('/login')
    },

    goToRegister(){
      this.$router.push('/register')
    },

    goTosludinajumi(){
      this.$router.push('/sludinajumi')
    },

    goToContact(){
      this.$router.push('/contact')
    },

    logout(){
      this.$router.push('/')
      this.$auth.logout()
    }
    
  },
  
}
</script>
