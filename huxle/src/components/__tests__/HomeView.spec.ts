import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
    const wrapper = mount(HomeView)
    it('should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
    it('should find admin button', () => {
        expect(wrapper.find('[id="redirectToAdminButton"]').exists()).toBe(true)
    });
    it('should find game code button', () => {
        expect(wrapper.find('[id="checkGameCodeButton"]').exists()).toBe(true)
    });
    it('should find game code input', () => {
        expect(wrapper.find('[id="code"]').exists()).toBe(true)
    });
})