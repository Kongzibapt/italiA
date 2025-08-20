import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Input from "../input.vue";
import { createPinia, setActivePinia } from "pinia";

describe("Input", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the component correctly", async () => {
    const wrapper = mount(Input, {
      props: {
        // Ajoutez ici les props nécessaires pour le composant
        modelValue: "test value",
        id: "test-input",
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("should emit input event on value change", async () => {
    const wrapper = mount(Input, {
      props: {
        // Ajoutez ici les props nécessaires pour le composant
        modelValue: "test value",
        id: "test-input",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("test value");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["test value"]);
  });

  // Ajoutez d'autres tests spécifiques au fonctionnement de l'Input
});
