<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.username === "" || this.password === "") return;
      this.$store
        .dispatch("authenticateUser", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/products");
        });
    },
  },
};
</script>
