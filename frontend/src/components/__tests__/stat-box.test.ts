// src/components/__tests__/stat-box.test.ts
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import StatBox from "../stat-box.vue";

describe("statBox", () => {
  it("renders", () => {
    const wrapper = mount(StatBox, {
      props: {
        title: "Test Title",
        value: "Test Value",
        className: "test-class",
      },
    });
    expect(wrapper.html()).toBeDefined();
  });

  it("renders with required props", () => {
    const wrapper = mount(StatBox, {
      props: {
        title: "Test Title",
        value: "Test Value",
        className: "test-class",
      },
    });

    expect(wrapper.find(".stat-title").text()).toBe("Test Title");
    expect(wrapper.find(".stat-value").text()).toBe("Test Value");
    expect(wrapper.find(".stat-figure").classes()).toContain("test-class");
  });

  it("renders with optional icon prop", () => {
    const wrapper = mount(StatBox, {
      props: {
        title: "Test Title",
        value: "Test Value",
        className: "test-class",
        icon: "icon-name",
      },
    });

    expect(wrapper.find(`[data-testid='icon-name']`).exists()).toBe(true);
  });

  it("renders with custom className", () => {
    const wrapper = mount(StatBox, {
      props: {
        title: "Test Title",
        value: "Test Value",
        className: "test-class",
      },
    });

    expect(wrapper.find(".stat-figure").classes()).toContain("test-class");
    expect(wrapper.find(".stat-value").classes()).toContain("test-class");
  });
});
