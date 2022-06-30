// Imports
import LoginComp from "@/components/LoginComp";
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

describe("LoginComp.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => {
    return mount(LoginComp, {
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      ...options,
    });
  };

  it("renders correctly", () => {
    const wrapper = mountFunction();

    expect(wrapper.find("header.v-sheet").text()).toBe("Login form");
    expect(wrapper.find("form.v-form").exists()).toBe(true);
    const labels = wrapper.findAll("label.v-label");
    expect(labels.at(0).text()).toBe("Email");
    expect(labels.at(1).text()).toBe("Password");
  });
});
