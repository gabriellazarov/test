<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form readonly>
              <v-text-field
                id="id"
                prepend-icon="numbers"
                name="id"
                label="ID"
                type="text"
                v-model="profile.id"
              ></v-text-field>
              <v-text-field
                id="email"
                prepend-icon="mail"
                name="email"
                label="Email"
                type="text"
                v-model="profile.email"
              ></v-text-field>
              <div class="userName">
                <v-text-field
                  id="firstName"
                  prepend-icon="badge"
                  name="firstName"
                  label="First Name"
                  type="text"
                  v-model="profile.firstName"
                ></v-text-field>
                <v-text-field
                  id="lastName"
                  class="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  v-model="profile.lastName"
                ></v-text-field>
              </div>
              <v-text-field
                id="parents"
                prepend-icon="code"
                name="parents"
                label="Parents"
                type="text"
                v-model="profile.parents"
              ></v-text-field>
              <v-expansion-panels id="dropdown">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Preferences
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-text-field
                      v-for="(value, key, index) in preferences"
                      :key="index"
                      prepend-icon="code"
                      :name="key"
                      :label="key"
                      type="text"
                      :value="!!value ? value : 'N/A'"
                    ></v-text-field>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
      profile: {},
      preferences: {},
    };
  },
  methods: {
    getProfile() {
      this.profile = JSON.parse(this.$store.state.profile);
      this.preferences = this.profile.preferences.global;
    },
  },
  created() {
    this.getProfile();
    console.log(this.profile);
    console.log(this.preferences);
  },
};
</script>

<style>
.userName {
  display: flex;
  flex-wrap: wrap;
}
.lastName {
  margin-left: 15px;
}
</style>
