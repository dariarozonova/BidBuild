<template>
  <div>
    <Nav />
    <v-container class="mt-10 mx-20">
      <v-row>
        <v-col>
          <v-img
            contain
            max-height="420"
            max-width="600"
            position="left"
            src="homepage-photo.png"
          >
          </v-img>
        </v-col>
        <v-col>
          <v-sheet
          max-width="340"
          class="mt-13"
          position="right"
          >
            <v-sheet-text>
              <h1 class="font-bold orange--text">Mēs esam BidBuild</h1>
              <h3 class="font-weight-bold indigo--text">  Mēs esam jauna BidBuild sistēma, kur mūsu lietotājiem būs iespējams 
                atrast sev visizdevīgāko būvniecības darbu pakalpojumu piegādātāju, atkarībā no vietas, cenas un kvalitātes, bet lietotājiem, kuri piedāvā pakalpojumus, būs iespējams paplašināt sev potenciālo klientu daudzumu.</h3>
            </v-sheet-text>
          </v-sheet>
        </v-col>
      </v-row>
      </v-container>
      <v-spacer />
      <v-row>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          >
          <v-card class='ml-5 mr-5'>
              <v-img
                :src="card.src"
                class="white--text"
                height="100px"
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
                  <Nuxt-link to="/pakalpojumulists" target="_blank" style="text-decoration:none">
                  Sākt
                  </Nuxt-link>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    <Footer />
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
  components: { Nav },
  name: 'IndexPage', 
  data: () => ({
      cards: [
        { title: 'Arhitektūra', src: 'arch.jpg', flex: 4 },
        { title: 'Projektēšana', src: 'proj.jpg', flex: 4 },
        { title: 'Iekšdarbi', src: 'iekš.jpg', flex: 4 },
      ],
    })
    
}
</script>
