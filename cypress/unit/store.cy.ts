import { encryptedFiles } from "../../src/infra/store";

describe("encryptedFiles", () => {
  afterEach(() => {
    cy.clearLocalStorage();
  });

  it("should persist state in the local storage", () => {
    const file = {
      id: "1",
      name: "file1",
      password: "password1",
      encryptedFile: new File([], "test"),
    };
    encryptedFiles.add(file);

    expect(localStorage.getItem("encryptedFiles")).to.eq(
      JSON.stringify([file])
    );
  });
});
