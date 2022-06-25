describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get("ul li:first label").should("have.text", "Password");
  });
});

