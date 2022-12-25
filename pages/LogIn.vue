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
        <span>{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step">
        <v-window-item :value="1">
            <v-card-text>
                <v-text-field
                    v-model="email"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams']"
                    counter="255"
                    hint="Šis ir E-pasts jūs izmantosiet ielagošanā jūsu konta"
                    label="E-pasts">
                </v-text-field>
                <v-text-field
                    v-model="name"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams']"
                    counter="20"
                    label="Vards"
                    value=""
                ></v-text-field>
                <v-text-field
                    v-model="surname"
                    :rules="[v => !!v || 'Šis lauks ir nepieciešams']"
                    counter="20"
                    label="Uzvards"
                    value=""
                  ></v-text-field>
                  <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Šis lauks ir nepieciešams']"
                  label="Kas jūs gribāt būt?"
              ></v-select>
            </v-card-text>
        </v-window-item>

            <v-window-item :value="2">
            <v-card-text>
            <v-text-field
                v-model="password"
                :rules="[required, min8]"
                min="8"
                label="Parole"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                v-model="password1"
                :rules="[min8, matchingPasswords]"
                label="Paroles apstiprināšana"
                type="password"
                required
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                Ievadiet Jūsu paroli
            </span>
            </v-card-text>
            </v-window-item>

              <v-window-item :value="3">
                <div class="pa-4 text-center">
                <span class="text-caption grey--text">Paldies, ka lietojat BidBuild!</span>
                </div>
              </v-window-item>
            </v-window>

        <v-divider></v-divider>

        <v-card-actions>
        <v-btn
            :disabled="step === 1"
            text
            @click="step--"
        >
            Atgriezties atpakaļ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="step++">
            Nakamais
        </v-btn>
        </v-card-actions>
    </v-card>
            <Footer />
        </div>
</template>

<script>
  export default {
    
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Reģistrācija'
          case 2: return 'Ievadiet paroli'
          case 3: return 'Konts ir izveidots!'
        }
      },
    },
    data: () => ({
      name: '',
      nameRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => (v && v.length <= 20) || 'Vārdam ir jābūt ne vairāk par 20 simboliem',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => /.+@.+\..+/.test(v) || 'E-pastam jābūt pareiza formāta, piem. vards.uzvards@gmail.com',
        v => (v && v.length <= 255) || 'E-pastam ir jābūt ne vairāk par 255 simboliem',
        v => !!v || (v && v.length > 7) || 'E-pastam ir jābūt minimāli 8 simboli',
      ],
      surname: '',
      surnameRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => (v && v.length <= 20) || 'Uzvārdam ir jābūt ne vairāk par 20 simboliem',
      ],
      select: null,
      items: [
        'Klients',
        'Piegādātājs',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => (v && v.length <= 255) || 'Parolei ir jābūt ne vairāk par 255 simboliem',
      ],
    }),
  }
</script>

<style>

</style>