<template>
  <div>
    <Nav />
    <v-container class="pakalpojumi">
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color=this.snackbarColor>{{ responseData }}</v-snackbar>
    <v-spacer />
    <v-container class="mt-4">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Meklēt"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="pakalpojumi"
          :search="search"
          text-color="indigo"
          @click:row="showDetails"
          :loading="loading"
        >
        </v-data-table>
      </v-card>
      <v-dialog max-width="600px" v-model="dialog">
        <template v-if="selectedItem">
        <v-card>
          <v-card-title color="primary">
            <v-row align="center">
              <v-col cols="10">
                <span class="font-weight-bold indigo--text">{{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Vards }} {{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Uzvards }}</span>
                <div>{{ selectedItem.Pakalpojuma_nosaukums }}</div>
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn icon @click="dialog = false">
                  <v-icon color="orange" >mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            {{ selectedItem.Pakalpojuma_apraksts }}
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div>Sludinājums ievietots: {{ selectedItem.Ievietosanas_datums }}</div>
                <div>Atrašanās vieta: {{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Pilseta}} </div>
                <div>Skatījumi: {{ selectedItem.skatijumi }}</div>
              </v-col>
              <v-col cols="12" md="6">
                <div>Kategorija: {{ selectedItem.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums }}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              color="indigo"
              middle
              @click="pieteikties"
            >
              Pieteikties
            </v-btn>
          </v-card-actions>
        </v-card>
        </template>
      </v-dialog>
    </v-container>
    <Footer />
    </v-container>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
    data () {
      return {
        search: '',
        responseData: '',
        snackbarColor: '',
        dialog: false,
        loading: true,
        selectedItem: null,
        snackbar: false,
        headers: [
          {
            text: 'Sludinājumi',
            align: 'start',
            value: 'Pakalpojuma_nosaukums',
          },
          { text: 'Pilsēta', value: 'Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Pilseta' },
          { text: 'Sfēra', value: 'Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums' },
          { text: 'Cena €', value: 'Cena' },
        ],
        pakalpojumi: [],
      }
    },

    methods: {
      showDetails(item) {
        this.selectedItem = item;
        this.dialog = true;
      },

      showSnackbar(color, message) {
        this.responseData = message
        this.snackbarColor = color
        this.snackbar = true
      }, 
    },

    mounted() {
      this.loading = true;
      try {
        this.$axios.get('/api/v2/pakalpojumi').then((response) => {
          if(response){
            if(response.status === 200){
              this.pakalpojumi = response.data;
              this.loading = false;
              console.log("Dati iegūti, yay")
            } else if(response.status === 500) {
              this.loading = false;
              console.log("Kods 500 :/")
              this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
            } else {
              console.log('rip')
              this.loading = false;
              this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
            }
          } else {
            console.log("error?")
          }
          
          
        })
        
      } catch (error) {
        console.log('An error occured :///')
        this.loading = false;
        this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
      }
    }
}
</script>

<style>
.pakalpojumi {
  background: url('static/wall.jpg');
  background-size: cover;
  max-width: 100%;
  height: auto;
}
</style>