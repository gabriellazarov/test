// Imports
import ProfilePage from "@/components/ProfilePage";
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

describe("ProfilePage.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = () => {
    return mount(ProfilePage, {
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      methods: {
        getProfile() {
          this.profile = testProfile;
          this.preferences = testProfile.preferences.global;
        },
      },
    });
  };

  const testProfile = {
    email: "testmail@mail.com",
    firstName: "Tester",
    lastName: "Testerson",
    id: "testID",
    parents: "test-parent-ID",
    preferences: {
      global: {
        dateFormat: null,
        locale: "en-US",
        timeFormat: null,
        timeZone: null,
        units: null,
      },
    },
  };

  it("renders correctly", () => {
    const wrapper = mountFunction();

    expect(wrapper.find("input#id").element.value).toBe("testID");
    expect(wrapper.find("input#email").element.value).toBe("testmail@mail.com");
    expect(wrapper.find("input#firstName").element.value).toBe("Tester");
    expect(wrapper.find("input#lastName").element.value).toBe("Testerson");
    expect(wrapper.find("input#parents").element.value).toBe("test-parent-ID");

    expect(wrapper.find("div.v-expansion-panel").exists()).toBe(true);
  });

  it("preferences dropdown is hidden until clicked", () => {
    const wrapper = mountFunction();

    expect(wrapper.find("div.v-expansion-panel-content").exists()).toBe(false);
  });

  it("preferences dropdown is shown when clicked", async () => {
    const wrapper = mountFunction();

    await wrapper.find("button.v-expansion-panel-header").trigger("click");
    expect(wrapper.find("div.v-expansion-panel-content").exists()).toBe(true);
  });
});
