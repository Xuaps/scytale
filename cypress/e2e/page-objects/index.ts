const downloadsFolder = Cypress.config("downloadsFolder");

export const Scytale = {
  load: () => {
    cy.visit("/");

    return Scytale;
  },
  uploadFile: (file: string) => {
    cy.get("input[type=file]").selectFile(file, {
      force: true,
    });

    return Scytale;
  },
  showPassword: () => {
    cy.get(".bi").click();

    return Scytale;
  },
  returnHome: () => {
    cy.get(".col-md-6 > :nth-child(2)").click();

    return Scytale;
  },
  setPassword: (password: string) => {
    cy.get("input[type=password]").type(password);
    cy.get("button").click();

    return Scytale;
  },
  downloadFile: () => {
    cy.get(".btn-secondary").click();

    return Scytale;
  },
  checkSpinnerVisible: () => {
    cy.get("[data-testid='spinner']").should("be.visible");

    return Scytale;
  },
  checkFileNameVisible: (filename = "test.file") => {
    cy.get(".card-title").should("have.text", filename);

    return Scytale;
  },
  checkPasswordHiddenVisible: () => {
    cy.get("code")
      .invoke("text")
      .should("match", /^[*]*?$/g);

    return Scytale;
  },
  checkPasswordVisible: () => {
    cy.get("code")
      .invoke("text")
      .should("match", /^[a-zA-Z0-9/+]*=$/g);

    return Scytale;
  },
  checkAtHome: () => {
    cy.contains("Drag").should("exist");

    return Scytale;
  },
  checkFileDownloaded: () => {
    cy.get(".btn-secondary")
      .should("have.attr", "download")
      .then((dataUrl) => {
        const downloadedFilename = `${downloadsFolder}/${dataUrl}`;

        cy.readFile(downloadedFilename).should("exist");
      });
    return Scytale;
  },
};
