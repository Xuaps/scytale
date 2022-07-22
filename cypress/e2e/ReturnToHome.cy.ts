import { Scytale } from "./page-objects";

describe("Return to home", () => {
  it("should return to home screen", () => {
    Scytale.load()
      .uploadFile("cypress/fixtures/test.file")
      .returnHome()
      .checkAtHome();
  });
});
