<template>
  <div>
    <Nav />
    <v-spacer />
    <v-container class="mt-4" v-bind:style="{ background: `orange`, backgroundSize: 'cover' }">
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
          :items="sludinajumi"
          :search="search"
          text-color="indigo"
        >
        </v-data-table>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Sludinājumi',
            align: 'start',
            value: 'sludinajums',
          },
          { text: 'Pilsēta', value: 'pilseta' },
          { text: 'Sfēra', value: 'sfera' },
          { text: 'Cena', value: 'cena' },
        ],
        sludinajumi: [
          {
            sludinajums: "Apkures sistēmas maiņa un remonts",
            pilseta:"Rīga",
            sfera:"Iekšdarbi",
            cena: 60,
          },
          {
            sludinajums: "Logu furnitūras maiņa",
            pilseta:"Vangaži",
            sfera:"Ārejie darbi",
            cena: 100,
          },
          {
            sludinajums: "Santehnikas maiņa",
            pilseta:"Sigulda",
            sfera:"Iekšdarbi",
            cena: 120,
          },
          {
            sludinajums: "Dzīvojamo māju projektēšana",
            pilseta:"Valmiera",
            sfera:"Projektēšana",
            cena: 75,
          },
          {
            sludinajums: "Pieminekļu arhitektūras projektēšana",
            pilseta:"Rīga",
            sfera:"Arhitektūra",
            cena: 95,
          },
          {
            sludinajums: "Nostiepjamie griesti",
            pilseta:"Ģipka",
            sfera:"Iekšdarbi",
            cena: 100,
          },
          {
            sludinajums: "Parketa un lamināta ieklāšana ",
            pilseta:"Garkalne",
            sfera:"Iekšdarbi",
            cena: 55,
          },
          {
            sludinajums: "Roku darba skulptūras priekš darza",
            pilseta:"Talsi",
            sfera:"Arhitektūra",
            cena: 80,
          },
          {
            sludinajums: "Tapešu līmēšana ",
            pilseta:"Rīga",
            sfera:"Iekšdarbi",
            cena: 50,
          },
        ],
      }
    },
  }
</script>