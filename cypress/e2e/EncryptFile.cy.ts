import { Scytale } from "./page-objects";

describe("Encrypt file", () => {
  it("should show a loader, encrypt the file and generate a password", () => {
    Scytale.load()
      .uploadFile("cypress/fixtures/test.file")
      .checkSpinnerVisible()
      .checkFileNameVisible()
      .checkPasswordHiddenVisible()
      .showPassword()
      .checkPasswordVisible();
  });
});
