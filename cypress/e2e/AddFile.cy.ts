describe("Add files", () => {
  it("should add a new file to the list", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get(".card-title").should("have.text", "test.file");
    cy.get("code")
      .invoke("text")
      .should("match", /^[*]*?$/g);
    cy.get(".bi").click();
    cy.get("code")
      .invoke("text")
      .should("match", /^[a-zA-Z0-9+]*=$/g);
    cy.get(".col-md-6 > :nth-child(2)").click();
    cy.contains("Drag").should("exist");
  });
});
