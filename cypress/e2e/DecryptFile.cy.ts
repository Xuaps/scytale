import { Scytale } from "./page-objects";

describe("Decrypt file", () => {
  it("should show a loader and decrypt the file", () => {
    Scytale.load()
      .uploadFile(
        "cypress/fixtures/EZTghagSe4vJ4EJTF0zSOa0MYyzxBl5wrAR0c-AK3_MCA64aq51MZT5ECUjs-A9q27oQGIzqFum56eZ8Jy3N2AqQb1UGHBDR76ENFHa5V-U.scytale"
      )
      .setPassword("Kw+A+SokSR3WL1RD5PQxzDVLeu4=")
      .checkSpinnerVisible()
      .checkFileNameVisible("finger-pressing-virtual-lock (1).jpg");
  });
});
