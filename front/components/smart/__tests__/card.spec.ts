import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Card from "../card.vue";
import { createPinia, setActivePinia } from "pinia";

describe("Card", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the component correctly", async () => {
    const wrapper = mount(Card, {
      props: {
        title: "Card title",
        description: "Card content",
        buttonText: "Button text",
        onClick: vi.fn(),
      },
      global: {
        stubs: {
          SmartButton: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Card title");
    expect(wrapper.text()).toContain("Card content");
  });

  // Ajoutez d'autres tests spécifiques au fonctionnement de la Card
});
