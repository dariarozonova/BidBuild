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
            <h1 class="font-weight-bold orange--text">Mēs esam BidBuild</h1>
            <h2 class="font-weight-bold indigo--text">  Mēs esam jauna BidBuild sistēma, kur mūsu lietotājiem būs iespējams
              atrast sev visizdevīgāko būvniecības darbu pakalpojumu piegādātāju, atkarībā no vietas, cenas un kvalitātes, bet lietotājiem, kuri piedāvā pakalpojumus, būs iespējams paplašināt sev potenciālo klientu daudzumu.</h2>
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
            v-for="card in cards1"
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
                    <Nuxt-link :to='card.link' target="_blank" style="text-decoration:none">
                    Sākt
                    </Nuxt-link>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="card in cards2"
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
                    <Nuxt-link :to='card.link' target="_blank" style="text-decoration:none">
                    Sākt
                    </Nuxt-link>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-layout>
            </v-card>
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
      cards1: [
        { title: 'Arhitektūra', src: 'arch.jpg', flex: 4, link: '/sludinajumi?type=arhitektura' },
        { title: 'Projektēšana', src: 'proj.jpg', flex: 4, link: '/sludinajumi?type=projektesana' },
        { title: 'Iekšdarbi', src: 'iekš.jpg', flex: 4, link: '/sludinajumi?type=ieksdarbi' },
      ],
      cards2: [
        { title: 'Āra darbi', src: 'ara1.jpg', flex: 4, link: '/sludinajumi?type=aradarbi' },
        { title: 'Dizains', src: 'design2.jpg', flex: 4, link: '/sludinajumi?type=dizains' },
        { title: 'Dārza darbi', src: 'darzs.jpg', flex: 4, link: '/sludinajumi?type=darzadarbi' },
      ]
    }
  },


}
</script>
