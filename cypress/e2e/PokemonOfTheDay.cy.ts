import { IMAGES, TITLE } from "../screens/pokemon";

describe("Pokémon of the day", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE_URL"));
  });

  it("displays a random pokémon", () => {
    cy.get(TITLE).should("have.text", "Pokémon of the Day");
    cy.get(IMAGES).should("have.length", 2);
  });
});
