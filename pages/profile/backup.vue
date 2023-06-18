<template>
  <div class="everything">
  <Nav />
    <v-container class="mt-5" fluid>
      <v-snackbar v-model="snackbar" :top="true" :timeout="3000" :color=this.snackbarColor>{{ responseData }}</v-snackbar>
      <v-row max-width="750px" justify="center">
        <v-col cols="12" md="6">

          <!-- Profila informācijas kartiņa -->
          <v-card elevation="24" class="profile-card">
            <v-card-title class="text-center">
              <v-spacer></v-spacer>
              <h2>Jūsu profils</h2>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="Vārds" v-model="editUserInfo.Vards" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Uzvārds" v-model="editUserInfo.Uzvards" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Telefona Numurs" v-model="editUserInfo.Numurs" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Pilsēta" v-model="editUserInfo.Pilseta" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-5" elevation="24">
            <v-tabs style="border-bottom: 1px solid #ccc;" v-model="activeTab">
              <v-tab v-for="(item, index) in items" :key="index">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="activeTab">
              <!-- Pakalpojumi tab content -->
              <v-tab-item>
                <v-card elevation="24">
                  <v-card-title>Piegādātāja ievietotie pakalpojumi</v-card-title>
                  <v-card-text v-if="Pakalpojumi.length > 0">
                    <v-row>
                      <v-col v-for="pakalpojums in Pakalpojumi" :key="pakalpojums.PakalpojumsID" cols="12">
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
                    v-if="userInfo.Role == 'Klients'"
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
        </v-col>
      </v-row>

      <!-- Atsauksmes pievienošanas dialogs -->
      <v-dialog v-model="showAddAtsausksmeDialog" max-width="500px">
        <v-card class="mt-5" elevation="24">
          <v-col cols="12">
            <v-card-title class="headline">Pievienot atsauksmi</v-card-title>
            <v-card-text>
              <v-select
                outlined
                v-model="selectedPakalpojums"
                :items="pakalpojumsOptions"
                :rules="pakRules"
                label="Izvēlaties pakalpojumu"
                ref="atsauksmesSelect"
                item-text="Pakalpojuma_nosaukums"
                item-value="PakalpojumsID"
                required
              >
              </v-select>
              <v-textarea outlined counter="300" v-model="Atsauksme" :rules="commentRules" ref="atsauksmesText" label="Jūsu atsauksme"></v-textarea>
            </v-card-text>
            {{ Atsauksme }}
            {{ selectedPakalpojums }}
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="indigo" @click="saveAtsauksme">Pievienot</v-btn>
              <v-btn outlined color="error" @click="cancelAtsauksme">Atcelt</v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
      </v-dialog>
    </v-container>
  <Footer />
  </div>
</template>

<script>

export default {
  middleware: 'isAuthenticated',
  data() {
    return {
      activeTab: 0,
      items: [
        'Pakalpojumi', 'Atsauksmes',
      ],
      editDialog: false,
      changePasswordDialog: false,
      showDeleteConfirmationDialog: false,
      showEditPakalpojumsDialog: false,
      isPasswordFormValid: false,
      showAddAtsausksmeDialog: false,
      isInfoFormValid: false,
      editUserInfo: {
        Vards: '',
        Uzvards: '',
        Numurs: '',
        Pilseta: '',
      },
      Pakalpojumi: [],
      Rezervacijas: [],
      Sferas: [],
      Atsauksmes: [],
      pakalpojumsOptions: [],
      selectedRezervacija: null,
      options: [
        '',
      ],
      Atsauksme: '',
      selectedPakalpojums: [],
      responseData: '',
      snackbar: false,
      snackbarColor: '',

      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordRules: [v => !!v || "Parole ir nepieciešama", v => (v && v.length >= 8) || "Parolei jāsatur vismaz 8 rakstzīmes"],
      confirmPasswordRules: [
        v => !!v || "Šis lauks ir nepieciešams",
        this.matchingPasswords
      ],
      pakRules: [v => !!v || 'Šis lauks ir nepieciešams'],
      commentRules: [v => !!v || 'Šis lauks ir nepieciešams'],
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {

    showSnackbar(color, message) {
      this.responseData = message
      this.snackbarColor = color
      this.snackbar = true
    },

    updateUserData(){
      this.editUserInfo = {
        Vards: this.userInfo.Vards,
        Uzvards: this.userInfo.Uzvards,
        Numurs: this.userInfo.Numurs,
        Pilseta: this.userInfo.Pilseta,
      };
    },


    async getAtsauksmes(){
      try {
        const response = await this.$axios.get(`/api/v2/atsauksmes/id/${this.userInfo.ID}`);
        this.Atsauksmes = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    datetolocal(date){
        const newDate = new Date(date)
        return newDate.toLocaleString()
      },

    addAtsauksme() {
        this.showAddAtsausksmeDialog = true;
    },

    resetAtsauksme() {
      console.log('Atjaunošana');
      this.Atsauksme = '';
      this.selectedAdvertisement = null;
    },

    cancelAtsauksme() {
      this.resetAtsauksme();
      this.showAddAtsausksmeDialog = false;
    },

    async saveAtsauksme() {
      try {
        const response = await this.$axios.post('/api/v2/atsauksmes/', {
          KlientsID: this.$store.getters.getUserInfo.ID,
          Atsauksme: this.Atsauksme,
          Pakalpojums_id: this.selectedPakalpojums,
        })
        if(response){
          if(response.status == 200){
            this.showSnackbar('green', response.data.message)
            this.getAtsauksmes()
          }
        }
      } catch (error){
        if (error.response) {
          this.showSnackbar('red', error.response.data.message);
        } else {
          this.showSnackbar('red', 'Notika kļūda pievienojot atsauksmi');
          console.log(error)
        }
      }
    },

    async getPakalpojumi(){
      try {
        const response = await this.$axios.$get(`/api/v2/pakalpojumi/email/${this.userInfo.Epasts}`);
        this.Pakalpojumi = response;
        this.pakalpojumsOptions = response;
      } catch (error) {
        if (error.response) {
          this.showSnackbar('red', error.response.data.message);
        } else {
          this.showSnackbar('red', 'Notika kļūda ielādējot Pakalpojumus');
        }

      }
    },

  },

  created() {
    this.getAtsauksmes();
    this.updateUserData();
    this.getPakalpojumi();
  },
};
</script>

<style scoped>
.everything {
  background: url('static/brick_wall.png');
  background-size: cover;
  max-width: 100%;
  height: 100%;
}
</style>
