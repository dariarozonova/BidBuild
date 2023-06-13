<template>
  <div class="everything">
    <Nav />
    <v-container>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color=this.snackbarColor>{{ responseData }}</v-snackbar>
    <v-spacer />
    <v-container class="mt-4">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Meklēt"
            outlined
            color="indigo"
            single-line
            hide-details
            class="mx-4"
          ></v-text-field>
          <v-btn
            outlined
            color="indigo"
            small
            @click="addPakalpojums">
            Izveidot</v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="pakalpojumi"
          :search="search"
          text-color="indigo"
          @click:row="showDetails"
          :loading="loading"
          loading-text="Ielādē sludinājumus..."
          style="cursor: pointer"
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
                <div>Sludinājums ievietots: {{ datetolocal(selectedItem.Ievietosanas_datums) }}</div>
                <div>Atrašanās vieta: {{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Pilseta}} </div>
                <div>Skatījumi: {{ selectedItem.Skatijumi }}</div>
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
              @click="OpenApplyDialog"
            >
              Pieteikties
            </v-btn>
          </v-card-actions>
        </v-card>
        </template>
      </v-dialog>
      <v-dialog v-model="showAddPakalpojumsDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Pievienot pakalpojumu</v-card-title>
            <v-card-text>
              <v-text-field v-model="Pakalpojuma_nosaukums" label="Nosaukums"></v-text-field>
              <v-textarea counter="300" v-model="Pakalpojuma_apraksts" label="Apraksts"></v-textarea>
              <v-text-field v-model="Cena" label="Cena"></v-text-field>
              <v-select
                v-model="Sfera"
                :items="Sferas"
                item-text="Sferas_nosaukums"
                item-value="SferaID"
                label="Sfera"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="indigo" @click="savePakalpojums">Saglabāt</v-btn>
              <v-btn outlined color="error" @click="cancelPakalpojumsEdit">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
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
        newDate: null,
        showAddPakalpojumsDialog: false,
        showAddPakalpojumsDialog: false,
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
      async showDetails(item) {
        this.selectedItem = item;
        this.dialog = true;
        const response = await this.$axios.post('/api/v2/pakalpojumi/addView', { PakalpojumsID: this.selectedItem.PakalpojumsID })
        console.log(response)
      },

      showSnackbar(color, message) {
        this.responseData = message
        this.snackbarColor = color
        this.snackbar = true
      },

      cancelPakalpojumsEdit(){
      this.selectedPakalpojums = null;
      this.showAddPakalpojumsDialog = false;
    },

      datetolocal(date){
        const newDate = new Date(date)
        return newDate.toLocaleString()
      }, 

      addPakalpojums() {
        this.showAddPakalpojumsDialog = true
      }
    },

    

    async mounted() {
      this.loading = true;
      try {
        const response = await this.$axios.get('/api/v2/pakalpojumi')

        if(response.status == 200){
          this.pakalpojumi = response.data;
          this.loading = false;
          console.log("Dati iegūti, yay")
        } else if(response.status == 500) {
          this.loading = false;
          console.log("Kods 500 :/")
          this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
        } else {
          console.log('rip')
          this.loading = false;
          this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
        }
        
      } catch (error) {
        this.loading = false;
        this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
      }
    }
}
</script>

<style>
.everything {
  background: url('static/pakalpojumi_bg.png');
  background-size: cover;
  max-width: 100%;
  height: 100%;
}
</style>