import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
    const wrapper = mount(HomeView)
    it('should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
})