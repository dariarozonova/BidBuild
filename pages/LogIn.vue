<template>
  <div>
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
        </v-app-bar>
      </div> 
      <v-card
        class="mt-13 mx-auto"
        max-width="500">
        <v-card-title class="text-h6 justify-center font-weight-regular">
        <span>Ienākt</span>
        </v-card-title>

        <v-window>
        <v-window-item>
          <form @submit.prevent="login">
            <v-card-text>
                <v-text-field
                    v-model="email"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-Pastam jābūt pareizā formātā.',]"
                    counter="50"
                    label="E-pasts"
                ></v-text-field>
                <v-text-field
                    label="Parole"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',]"
                    input type="password" 
                    v-model="password" 
                    required>
                </v-text-field>
              </v-card-text>
              <v-layout justify-center>
              <v-card-actions>
                  <v-btn
                  outlined
                  color="indigo"
                  >
                  <Nuxt-link to="/pakalpojumulists" replace style="text-decoration:none">
                  Sākt
                  </Nuxt-link>
                </v-btn>
              </v-card-actions>
              </v-layout>
            </form>
          </v-window-item>
        </v-window>
      </v-card>
    <Footer />
  </div>
</template>

<script>
  export default {
      
  }
    
</script>

<style>

</style>