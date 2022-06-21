<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>
        <span>{{ appTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
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
      sidebar: false,
      menuItems: [
        { title: "Products", path: "/products", icon: "inventory" },
        { title: "Sign In", path: "/auth", icon: "lock_open" },
      ],
    };
  },
};
</script>
