<template>
<div class="everything">
  <Nav />
  <v-container fluid class="profile">
        <v-layout justify-center>
            <v-card 
            width="600"
            class="text-center"
            >
            <v-card-title class="justify-center">{{ getUserInfo.name }}</v-card-title>
            <v-avatar size="120" class="mt-5">
              <img
                alt="user"
                src="user6.png"
              >
            </v-avatar>
                <v-card-text>
                    <v-text-field
                        v-model="getUserInfo.Vards"
                        label="Vārds"></v-text-field>
                    <v-text-field
                        v-model="getUserInfo.Uzvards"
                        label="Uzvārds"></v-text-field>
                    <v-text-field
                        v-model="getUserInfo.Epasts"
                        label="E-pasts"></v-text-field>
                    <v-text-field
                        v-model="getUserInfo.Numurs"
                        label="Numurs"></v-text-field>
                    <v-text-field
                        v-model="getUserInfo.Pilseta"
                        label="Pilsēta"></v-text-field>
                    <v-text-field
                        v-model="getUserInfo.userType"
                        label="Jūsu loma">
                    </v-text-field>
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
    <v-container>
        <v-card>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        <v-row>
            <v-col col-12>
                <v-card>
                    <v-card-title>Hello, world!</v-card-title>
                </v-card>
            </v-col> 
        </v-row>
        </v-card>
    </v-container>
  <Footer />
</div>
</template>


<script>
export default {
    middleware: 'isAuthenticated',
    computed: {
        getUserInfo() {
            return this.$store.getters.getUserInfo
        },
    },
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('/')
        },
    },
}
</script>
<style>
.everything {
  background: url('static/wall.jpg');
  background-size: cover;
  max-width: 100%;
  height: auto;
}
</style>