<template>
  <div>
    <template v-if="loading">
      <!-- Show a loading indicator or skeleton screen -->
      <p>Loading...</p>
    </template>
    <template v-else>
      <template v-if="user.hasOwnProperty('Vards')">
        <!-- Render user data -->
        <h1>Profile</h1>
        <p>Role: {{ role }}</p>
        <p>ID: {{ id }}</p>
        <p>Vārds: {{ user.Vards }}</p>
        <p>Uzvārds: {{ user.Uzvards }}</p>
        <p>E-Pasts: {{ user.Epasts }}</p>
        <!-- Other user details -->
      </template>
      <template v-else>
        <!-- User not found -->
        <p>User not found</p>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      user: null
    };
  },
  computed: {
    role() {
      return this.$route.params.role;
    },
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await this.$axios.post('/api/v2/profils/', {
          Role: this.role,
          ID: this.id
        });

        // Check if user data exists in the response
        if (response.data) {
          this.user = response.data;
        } else {
          // User or role not found
          // Redirect the user to the 404 page using programmatic navigation
          this.$router.push('/404');
        }
      } catch (error) {
        // Handle the error
        console.log(error.message);
        // Redirect the user to the 404 page using programmatic navigation
        this.$router.push('/404');
      } finally {
        this.loading = false; // Set loading to false after the request is completed
      }
    }
  }
};
</script>
