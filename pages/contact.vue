<template>
    <div>
      <Nav />
      <v-container fill-height>
        <v-row class="align-center">
          <v-col cols="12" md="8">
            <h2 class="my-5">Nepieciešama palīdzība ? Esam gatavi palīdzēt!</h2>
            <v-card>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-row>
                    <v-col cols="4" offset-cols="4">
                      <v-text-field outlined v-model="name" label="Jūsu vārds" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field outlined v-model="surname" label="Jūsu uzvārds" required></v-text-field>
                    </v-col>
                  </v-row>
  
                  <v-text-field outlined v-model="email" label="Jūsu E-Pasta adrese" required></v-text-field>
  
                  <v-textarea outlined v-model="message" :counter="maxMessageLength" label="Jūsu jautājums vai neskaidrība" required></v-textarea>
                  <v-spacer></v-spacer>
  
                  <v-btn type="submit" color="primary">Submit</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import Nav from '../components/Nav.vue'
  export default {
    components: { Nav },
    data() {
      return {
        name: '',
        surname: '',
        email: '',
        message: '',
        maxMessageLength: 250
      };
    },
    methods: {
      submitForm() {
        // Perform form submission logic here
        // You can access the form field values using this.name, this.surname, this.email, this.message
        // You can make an API call or handle the form data as needed
      }
    }
  };
  </script>
  