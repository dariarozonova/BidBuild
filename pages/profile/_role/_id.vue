<template>
  <div>
    <h1>Profile</h1>
    <p>Role: {{ role }}</p>
    <p>ID: {{ id }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    role() {
      return this.$route.params.role; // Get the role from the URL
    },
    id() {
      return this.$route.params.id; // Get the ID from the URL
    }
  }
}
</script>
