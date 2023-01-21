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
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color="responseData.error ? 'error' : 'success'">{{ responseData }}</v-snackbar>
    <v-divider horizontal class="mx-md-10 mx-2 transparent"/>

      <v-card
      class="mt-13 mx-auto"
      max-width="500">
      <v-card-title class="text-h6 justify-center font-weight-regular">
      <span>Reģistrācija</span>
      </v-card-title>

      <v-window>
      <v-window-item>
          <v-card-text>
            <v-form v-model="isFormValid" ref="form" :lazy-validation="false">
              <v-text-field
                  v-model="email"
                  ref="email"
                  :rules="emailRules"
                  counter="50"
                  hint="E-pasts, kuru jūs izmantosiet lai ielogotos jūsu kontā"
                  label="E-pasts"
              ></v-text-field>
              <v-text-field
                  v-model="name"
                  ref="name"
                  :rules="nameRules"
                  counter="25"
                  label="Vārds"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="surname"
                  ref="surname"
                  counter="25"
                  :rules="surnameRules"
                  label="Uzvārds"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="number"
                  :rules="numberRules"
                  label="Telefona numurs"
                  required
              ></v-text-field>
              <v-select
                  v-model="role"
                  ref="role"
                  :items="options"
                  :rules="roleRules"
                  label="Kas jūs gribat būt?"
                  required
              ></v-select>
              <v-text-field
                  v-model="password"
                  ref="password"
                  min="8"
                  :rules="passwordRules"
                  label="Parole"
                  type="password"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="confirmPassword"
                  ref="confirmPassword"
                  label="Paroles apstiprināšana"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  type="password"
                  required
              ></v-text-field>
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
                Reģistreties
              </v-btn>
            </v-card-actions>
            </v-layout>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      </v-card>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      surname: '',
      number: '',
      role: '',
      options: [
        'Klients',
        'Piegādātājs',
      ],
      password: '',
      confirmPassword: '',
      emailRules: [v => !!v || 'Šis lauks ir nepieciešams', v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-Pastam jābūt pareizā formātā.', v => (v && v.length <= 50) || 'E-Pastā ir jābūt ne vairāk par 50 simboliem', v => !!v || (v && v.length > 7) || 'E-Pastā ir jābūt minimāli 8 simboliem',],
      nameRules: [v => !!v || 'Šis lauks ir nepieciešams'],
      surnameRules: [v => !!v || 'Šis lauks ir nepieciešams'],
      numberRules: [v => !!v || 'Šis lauks ir nepieciešams', v => /^\+371[0-9]{8}$/.test(v) || 'Telefona numuram jāsākas ar +371 un jābūt 8 cipariem'],
      roleRules: [v => !!v || 'Šis lauks ir nepieciešams'],
      passwordRules: [v => !!v || "Password is required", v => (v && v.length >= 8) || "Password must be at least 8 characters"],
      confirmPasswordRules: [v => !!v || "Šis lauks ir nepieciešams"],
      responseData: '',
      snackbar: false,
      isFormValid: false
    }
  },

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Paroles nesakrīt";
    },

    
  },

  methods: {

    async submitForm() {
      console.log("clicked!")
      const formData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        number: this.number,
        role: this.role,
        password: this.password
      }
      try {

        const response = await this.$axios.post('/api/register', formData)

        if(response.data.emailTaken){
          this.showSnackbar(error, response.data.message)
        } else if (response.status === 200) {
          this.showSnackbar(success, response.data.message)
        } else if (response.status === 409) {
          this.showSnackbar(error, 'This email is already registered')
        } else {
          this.showSnackbar(error, 'An error occurred')
        }
      } catch (error) {
        console.log(error)
        this.showSnackbar('Error', error.message)
      }
    },

    showSnackbar(type, message) {
      this.responseData = message
      this.snackbarType = type
      this.snackbar = true
    }
  }

}
</script>
