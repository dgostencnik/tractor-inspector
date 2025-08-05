import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import DisplayMessage from "../display-message.vue";

describe("displayMessage", () => {
  it("renders", () => {
    const wrapper = mount(DisplayMessage);
    expect(wrapper.html()).toBeDefined();
  });

  it("renders with title and description", () => {
    const wrapper = mount(DisplayMessage, {
      props: {
        title: "Title",
        description: "Description",
      },
    });

    expect(wrapper.find("h3").text()).toBe("Title");
    expect(wrapper.find("p").text()).toBe("Description");
  });

  it("renders with icon", () => {
    const wrapper = mount(DisplayMessage, {
      props: {
        title: "Title",
        description: "Description",
        icon: "tabler:alert-triangle",
      },

    });
    expect(wrapper.find(`[data-testid='tabler:alert-triangle']`).exists()).toBe(true);
  });

  it("renders with custom slot", () => {
    const wrapper = mount(DisplayMessage, {
      props: {
        title: "Test",
        description: "Description",
      },
      slots: {
        default: "<h1>Custom Slot</h1>",
      },
    });
    expect(wrapper.find("h1").text()).toBe("Custom Slot");
  });
});
