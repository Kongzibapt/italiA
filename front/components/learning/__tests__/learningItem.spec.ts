import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import LearningItem from "../learningItem.vue";
import { createPinia, setActivePinia } from "pinia";

// Mock du store Pinia pour les tests
vi.mock("~/stores/vocabularyStore", () => ({
  useVocabularyStore: () => ({
    getItem: (id: number) => ({
      id,
      french: "Bonjour",
      italian: "Ciao",
      options: ["Ciao", "Grazie", "Arrivederci", "Prego"],
      lastRevision: new Date("2023-01-15"),
    }),
  }),
}));

describe("LearningItem Component", () => {
  beforeEach(() => {
    // Configurer Pinia pour les tests
    setActivePinia(createPinia());
  });

  it("affiche correctement la question en français", async () => {
    const wrapper = mount(LearningItem, {
      props: {
        itemId: 1,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Bonjour");
  });

  it("émet un événement 'answer' avec la réponse sélectionnée", async () => {
    const wrapper = mount(LearningItem, {
      props: {
        itemId: 1,
      },
    });

    await flushPromises();
    await wrapper.find(".option").trigger("click");
    const emitted = wrapper.emitted("answer");
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual([
      {
        itemId: 1,
        selectedOption: "Ciao",
        correct: true,
      },
    ]);
  });

  it("affiche une réponse incorrecte quand la mauvaise option est sélectionnée", async () => {
    const wrapper = mount(LearningItem, {
      props: {
        itemId: 1,
      },
    });

    await flushPromises();

    // Sélectionner la deuxième option (qui n'est pas correcte)
    await wrapper.findAll(".option")[1].trigger("click");

    expect(wrapper.find(".incorrect").exists()).toBe(true);
  });

  it("affiche les informations de dernière révision si disponible", async () => {
    const wrapper = mount(LearningItem, {
      props: {
        itemId: 1,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Dernière révision");
  });
});
