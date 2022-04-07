import { mount } from "@vue/test-utils";
import KbnButton from "@/components/atoms/KbnButton";

describe("KbnButton", () => {
  describe("property", () => {
    describe("type", () => {
      describe("default value", () => {
        it("kbn-button 클래스를 가지는 button 요소로 구성됨", () => {
          const button = mount(KbnButton);
          expect(button.element.tagName).toEqual("BUTTON");
          expect(button.classes()).toContain("kbn-button");
        });
      });
      describe("button", () => {
        it("kbn-button 클래스를 갖는 button 요소로 구성됨", () => {
          const button = mount(KbnButton, {
            propsData: {
              type: "button",
            },
          });
          expect(button.element.tagName).toEqual("BUTTON");
          expect(button.classes()).toContain("kbn-button");
        });
      });
      describe("text", () => {
        it("kbn-button-text 클래스를 갖는 button 요소로 구성됨", () => {
          const button = mount(KbnButton, {
            propsData: {
              type: "text",
            },
          });
          expect(button.element.tagName).toEqual("BUTTON");
          expect(button.classes()).toContain("kbn-button-text");
        });
      });
      describe("disabled", () => {
        describe("default value", () => {
          it("disabled 속성이 부여되지 않음", () => {
            const button = mount(KbnButton);
            expect(button.attributes().disabled).toBe(undefined);
          });
        });

        describe("true", () => {
          it("disabled 속성이 부여됨", () => {
            const button = mount(KbnButton, {
              propsData: {
                disabled: true,
              },
            });
            expect(button.attributes().disabled).toBe("disabled");
          });
        });
        describe("false", () => {
          it("disabled 속성이 부여되지 않음", () => {
            const button = mount(KbnButton, {
              propsData: {
                disabled: false,
              },
            });
            expect(button.attributes().disabled).toBe(undefined);
          });
        });
      });
      describe("event", () => {
        describe("click", () => {
          it("일어나지 않음", () => {
            const button = mount(KbnButton);
            button.trigger("click");
            expect(button.emitted().click.length).toEqual(1);
          });
        });
      });
      describe("slot", () => {
        describe("콘텐츠가 있음", () => {
          it("콘텐츠가 삽입됨", () => {
            const button = mount(KbnButton, {
              slots: {
                default: "<p>hello</p>",
              },
            });
            expect(button.text()).toEqual("hello");
          });
        });
        describe("콘텐츠가 없음", () => {
          it("콘텐츠가 삽입되지 않음", () => {
            const button = mount(KbnButton);
            expect(button.text()).toEqual("");
          });
        });
      });
    });
  });
});
