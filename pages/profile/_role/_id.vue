<template>
  <div class="everything">
    <Nav />
    <v-container class="mt-5" fluid>
      <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color=this.snackbarColor>{{ responseData }}</v-snackbar>
      <template v-if="loading">
        <p>Loading...</p>
      </template>
      <template v-else>
        <template v-if="lietotajs.hasOwnProperty('Vards')">
          <v-row max-width="750px" justify="center">
            <v-col cols="12" md="6">

              <!-- Profila informācijas kartiņa -->
              <v-card elevation="24" class="profile-card">
                <v-card-title class="text-center">
                  <v-spacer></v-spacer>
                  <h2>Lietotāja informācija</h2>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Vārds" v-model="lietotajs.Vards" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Uzvārds" v-model="lietotajs.Uzvards" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field label="E-Pasta adrese" v-model="lietotajs.Epasts" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Pilsēta" v-model="lietotajs.Pilseta" readonly></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>


              <v-card class="mt-5" elevation="24" v-if="this.role == 'piegadatajs'" >
                <v-tabs style="border-bottom: 1px solid #ccc;" v-model="activeTab">
                  <v-tab v-for="(item, index) in piegadatajsItems" :key="index">
                    {{ item }}
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="activeTab">
                  <!-- Pakalpojumi tab content -->
                  <v-tab-item>
                    <v-card elevation="24">
                      <v-card-title>Piegādātāja ievietotie pakalpojumi</v-card-title>
                      <v-card-text v-if="lietotajs.Pakalpojums_Pakalpojums_PiegadatajsToPiegadatajs.length > 0">
                        <v-row>
                          <v-col v-for="pakalpojums in lietotajs.Pakalpojums_Pakalpojums_PiegadatajsToPiegadatajs" :key="pakalpojums.PakalpojumsID" cols="12">
                            <v-sheet rounded elevation="8">
                              <v-card class="text-wrap">
                                <v-card-title>
                                  {{ pakalpojums.Pakalpojuma_nosaukums }}
                                </v-card-title>
                                <v-card-text>
                                  <strong>Cena: </strong>{{ pakalpojums.Cena }} €
                                </v-card-text>
                                <v-card-text>
                                  <strong>Sfēra: </strong>{{ pakalpojums.Sfera_Pakalpojums_SferaToSfera.Sferas_nosaukums }}
                                </v-card-text>
                                <v-card-text>
                                  {{ pakalpojums.Pakalpojuma_apraksts }}
                                </v-card-text>
                              </v-card>
                            </v-sheet>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-text v-else>
                        Šim piegādātājam vēl nav izveidotu sludinājumu
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card elevation="24">
                      <v-card-title>Piegādātāja atsauksmes<v-spacer vertical class="mx-5 transparent"></v-spacer>
                      <v-btn
                        outlined
                        color="indigo"
                        @click="addAtsauksme"
                        v-if="userInfo && userInfo.Role == 'Klients'"
                        >
                        Pievienot atsauksmi </v-btn></v-card-title>
                      <v-card-text v-if="Atsauksmes.length > 0">
                        <v-row>
                          <v-col v-for="atsauksme in Atsauksmes" :key="atsauksme.ID" cols="12">
                            <v-card>
                                <v-card-title>
                                  {{ atsauksme.Atsauksme }}
                                </v-card-title>
                                <v-card-text>
                                  <strong>Pakalpojums: </strong>{{ atsauksme.Pakalpojums.Pakalpojuma_nosaukums }}
                                </v-card-text>
                                <v-card-text>
                                  Atsauksme ievietota: {{ datetolocal(atsauksme.Datums) }}
                                </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-text v-else>
                        Šim piegādātājam vēl nav atsauksmju
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>


              <v-card class="mt-5" elevation="24" v-else>
                <v-tabs v-if="this.role == 'klients'" style="border-bottom: 1px solid #ccc;" v-model="activeTab">
                  <v-tab v-for="(item, index) in klientsItems" :key="index">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </v-card>


            </v-col>
          </v-row>
        </template>
        <template v-else>
          <p>Lietotājs netika atrasts</p>
        </template>
      </template>
    </v-container>
  </div>
</template>

<script>
export default {
  components: { Bar },
  data() {
    return {
      loading: true,
      lietotajs: null,
      responseData: '',
      snackbarColor: '',
      snackbar: false,
      activeTab: 0,
      piegadatajsItems: [
        'Pakalpojumi', 'Atsauksmes',
      ],
      klientsItems: [
        'Atsauksmes',
      ],
      UserInfo: {
        Vards: '',
        Uzvards: '',
        Numurs: '',
        Pilseta: '',
      },
      Atsauksmes: [],


    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    role() {
      return this.$route.params.role;
    },
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    if (this.userInfo) {
      this.updateUserData();
    }
    this.fetchUserData();
    this.getAtsauksmes();
  },
  methods: {

    updateUserData(){
      this.UserInfo = {
        Vards: this.userInfo.Vards,
        Uzvards: this.userInfo.Uzvards,
        Numurs: this.userInfo.Numurs,
        Pilseta: this.userInfo.Pilseta,
      };
    },


    async fetchUserData() {
      try {
        const response = await this.$axios.post('/api/v2/profils/', {
          Role: this.role,
          ID: this.id
        });

        if (response.data) {
          this.lietotajs = response.data;
        } else {
          this.$router.push('/404');
        }
      } catch (error) {
        this.$router.push('/404');
      } finally {
        this.loading = false;
      }
    },

    datetolocal(date){
      const newDate = new Date(date)
      return newDate.toLocaleString()
    },

    async getAtsauksmes(){
      try {
        const response = await this.$axios.get(`/api/v2/atsauksmes/id/${this.id}`);
        this.Atsauksmes = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    showSnackbar(color, message) {
      this.responseData = message
      this.snackbarColor = color
      this.snackbar = true
    },
  }
};
</script>

<style scoped>
.everything {
  background: url('static/brick_wall.png');
  background-size: cover;
  background-attachment: fixed;
  max-width: 100%;
  height: 100%;
}
</style>
