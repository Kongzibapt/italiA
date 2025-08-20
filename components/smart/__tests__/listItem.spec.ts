import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import ListItem from "../listItem.vue";
import { createPinia, setActivePinia } from "pinia";

describe("ListItem", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the component correctly", async () => {
    const wrapper = mount(ListItem, {
      props: {
        // Ajoutez ici les props nécessaires pour le composant
        word: {
          italian: "Ciao",
          french: "Bonjour",
        },
        index: 0,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Ajoutez d'autres tests spécifiques au fonctionnement du ListItem
});
