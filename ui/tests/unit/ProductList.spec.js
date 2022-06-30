// Imports
import ProductList from "@/components/ProductList";
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

describe("ProductList.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => {
    return mount(ProductList, {
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      methods: {
        getProducts() {
          this.products = testProducts;
        },
      },
    });
  };

  const testProducts = [
    {
      id: "9e8ffbc7-3681-4438-8f11-486b3c565fc2",
      appId: "9e8ffbc7-3681-4438-8f11-486b3c565fc2",
      inSubscription: false,
      title: "AI Traffic",
      subtitle: "Delivering the most precise & actionable traffic data​",
      description:
        "Highly accurate traffic data for improved insight into traffic time, speed data, traffic volume, roadway incidents, and more. AI Traffic is comprised of INRIX Drive Time, Smart Alerts, Speed, and Volume Profiles.​",
      subscription: "subscribed",
    },
    {
      id: "de59d8be-efd8-4f82-8058-a515d54c23f5",
      appId: "de59d8be-efd8-4f82-8058-a515d54c23f5",
      inSubscription: false,
      title: "Trip Analytics",
      subtitle:
        "Ready-to-query trips data that accelerates insights and decisions​",
      description:
        "Highly accurate data that provides accurate insight into the trips people take, including where they begin and end their journeys and route taken. Trips also includes highly accurate map matching to the road network.​",
      subscription: "subscribed",
    },
  ];

  it("renders correctly", () => {
    const wrapper = mountFunction();

    expect(wrapper.findAll("li").length).toBe(2);
  });

  it("all buttons that should alert do so", async () => {
    const wrapper = mountFunction();

    let alertsCalled = 0;
    jest.spyOn(window, "alert").mockImplementation(() => {
      alertsCalled++;
    });
    const btns = wrapper.find("li").findAll("button");

    await btns.at(0).trigger("click");
    await btns.at(1).trigger("click");
    await btns.at(2).trigger("click");

    expect(alertsCalled).toBe(2);
  });
});
