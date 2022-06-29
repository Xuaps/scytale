describe("Add files", () => {
  it("should encrypt the file", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get("td.input-group input").should("not.have.value", undefined);
  });
});
