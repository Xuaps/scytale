describe("Download encrypted file", () => {
  const downloadsFolder = Cypress.config("downloadsFolder");

  it("should add a new file to the list", () => {
    cy.visit("/");
    cy.get("input[type=file]").selectFile("cypress/fixtures/test.file", {
      force: true,
    });
    cy.get("tbody > tr > :nth-child(3) > a").click();

    cy.get("tbody > tr > :nth-child(3) > a")
      .should("have.attr", "href")
      .then((dataUrl) => {
        const id = dataUrl.toString().split("/")[3];
        const downloadedFilename = `${downloadsFolder}/${id}`;

        cy.readFile(downloadedFilename).should("exist");
      });
  });
});
