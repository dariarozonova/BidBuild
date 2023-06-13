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
                <v-text-field label="Vārds" v-model="editUserInfo.Vards" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Uzvārds" v-model="editUserInfo.Uzvards" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Telefona Numurs" v-model="editUserInfo.Numurs" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Pilsēta" v-model="editUserInfo.Pilseta" disabled></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined color="indigo" @click="openEditDialog">Labot informāciju</v-btn>
            <v-btn outlined color="indigo" @click="openPasswordDialog">Mainīt paroli</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Profila datu rediģēšanas dialogs-->
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-center">
              <h2>Labot informāciju</h2>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="First Name" v-model="editUserInfo.Vards"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Last Name" v-model="editUserInfo.Uzvards"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Phone Number" v-model="editUserInfo.Numurs"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="City" v-model="editUserInfo.Pilseta"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="success" @click="saveInfo">Saglabāt</v-btn>
              <v-btn outlined color="error" @click="cancelChanges">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Paroles maiņas dialogs -->
        <v-dialog v-model="changePasswordDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-center">
              <h2>Mainīt paroli</h2>
            </v-card-title>
            <v-card-text>
              <v-form v-model="isPasswordFormValid" :lazy-validation="false" ref="form">
                <v-text-field
                  label="Jūsu parole"
                  v-model="currentPassword"
                  required
                ></v-text-field>
                <v-text-field
                  label="Jūsu jaunā parole"
                  :rules="passwordRules"
                  input type="password"
                  v-model="newPassword"
                  required
                ></v-text-field>
                <v-text-field
                  label="Apstiprināt jauno paroli"
                  :rules="confirmPasswordRules"
                  input type="password"
                  v-model="confirmNewPassword"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="success" :disabled="!isPasswordFormValid" @click="savePassword">Saglabāt</v-btn>
              <v-btn outlined color="error" @click="cancelChanges">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Datu dzēšanas dialogs -->
        <v-dialog v-model="showDeleteConfirmationDialog" max-width="500px">
          <v-card>
            <v-card-title>Apstiprināšana</v-card-title>
            <v-card-text>
              Vai tiešām vēlaties dzēst šo Pakalpojumu ?
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="success" @click="deletePakalpojumsConfirm()">Jā</v-btn>
              <v-btn outlined color="error" @click="cancelPakalpojumsDelete()">Nē</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

            <!-- Pakalpojuma rediģēšanas dialogs -->
        <v-dialog v-model="showEditPakalpojumsDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Rediģēt pakalpojumu</v-card-title>
            <v-card-text v-if="selectedPakalpojums">
              <v-text-field v-model="selectedPakalpojums.Pakalpojuma_nosaukums" label="Nosaukums"></v-text-field>
              <v-textarea counter="300" v-model="selectedPakalpojums.Pakalpojuma_apraksts" label="Apraksts"></v-textarea>
              <v-text-field v-model="selectedPakalpojums.Cena" label="Cena"></v-text-field>
              <v-select
                v-model="selectedPakalpojums.Sfera"
                :items="Sferas"
                item-text="Sferas_nosaukums"
                item-value="SferaID"
                label="Sfera"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="success" @click="savePakalpojums">Saglabāt</v-btn>
              <v-btn outlined color="error" @click="cancelPakalpojumsEdit">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <!-- Attēlo piegādātāja izveidotos pakalpojumus -->
        <v-card class="mt-5" elevation="24" v-if="userInfo.Role == 'Piegadatajs'">
          <v-card-title>Jūsu ievietotie pakalpojumi<v-spacer vertical class="mx-5 transparent"></v-spacer><v-btn
            outlined
            color="indigo"
            >
            Izveidot pakalpojumu </v-btn></v-card-title>
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
                    <v-card-actions>
                      <v-btn outlined color="success" @click="editPakalpojums(pakalpojums)">Izveidot grafiku</v-btn>
                      <v-btn outlined color="indigo" @click="deletePakalpojums(pakalpojums)">Apskatīt rezervācijas</v-btn>
                      <v-btn outlined color="indigo" @click="editPakalpojums(pakalpojums)">Rediģēt</v-btn>
                      <v-btn outlined color="error" @click="deletePakalpojums(pakalpojums)">Izdzēst</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-5" elevation="24" v-else>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Jums nav ievietotu pakalpojumu
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

       <!-- Attēlo atsauskmes -->
        <v-card class="mt-5" elevation="24" v-if="userInfo.Role == 'Piegadatajs'">
          <v-card-title>Atsauksmes<v-spacer vertical class="mx-5 transparent"></v-spacer>
          <v-btn
            outlined
            color="indigo"
            @click="addAtsauksme"
            v-if="userInfo.Role == 'Piegadatajs'"
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
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Jums vēl nav atsauksmes
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
        </v-card-text>
        </v-card>

        <!-- Attēlo klienta rezervētos pakalpojumus -->
        <v-card class="mt-5" elevation="24" v-else-if="userInfo.Role == 'Klients'">
          <v-card-title>Jūsu veiktās rezervācijas</v-card-title>
          <v-card-text v-if="Rezervacijas.length > 0">
            <v-row>
              <v-col v-for="rezervacija in Rezervacijas" :key="rezervacija.RezervacijaID" cols="12">
                <v-card>
                  <v-card-title>
                    {{ rezervacija.Grafiks.Pakalpojums.Pakalpojuma_nosaukums }}
                  </v-card-title>
                  <v-card-text>
                    {{ rezervacija.Grafiks.Pakalpojums.Pakalpojuma_apraksts }}
                  </v-card-text>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <div>Pakalpojums rezervērts uz: {{ rezervacija.Grafiks.Datums.split('T')[0] }}</div>
                        <div v-if="rezervacija.Statuss == 'Proces_'">Rezervācijas statuss: Procesā</div>
                        <div v-else-if="rezervacija.Statuss == 'Izpild_ts'">Rezervācijas statuss: Izpildīts</div>
                        <div v-else>Rezervācijas statuss: Atcelts</div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="editRezervacija(rezervacija)">Rediģēt</v-btn>
                    <v-btn color="error darken-1" @click="deleteRezervacija(rezervacija)">Izdzēst</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-5" elevation="24" v-else>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Jums nav veikta neviena pakalpojuma rezervācija
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>


        <!-- Attēlo "Nav Satura", šim nevajadzētu notikt :))-->
        <v-card class="mt-5" elevation="24" v-else>
          <v-card-title>Nav satura</v-card-title>
          <v-card-text>
            Nav rezervāciju vai pakalpojumu, ko attēlot.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showAddAtsausksmeDialog" max-width="500px">
    <v-card class="mt-5" elevation="24">
      <v-col cols="12">
        <v-card-title class="headline">Pievienot atsauksmi</v-card-title>
        <v-card-text>
          <v-textarea counter="300" v-model="Atsauksme" :rules="commentRules" ref="atsauksmesText" label="Jūsu atsauksme"></v-textarea>
        </v-card-text>
        <v-select
          v-model="selectedPakalpojums"
          :items="pakalpojumsOptions"
          :rules="pakRules"
          label="Izvēlaties pakalpojumu"
          ref="atsauksmesSelect"
          item-text="Pakalpojuma_nosaukums"
          item-value="id"
          required
        >
        </v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo" @click="savePakalpojums">Pievienot</v-btn>
          <v-btn outlined color="error" @click="cancelAtsauksme">Atcelt</v-btn>
        </v-card-actions>
      </v-col>
    </v-card>
  </v-dialog>
          {{ Atsauksmes }}
  </v-container>
<Footer />
  </div>
</template>

<script>

export default {
  middleware: 'isAuthenticated',
  data() {
    return {
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
      selectedPakalpojums: null,
      selectedRezervacija: null,
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
      
    openEditDialog() {
      this.editUserInfo = {
        Vards: this.userInfo.Vards,
        Uzvards: this.userInfo.Uzvards,
        Numurs: this.userInfo.Numurs,
        Pilseta: this.userInfo.Pilseta,
      };
      this.editDialog = true;
    },

    openPasswordDialog(){
      this.changePasswordDialog = true;
    },

    matchingPasswords: function() {
      if (this.newPassword === this.confirmNewPassword) {
        return true;
      } else {
        return 'Paroles nesakrīt';
      }
    },

    saveInfo() {
      this.editDialog = false;
    },
    savePassword() {
      this.changePasswordDialog = false;
    },

    savePakalpojums(){
      console.log("saved")
    },

    cancelChanges() {
      this.editDialog = false;
      this.changePasswordDialog = false;
    },
    updateUserData(){
      this.editUserInfo = {
        Vards: this.userInfo.Vards,
        Uzvards: this.userInfo.Uzvards,
        Numurs: this.userInfo.Numurs,
        Pilseta: this.userInfo.Pilseta,
      };
    },

    deletePakalpojums(pakalpojums) {
      this.selectedPakalpojums = pakalpojums;
      this.showDeleteConfirmationDialog = true;
    },

    async getAtsauksmes(){
      try {
        const response = await this.$axios.get(`/api/v2/atsauksmes/id/${this.userInfo.ID}`);
        this.Atsauksmes = response.data;
        console.log(response.data)
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

    resetValidation() {
      this.$refs.atsauksmesText.resetValidation();
      this.$refs.atsauksmesSelect.resetValidation();
    },

    cancelAtsauksme() {
      this.resetValidation();
      this.resetAtsauksme();

      // Reset the values of the form fields
      this.$refs.atsauksmesText.$el.value = '';
      this.$refs.atsauksmesSelect.$el.value = null;

      this.showAddAtsausksmeDialog = false;
    },

    saveAtsauksme() {
      console.log("saved")
      },

    async editPakalpojums(pakalpojums){
      if(this.Sferas.length === 0){
        try {
          const sferas = await this.$axios.get('/api/v2/sferas')

          this.Sferas = sferas.data
        } catch (error) {
          console.log(error)
        }
      }
      this.selectedPakalpojums = Object.assign({}, pakalpojums)
      this.showEditPakalpojumsDialog = true;
    },

    cancelPakalpojumsEdit(){
      this.selectedPakalpojums = null;
      this.showEditPakalpojumsDialog = false;
    },

    cancelPakalpojumsDelete(){
      this.selectedPakalpojums = null;
      this.showDeleteConfirmationDialog = false;
    },

    async deletePakalpojumsConfirm(){
      try {
        const deleteResponse = await this.$axios.delete(`/api/v2/pakalpojumi/${this.selectedPakalpojums.PakalpojumsID}`)
        if (deleteResponse.status == 200){
          this.Pakalpojumi = this.Pakalpojumi.filter((pakalpojums) => pakalpojums.PakalpojumsID !== this.selectedPakalpojums.PakalpojumsID );
          this.showPakalpojumsConfirmationDialog = false;
        }
      } catch (error){
        if (error.response) {
          this.showSnackbar('red', error.response.data.message);
        } else {
          this.showSnackbar('red', 'Notika kļūda dzēšot pakalpojumu');
        }
      }

    },

    cancelPakalpojumsDelete() {
      this.selectedPakalpojums = null;
      this.showConfirmationDialog = false;
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

    async getRezervacijas(){
      try {
        const response = await this.$axios.get(`/api/v2/rezervacijas/klients/${this.userInfo.ID}`)
        if (response.status === 200) {
          this.Rezervacijas = response.data
        }
      } catch (error) {
        if (error.response) {
          this.showSnackbar('red', error.response.data.message);
        } else {
          this.showSnackbar('red', 'Notika kļūda ielādējot Rezervācijas');
        }
      }
    }

  },

  created() {
    this.getAtsauksmes();
    this.updateUserData();
    if(this.userInfo.Role == "Piegadatajs"){
      this.getPakalpojumi();
    } else if (this.userInfo.Role == "Klients"){
      this.getRezervacijas();
    } else {
      console.log("Nezināma lietotāja loma")
    }
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
