<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-alert
          style="margin-bottom: -56px"
            color="red"
            elevation="4"
            type="error"
            v-show="error"
            @click="onDismiss"
            transition="scale-transition"
            >{{ error }}</v-alert
          >
          <v-card class="elevation-12" style="margin-top: 150px">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                  prepend-icon="mail"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="username"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="[rules.required]"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
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
        })
        .catch((err) => {
          console.log(err.message);
          this.error = err.message;
          setTimeout(() => {
            this.error = "";
          }, 2500);
        });
    },
    onDismiss() {
      this.error = "";
    },
  },
};
</script>
