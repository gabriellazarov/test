// Imports
import NavBar from "@/components/NavBar";
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

describe("NavBar.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => {
    return mount(NavBar, {
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      ...options,
    });
  };

  it("shows correct button when not logged", () => {
    const wrapper = mountFunction({
      computed: {
        isLogged() {
          return false;
        },
      },
    });

    const btn = wrapper.findAll("span.v-btn__content");
    expect(btn.length).toBe(1);
    expect(btn.at(0).text()).toContain("Sign In");
  });

  it("shows correct buttons when  logged", () => {
    const wrapper = mountFunction({
      computed: {
        isLogged() {
          return true;
        },
      },
    });

    const btn = wrapper.findAll("span.v-btn__content");
    expect(btn.length).toBe(3);
    expect(btn.at(0).text()).toContain("Profile");
    expect(btn.at(1).text()).toContain("Products");
    expect(btn.at(2).text()).toContain("Log Out");
  });
});
