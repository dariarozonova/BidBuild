<template>
  <div>
    <Nav />
    <v-container class="mt-10 mx-20">
      <v-row>
        <v-col>
          <v-img
            contain
            max-height="500"
            max-width="680"
            position="left"
            src="homepage-photo.png"
          >
          </v-img>
        </v-col>
        <v-col>
          <v-sheet
          max-width="450"
          class="mt-13"
          position="right"
          >
            <v-sheet-text>
              <h1 class="font-weight-bold orange--text">Mēs esam BidBuild</h1>
              <h2 class="font-weight-bold indigo--text">  Mēs esam jauna BidBuild sistēma, kur mūsu lietotājiem būs iespējams 
                atrast sev visizdevīgāko būvniecības darbu pakalpojumu piegādātāju, atkarībā no vietas, cenas un kvalitātes, bet lietotājiem, kuri piedāvā pakalpojumus, būs iespējams paplašināt sev potenciālo klientu daudzumu.</h2>
            </v-sheet-text>
          </v-sheet>
        </v-col>
      </v-row>
      </v-container>
      <div class="d-flex justify-center">
          <h1 class="indigo--text">Kategorijas</h1>
      </div>

      <v-container fluid>
      <v-row>
      <v-col
        v-for="(row, rowIndex) in cardRows"
        :key="rowIndex"
        :cols="12"
      >
        <v-row>
          <v-col
            v-for="(card, cardIndex) in row"
            :key="cardIndex"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text"
                height="150px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
              <v-layout justify-center>
                <v-card-actions>
                  <v-btn
                    outlined
                    color="orange"
                    middle
                  >
                    <Nuxt-link to="/sludinajumi" target="_blank" style="text-decoration:none">
                      Sākt
                    </Nuxt-link>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
      </v-container>
    <Footer />
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
  components: { Nav },
  name: 'IndexPage', 
  data(){
    return {
      cards: [
        { title: 'Arhitektūra', src: 'arch.jpg', flex: 4 },
        { title: 'Projektēšana', src: 'proj.jpg', flex: 4 },
        { title: 'Iekšdarbi', src: 'iekš.jpg', flex: 4 },
        { title: 'Āra darbi', src: 'ara1.jpg', flex: 4 },
        { title: 'Dizains', src: 'design2.jpg', flex: 4 },
        { title: 'Dārza darbi', src: 'darzs.jpg', flex: 4 },
      ],
    }
  },

  computed: {
    cardRows() {
      const rows = []
      const chunkSize = 3
      for (let i = 0; i < this.cards.length; i += chunkSize) {
        rows.push(this.cards.slice(i, i + chunkSize))
      }
      return rows
    }
  },

    
}
</script>
