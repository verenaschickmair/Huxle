import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AdminView from "@/views/AdminView.vue";

describe("AdminView", () => {
  const wrapper = mount(AdminView);
  it("should render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("should find submit button", () => {
    expect(wrapper.find('[id="submitWordButton"]').exists()).toBe(true);
  });
  it("should find german word input", () => {
    expect(wrapper.find('[id="germanInput"]').exists()).toBe(true);
  });
  it("should find english word input", () => {
    expect(wrapper.find('[id="englishInput"]').exists()).toBe(true);
  });
});
