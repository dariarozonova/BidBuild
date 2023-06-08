<template>
    <div class="everything">
      <Nav />
      <v-container fill-height>
        <v-row class="align-center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="my-5 font-weight-bold indigo--text">Nepieciešama palīdzība ? Esam gatavi palīdzēt!</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-row>
                    <v-col cols="4" offset-cols="4">
                      <v-text-field outlined v-model="Vards" label="Jūsu vārds" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field outlined v-model="Uzvards" label="Jūsu uzvārds" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select :items="items" outlined v-model="Tema" label="Vēstules tēma" required></v-select>
                    </v-col>
                  </v-row>
  
                  <v-text-field outlined v-model="Epasts" label="Jūsu E-Pasta adrese" required></v-text-field>
  
                  <v-textarea outlined v-model="Vestule" :counter="maxMessageLength" label="Jūsu jautājums vai neskaidrība" required></v-textarea>
                  <v-spacer></v-spacer>
  
                  <v-btn type="submit" color="primary">Sūtīt</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
      <Footer />
    </div>
  </template>
  
<script>
import Nav from '../components/Nav.vue'
export default {
  components: { Nav },
  data() {
    return {
      Vards: '',
      Uzvards: '',
      Tema: '',
      Epasts: '',
      Vestule: '',
      maxMessageLength: 250,
      items: [
      'Reģistrācija',
      'Autentifikācija',
      'Problēmas ar sludinājumiem',
      'Paroles maiņa',
      'Cita tēma'
      ],
    };
  },
  methods: {
    submitForm() {

    }
  }
};
</script>

<style>
.everything {
  background: url('static/helpbg.png');
  background-size: cover;
  max-width: 100%;
  height: 100%;
}
</style>
  