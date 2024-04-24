/// <reference types="cypress" />
// The app has to be running in dev mode
// Tests are done on chrome
// Avoid running all test files at the same time

import { currentVersion } from "../../src/config/Constants";
import "cypress-file-upload";
import "cypress-real-events/support";

const path = require("path");
const downloadsFolder = Cypress.config("downloadsFolder");

let encryptionPassword;

describe("Symmetric encryption test", () => {
  beforeEach(() => {
    //locate app in dev mode
    cy.visit('/');

    //displays app title
    cy.contains("Secure.sh");

    //runs the correct version
    cy.contains(currentVersion);
  });

  it("loads a file and encrypt", () => {
    cy.wait(2500);
    // the paht of the tested file
    const file = "../files/document.txt";
    // select the file
    cy.contains("Choose files to encrypt");
    cy.get(".submitFile").should("be.disabled");
    cy.get("#enc-file").attachFile(file);
    cy.get(".submitFile").realClick();

    cy.wait(500);
    // make sure file was submitted
    // generate random password
    cy.contains("Choose a strong Password");
    cy.get(".submitKeys").should("be.disabled");
    cy.get(".generatePasswordBtn").realClick();
    // save the encryption password temporarily for later use in decryption
    cy.get("#encPasswordInput")
      .invoke("val")
      .then((val) => {
        encryptionPassword = val;
        cy.log(encryptionPassword);
      });
    cy.get(".submitKeys").realClick();

    cy.wait(500);
    // click the encyption button after a file and pass were submitted
    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener("click", () => {
          setTimeout(function () {
            doc.location.reload();
          }, 2500);
        });

        // make sure sw responded
        cy.intercept("/", (req) => {
          req.reply((res) => {
            expect(res.statusCode).to.equal(200);
          });
        });

        cy.get(".downloadFile").realClick();
      });

      cy.wait(2500);
  });

  it("verify the encrypted file path", () => {
    // look up the file in the created downloads directory
    let encryptedFile = path.join(downloadsFolder, "document.txt.enc");
    // make sure a file with that name exists
    cy.readFile(encryptedFile).should("exist");
  });

    it("cleans downloads folder", () => {
    //clean downloads folder
    cy.task("deleteFolder", downloadsFolder);
  });
});
