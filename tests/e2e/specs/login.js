// https://docs.cypress.io/api/introduction/api.html

describe("login", () => {
  describe("login success", () => {
    it("success", () => {
      cy.visit("/");
      cy.contains("h1", "Kanban App");
      cy.get("#email").type("foo@domian.com");
      cy.get("#password").type("12345678");
      cy.contains("로그인").click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/");
      });
      cy.contains("p", "보드 페이지");
    });
  });
  describe("login fail", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.contains("h1", "Kanban App");
    });
    it("login failed", () => {
      cy.get("#email").type("foo@domian.com");
      cy.get("#password").type("worngpassword");
      cy.contains("로그인").click();
      cy.contains("p", "login failed");
    });
    it("unregistered user", () => {
      cy.get("#email").type("unregistered@domian.com");
      cy.get("#password").type("worngpassword");
      cy.contains("로그인").click();
      cy.contains("p", "unregistered user");
    });
  });
});
