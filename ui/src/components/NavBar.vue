<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>
        <span>{{ appTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <template v-if="isLogged">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn></template
        >
        <v-btn text to="/auth" @click="logout">
          <v-icon left dark>lock_open</v-icon>
          {{ isLogged ? "Log Out" : "Sign In" }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: "R&D Assignement",
      menuItems: [
        { title: "Profile", path: "/profile", icon: "person" },
        { title: "Products", path: "/products", icon: "inventory" },
      ],
    };
  },
  methods: {
    logout() {
      if (this.isLogged) {
        this.$store.dispatch("logout");
        this.$router.push("/auth");
      }
    },
  },
  computed: {
    isLogged() {
      return !!this.$store.state.token;
    },
  },
};
</script>
