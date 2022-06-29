describe("Add files", () => {
  it("should add a new file to the list", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get("tbody > tr > :nth-child(1)").should("have.text", "test.file");
    cy.get("tbody > tr > :nth-child(2).input-group input").should(
      "not.have.value",
      undefined
    );
    cy.get("tbody > tr > :nth-child(3) > a").should(
      "have.text",
      "Download original file"
    );
    cy.get("tbody > tr > :nth-child(4) > a").should(
      "have.text",
      "Download encrypted file"
    );
    cy.get("tbody > tr > :nth-child(5)").should("have.text", "Share file");
  });
});
