import { Scytale } from "./page-objects";

describe("Decrypt file", () => {
  it("should show a loader and decrypt the file", () => {
    Scytale.load()
      .uploadFile(
        "cypress/fixtures/0G4K4QPJUDE47Q9hlpj7CecZOM2tL4TCI4ciKob-rBS1T-XVgMSbX0_J8W6mi17LNE3YkR0.scytale"
      )
      .checkSpinnerVisible()
      .checkFileNameVisible();
  });
});
