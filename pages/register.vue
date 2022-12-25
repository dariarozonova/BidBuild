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
                <v-text-field
                    v-model="email"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-Pastam jābūt pareizā formātā.',
                    v => (v && v.length <= 50) || 'E-Pastā ir jābūt ne vairāk par 50 simboliem',
                    v => !!v || (v && v.length > 7) || 'E-Pastā ir jābūt minimāli 8 simboliem',]"
                    counter="50"
                    hint="E-pasts, kuru jūs izmantosiet lai ielogotos jūsu kontā"
                    label="E-Pasts"
                ></v-text-field>
                <v-text-field
                    v-model="name"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',
                    v => (!!v && v.length <= 20) || 'Vārdā ir jābūt ne vairāk par 20 simboliem'
                    ]"
                    counter="20"
                    label="Vārds"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="surname"
                    counter="20"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',
                    v => (v && v.length <= 20) || 'Uzvārdā ir jābūt ne vairāk par 20 simboliem',]"
                    label="Uzvārds"
                    required
                ></v-text-field>
                <v-select
                    v-model="select"
                    :items="options"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams']"
                    label="Kas jūs gribat būt?"
                    required
                ></v-select>
                <v-text-field
                    v-model="password"
                    min="8"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams',
                    v => (v && v.length <= 255) || 'Parolē ir jābūt ne vairāk par 255 simboliem',
                    v => (v && v.length >= 8) || 'Parolē ir jābūt ne mazāk par 8 simboliem',]"
                    label="Parole"
                    type="password"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    label="Paroles apstiprināšana"
                    :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                    type="password"
                    required
                ></v-text-field>
              </v-card-text>
              <v-layout justify-center>
              <v-card-actions>
                  <v-btn
                  outlined
                  color="blue"
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
    data: () => ({
      name: '',
      email: '',
      surname: '',
      select: '',
      options: [
        'Klients',
        'Piegādātājs',
      ],
      password: '',
      confirmPassword: '',
      confirmPasswordRules: [v => !!v || "Šis lauks ir nepieciešams"]
    }),
    computed: {
      passwordConfirmationRule() {
        return () =>
          this.password === this.confirmPassword || "Paroles nesakrīt";
      }
    }
  }
</script>