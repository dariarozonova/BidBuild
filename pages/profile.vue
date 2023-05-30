<template>
  <div class="everything">
  <Nav />
  <v-container class="mt-5" fluid>
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
            <v-btn color="primary" @click="openEditDialog">Labot informāciju</v-btn>
            <v-btn color="primary" @click="openPasswordDialog">Mainīt paroli</v-btn>
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
              <v-btn color="success darken-1" @click="saveInfo">Saglabāt</v-btn>
              <v-btn color="error darken-1" @click="cancelChanges">Atcelt</v-btn>
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
              <v-btn color="success darken-1" :disabled="!isPasswordFormValid" @click="savePassword">Saglabāt</v-btn>
              <v-btn color="error darken-1" @click="cancelChanges">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Datu dzēšanas dialogs -->
        <v-dialog v-model="showPakalpojumsConfirmationDialog" max-width="500px">
          <v-card>
            <v-card-title>Apstiprināšana</v-card-title>
            <v-card-text>
              Vai tiešām vēlaties dzēst šo Pakalpojumu ?
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="deletePakalpojumsConfirm">Jā</v-btn>
              <v-btn color="error darken-1" @click="cancelPakalpojumsDelete">Nē</v-btn>
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
              <v-btn color="primary" @click="savePakalpojums">Saglabāt</v-btn>
              <v-btn color="error" @click="cancelPakalpojumsEdit">Atcelt</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Attēlo piegādātāja izveidotos pakalpojumus -->
        <v-card class="mt-5" elevation="24" v-if="userInfo.Role == 'Piegadatajs'">
          <v-card-title>Jūsu ievietotie pakalpojumi</v-card-title>
          <v-card-text v-if="Pakalpojumi.length > 0">
            <v-row>
              <v-col v-for="pakalpojums in Pakalpojumi" :key="pakalpojums.PakalpojumsID" cols="12">
                <v-sheet rounded elevation="8">
                  <v-card>
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
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="editPakalpojums(pakalpojums)">Rediģēt</v-btn>
                      <v-btn color="error darken-1" @click="deletePakalpojums(pakalpojums)">Izdzēst</v-btn>
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

        

        <!-- Attēlo klienta rezervētos pakalpojumus -->
        <v-card class="mt-5" elevation="24" v-else-if="userInfo.Role == 'Klients'">
          <v-card-title>Jūsu veiktās rezervācijas</v-card-title>
          <v-card-text v-if="Rezervacijas.length > 0">
            <v-row>
              <v-col v-for="rezervacija in Rezervacijas" :key="rezervacija.RezervacijaID" cols="12">
                <v-card>
                  <v-card-title>
                    {{ rezervacija }}
                  </v-card-title>
                  <v-card-text>
                    {{ rezervacija }}
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

        <v-card v-if="selectedPakalpojums">
          <v-card-title>
            {{ selectedPakalpojums.Pakalpojuma_nosaukums }}
          </v-card-title>
          <v-card-text>
            {{ selectedPakalpojums.Pakalpojuma_apraksts}}
          </v-card-text>
          <v-card-text>
            {{ selectedPakalpojums.Cena }}
          </v-card-text>
          <v-card-text>
            {{ selectedPakalpojums.Sfera_Pakalpojums_SferaToSfera}}
          </v-card-text>
          {{  selectedPakalpojums  }}
        </v-card>

      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>

export default {
  middleware: 'isAuthenticated',
  data() {
    return {
      editDialog: false,
      changePasswordDialog: false,
      showPakalpojumsConfirmationDialog: false,
      showEditPakalpojumsDialog: false,
      isPasswordFormValid: false,
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
      selectedPakalpojums: null,
      selectedRezervacija: null,

      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordRules: [v => !!v || "Parole ir nepieciešama", v => (v && v.length >= 8) || "Parolei jāsatur vismaz 8 rakstzīmes"],
      confirmPasswordRules: [
        v => !!v || "Šis lauks ir nepieciešams",
        this.matchingPasswords
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {
    openEditDialog() {
      // Initialize the editUserInfo with current user info
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
      // Save changes and update user info in Vuex store or submit the form to the server
      // ...
      this.editDialog = false;
    },
    savePassword() {
      // Save changes and update user info in Vuex store or submit the form to the server
      // ...
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
      this.showPakalpojumsConfirmationDialog = true;
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

    async deletePakalpojumsConfirm(){
      try {
        const deleteResponse = await this.$axios.delete(`/api/v2/pakalpojumi/${this.selectedPakalpojums.PakalpojumsID}`)
        if (deleteResponse.status == 200){
          this.Pakalpojumi = this.Pakalpojumi.filter((pakalpojums) => pakalpojums.PakalpojumsID !== this.selectedPakalpojums.PakalpojumsID );
          this.showPakalpojumsConfirmationDialog = false;
        } else {
          console.log(`Code: ${deleteResponse.status}, Message: ${deleteResponse.message}`)
        }
      } catch (error){
        console.log(error)
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
      } catch (error) {
        console.error(error);
      }
    },

    async getRezervacijas(){
      console.log("Šeit mēs iegūstam Klienta rezervētos pakalpojumus")
    }

  },
  created() {
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
