<template>
<div>
  <Nav />
  <v-container fluid class="profile">
        <v-layout justify-center>
            <v-card 
            width="600"
            class="text-center"
            >
            <v-card-title class="justify-center">Mans profils</v-card-title>
            <v-avatar size="120" class="mt-5">
              <img
                alt="user"
                src="user6.png"
              >
            </v-avatar>
                <v-card-text>
                    <v-text-field
                        v-model="form.Name"
                        label="Vārds"></v-text-field>
                    <v-text-field
                        v-model="form.Surname"
                        label="Uzvārds"></v-text-field>
                    <v-text-field
                        v-model="form.Email"
                        label="E-pasts"></v-text-field>
                    <v-text-field
                        v-model="form.Number"
                        label="Numurs"></v-text-field>
                    <v-text-field
                        v-model="form.City"
                        label="Pilsēta"></v-text-field>
                    </v-card-text>
                    <v-layout justify-center>
                    <v-card-actions>
                        <v-btn
                    outlined
                    color="indigo"
                    middle
                    justify-center
                    class="mb-5"
                    >
                    Saglabāt izmaiņas
                    </v-btn>
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
  <Footer />
</div>
</template>


<script>
export default {
    data () {
        return {
                    loading: false,
                    form: {
                        Name: 'Kiki',
                        Surname: 'Doe',
                        Email: 'kikidoe@gmail.com',
                        Number:'+37123456789',
                        City: 'Rīga'

                    }
        }
    }
}
</script>
<style>
.profile {
  background: url('static/wall.jpg');
  background-size: cover;
  max-width: 100%;
  height: auto;
}
</style>