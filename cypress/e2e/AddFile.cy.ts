describe("Add files", () => {
  it("should add a new file to the list", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get(".card-title").should("have.text", "test.file");
    cy.get(".card-title").should("not.have.value", undefined);
  });
});
