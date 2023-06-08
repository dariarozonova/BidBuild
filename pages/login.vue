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
        <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color=this.snackbarColor>{{ responseData }}</v-snackbar>
      </div> 
      <v-card
        class="mt-13 mx-auto"
        max-width="500">
        <v-card-title class="text-h6 justify-center font-weight-regular">
        <span>Ienākt</span>
        </v-card-title>

        <v-window>
          <v-window-item>
            <v-card-text>
              <v-form v-model="isFormValid" :lazy-validation="false" ref="form">
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-pasts"
                ></v-text-field>
                <v-text-field
                    label="Parole"
                    :rules="passwordRules"
                    input type="password" 
                    v-model="password" 
                    required>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-layout justify-center>
              <v-card-actions>
                <v-btn
                  @click="submitForm()"
                  outlined
                  :disabled="!isFormValid"
                  color="indigo"
                  >
                  Autentificēties
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-window-item>
        </v-window>
      </v-card>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'redirectAuth',
  data() {
    return {
      email: '',
      password: '',
      emailRules: [v => !!v || 'Šis lauks ir nepieciešams', v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-Pastam jābūt pareizā formātā.',],
      passwordRules: [v => !!v || 'Šis lauks ir nepieciešams',],
      responseData: '',
      snackbar: false,
      isFormValid: false,
      snackbarColor: ''
    }
  },

  methods: {

    async submitForm() {
      try {
        const formData = {
          email: this.email,
          password: this.password
        }

        console.log(formData)
        let response = await this.$auth.loginWith('local', {
          data: formData,
        })

        this.$router.push('/')

      } catch (error) {
        if(error.response){
          if (error.response.status === 401) {
            this.showSnackbar('red', error.response.data.message)
          }
        } else {
          console.log(error)
          this.showSnackbar('red', error.message)
        }
      }
    },

    showSnackbar(color, message) {
      this.responseData = message
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
    
</script>

<style>

</style>