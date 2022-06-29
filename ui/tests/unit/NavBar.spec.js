// Imports
import NavBar from "../../src/components/NavBar";
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
      ...options,
    });
  };

  it("should work", () => {
    const wrapper = mountFunction({
      computed: { isLogged: false },
    });
  });
});
