<template>
    <div>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      :first-day-of-week="1"
      locale="lv-lv"
      @click="console.log(picker)"
    ></v-date-picker>
  </v-row>
  <p>{{ this.picker }}</p>
</div>
</template>

<script>
  export default {
    data () {
      return {
        picker: '',
      }
    },
  }
</script>