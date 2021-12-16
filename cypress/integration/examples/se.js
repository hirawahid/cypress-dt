import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";


Given('I open digitaltol.se', () => {
    cy.visit("https://ct.digitaltolk.se/")
})

Then(`I see {string} in the title`, (title) => {
    cy.contains(title).should("be.visible")
  })