import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Button from "../button.vue";
import { createPinia, setActivePinia } from "pinia";

describe("Button", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the component correctly", async () => {
    const wrapper = mount(Button, {
      props: {
        // Ajoutez ici les props nécessaires pour le composant
      },
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Click me");
  });

  it("should emit click event when clicked", async () => {
    const wrapper = mount(Button, {
      props: {
        // Ajoutez ici les props nécessaires pour le composant
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });

  // Ajoutez d'autres tests spécifiques au fonctionnement du Button
});
