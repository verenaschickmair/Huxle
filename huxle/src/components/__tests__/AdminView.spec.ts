import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import AdminView from "@/views/AdminView.vue";

describe("AdminView", () => {
    const wrapper = mount(AdminView)
    it('should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
})