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
                <v-text-field
                    v-model="password"
                    min="8"
                    label="Parole"
                    type="password"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Paroles apstiprināšana"
                    type="password"
                    required
                ></v-text-field>
                <span class="text-caption grey--text text--darken-1">
                    Ievadiet Jūsu paroli
                </span>
              </v-card-text>
              <v-card-actions>
                  <v-btn
                  outlined
                  color="blue"
                  >
                  <Nuxt-link to="/PakalpojumuLists" target="_blank" style="text-decoration:none">
                  Reģistreties
                  </Nuxt-link>
                </v-btn>
              </v-card-actions>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>
    </v-card>
            <Footer />
        </div>
</template>

<script>
  export default {
    computed: {
    data: () => ({
      name: '',
      nameRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => (v && v.length <= 20) || 'Vārdam ir jābūt ne vairāk par 20 simboliem',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Šis lauks ir nepieciešams',
        v => !!v || /.+@.+\..+/.test(v) || 'E-pastam jābūt pareiza formāta, piem. vards.uzvards@gmail.com',
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
  }
</script>