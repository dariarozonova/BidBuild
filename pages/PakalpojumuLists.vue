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
            label="Search"
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
        imageUrl: 'wall.jpg',
        search: '',
        headers: [
          {
            text: 'Sludinājumi',
            align: 'start',
            filterable: false,
            value: 'sludinajums',
          },
          { text: 'Pilsēta', value: 'pilseta' },
          { text: 'Sfēra', value: 'sfera' },
          { text: 'Cena', value: 'cena' },
        ],
        sludinajumi: [
          {
            sludinajums: "a",
            pilseta:"a",
            sfera:"a",
            cena: 1,
          },
        ],
      }
    },
  }
</script>