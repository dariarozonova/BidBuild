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
          <v-select
            v-if="!this.filterBy"
            max-width="50px"
            v-model="filterPicker"
            :items="Sferas"
            item-text="Sferas_nosaukums"
            item-value="Sferas_nosaukums"
            label="Filtrēt pēc..."
          ></v-select>
          <v-btn
            v-if="isPiegadatajs || !isAuthenticated"
            class="mx-4"
            outlined
            color="indigo"
            small
            @click="addPakalpojumsDialog">
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

      <!-- Pakalpojuma rediģēšanas dialogs -->
      <v-dialog max-width="600px" v-model="dialog">
        <template v-if="selectedItem">
          <v-card>
            <v-card-title color="primary">
              <v-row align="center">
                <v-col cols="10">
                  <span style="cursor: pointer;" @click="goToPrivateProfile(selectedItem.Piegadatajs)" class="font-weight-bold indigo--text">
                    {{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Vards }} 
                    {{ selectedItem.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Uzvards }}
                  </span>
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
                v-if="!isPiegadatajs"
                outlined
                color="indigo"
                middle
                @click="openApplyDialog()"
              >
                Pieteikties
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <!-- Pakalpojuma pievienošanas dialogs -->
      <v-dialog v-model="showAddPakalpojumsDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Pievienot pakalpojumu</v-card-title>
            <v-card-text>
              <v-text-field v-model="newPakalpojums.Pakalpojuma_nosaukums" label="Nosaukums"></v-text-field>
              <v-textarea counter="300" v-model="newPakalpojums.Pakalpojuma_apraksts" label="Apraksts"></v-textarea>
              <v-text-field v-model="newPakalpojums.Cena" label="Cena"></v-text-field>
              <v-select
                v-model="newPakalpojums.Sfera"
                :items="Sferas"
                item-text="Sferas_nosaukums"
                item-value="SferaID"
                label="Sfēra"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="indigo" @click="addPakalpojums">Saglabāt</v-btn>
              <v-btn outlined color="error" @click="cancelAddPakalpojums">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
        v-model="applyDialog"
        max-width="600px"
      >
        <v-card>
          <v-card-title class="mb-4 text-center" style="overflow-wrap: normal; display: block;">
            <v-spacer></v-spacer>
            <span>Lūdzu izvēlieties datumu, kurā vēlaties pieteikties</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
          <v-row justify="center">
              <v-date-picker
                v-model="picker"
                :first-day-of-week="1"
                :allowed-dates="allowedDates"
                locale="lv-lv"
                event-color="#00ff00"
              ></v-date-picker>
              <v-alert
                v-if="!allowedDates"
                dense
                type="info"
              >
                Nav pieejamu rezervējamu datumu
              </v-alert>
          </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="error"
              outlined
              @click="applyDialog = false;"
            >
              Aizvērt
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="this.picker"
              color="success"
              outlined
              @click="applyToPakalpojums"
            >Pieteikties</v-btn>
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
        filterPicker: '',
        dialog: false,
        loading: true,
        selectedItem: null,
        snackbar: false,
        newDate: null,
        picker: '',
        showAddPakalpojumsDialog: false,
        showAddPakalpojumsDialog: false,
        applyDialog: false,
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
        newPakalpojums: [],
        Sferas: [],
        pakalpojumaGrafiks: [],
        filterPakalpojumi: [],
      }
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      filterBy() {
        return this.$route.query.type
      },

      isPiegadatajs() {
        const userInfo = this.$store.getters.getUserInfo;
        if (userInfo && userInfo.Role === 'Piegadatajs') {
          return true;
        } else {
          return false;
        }
      },
  },

  watch: {
    filterPicker: {
      handler: 'filterPakalpojumi',
      immediate: true
    }
  },

  methods: {

    filterPakalpojumi() {
      if (this.filterPicker) {
        this.filteredPakalpojumi = this.pakalpojumi.filter(pakalpojums => {
          return pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums === this.filterPicker;
        });
      } else {
        this.filteredPakalpojumi = this.pakalpojumi;
      }
    },

      async getAllPakalpojumi(){
        this.loading = true;
        try {
          const getPakalpojumi = await this.$axios.get('/api/v2/pakalpojumi')


          if (getPakalpojumi.status === 200) {
            if (this.filterBy) {
              if (this.filterBy === 'arhitektura') {
                this.pakalpojumi = getPakalpojumi.data.filter((pakalpojums) => {
                  return pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums === 'Arhitektūra';
                });
              } else if (this.filterBy === 'projektesana') {
                this.pakalpojumi = getPakalpojumi.data.filter((pakalpojums) => {
                  return pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums === 'Projektēšana';
                });
              } else if (this.filterBy === 'ieksdarbi') {
                this.pakalpojumi = getPakalpojumi.data.filter((pakalpojums) => {
                  return pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums === 'Iekšdarbi';
                });
              }
            } else if (this.filterPicker) {
              this.pakalpojumi = getPakalpojumi.data.filter((pakalpojums) => {
                return pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums === this.filterPicker;
              });
            } else {
              this.pakalpojumi = getPakalpojumi.data;
            }
            this.loading = false;
            console.log('Dati iegūti, yay');
          }
        } catch (error) {
          if (error.response){
            this.showSnackbar('red', error.response.data.message);
            
          } else {
            this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
            this.loading = false;
          }
        }
      },

      async showDetails(item) {
        this.selectedItem = item;
        this.dialog = true;
        try {
          await this.$axios.post('/api/v2/pakalpojumi/addView', { PakalpojumsID: this.selectedItem.PakalpojumsID })
        } catch (error) {
          console.log(error)
        }
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

      async addPakalpojumsDialog() {
        if(!this.isAuthenticated){
          this.$router.push('/login')
        } else {
          this.showAddPakalpojumsDialog = true
          const allSferas = await this.$axios.get('/api/v2/sferas')
          this.Sferas = allSferas.data
        }
      },

      async getAllSferas() {
        try {
          const allSferas = await this.$axios.get('/api/v2/sferas')
          this.Sferas = allSferas.data
        } catch (error) {
          console.log(error)
        }
        
      },

      async addPakalpojums() {
        try {

          await this.$axios.post('/api/v2/pakalpojumi', {
            Pakalpojuma_nosaukums: this.newPakalpojums.Pakalpojuma_nosaukums,
            Pakalpojuma_apraksts: this.newPakalpojums.Pakalpojuma_apraksts,
            Cena: this.newPakalpojums.Cena,
            Sfera: this.newPakalpojums.Sfera,
            Piegadatajs: this.$store.getters.getUserInfo.ID,
          });

          console.log(this.newPakalpojums)

          this.newPakalpojums = [];
          this.showAddPakalpojumsDialog = false;

          this.showSnackbar('green', 'Pakalpojums pievienots veiksmīgi.');

          this.fetchPakalpojumi();
        } catch (error) {
          if(error.response){
            this.showSnackbar('red', error.response.data.message);
          }
        }
      },


      cancelAddPakalpojums(){
        this.showAddPakalpojumsDialog = false
      },

      goToPrivateProfile(id) {
        console.log(id)
        this.$router.push(`/profile/piegadatajs/${id}`)
      },
      
      async openApplyDialog() {
        if (!this.isAuthenticated) {
          this.$router.push('/login')
        } else {
          try {
            const response = await this.$axios.get(`/api/v2/grafiks/pakalpojums/${this.selectedItem.PakalpojumsID}`)
            this.pakalpojumaGrafiks = response.data
            .filter(item => item.Statuss === 'Br_vs')
            .map(item => ({
              id: item.GrafiksID,
              date: item.Datums.split('T')[0],
            }));
            this.applyDialog = true;
          } catch (error) {
            console.log(error)
          }
          
        }
      },

      allowedDates(val) {
        const date = val.split('T')[0];
        return this.pakalpojumaGrafiks.find(item => item.date === date);
      },

      async applyToPakalpojums() {
        try {
          const selectedGrafiks = this.pakalpojumaGrafiks.find(item => item.date === this.picker.split('T')[0]);
          console.log(selectedGrafiks.id)

          if (!selectedGrafiks) {
            this.showSnackbar('red', 'Nav izvēlēts datums');
          }
          console.log(this.$store.getters.getUserInfo.ID)


          const response = await this.$axios.post('/api/v2/rezervacijas/', {
            KlientsID: this.$store.getters.getUserInfo.ID,
            GrafiksID: selectedGrafiks.id,
          });

          console.log(response)

          this.applyDialog = false;
          this.showSnackbar('green', response.data.message);
        } catch (error) {
          if (error.response) {
            this.showSnackbar('red', error.response.data.message);
          } else {
            this.showSnackbar('red', 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru');
          }
          
        }
      },

    },

    

    async mounted() {
      this.getAllPakalpojumi(),
      this.getAllSferas()
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