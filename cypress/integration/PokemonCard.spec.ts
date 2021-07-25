import { LIST } from "../screens/common";
import { TAB_EXPLORE } from "../screens/explore";
import { CARD, IMAGES, LAST_SPECIES, SPECIES } from "../screens/pokemon";

describe("Pokémon Card", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE_URL"));
  });

  it("shows pokemon information", () => {
    openExploreAndOpenPokemon("4. Charmander");
    cy.get(SPECIES).should("have.text", "4. charmander");
    cy.get(IMAGES).should("have.length", 2);

    assertGeneralData();
    assertStats();
    assertAbilities();
  });

  it("opens a pokemon evolution if it is clicked", () => {
    openExploreAndOpenPokemon("4. Charmander");
    cy.get(CARD).contains("5. charmeleon").click();
    cy.get(LAST_SPECIES).should("have.text", "5. charmeleon");
  });

  it("opens a pokemon pre-evolution if it is clicked", () => {
    openExploreAndOpenPokemon("5. Charmeleon");
    cy.get(CARD).contains("4. charmander").click();
    cy.get(LAST_SPECIES).should("have.text", "4. charmander");
  });
});

const openExploreAndOpenPokemon = (pokemon: string) => {
  cy.get(TAB_EXPLORE).click();
  cy.get(LIST).contains(pokemon).click();
};

const assertGeneralData = () => {
  assertItem("Number", "4");
  assertItem("Name", "charmander");
  assertItem("Color", "Red");
  assertItem("Height", "0.6 meters");
  assertItem("Weight", "8.5 Kg.");
  assertItem("Types", "Fire");
};

const assertStats = () => {
  assertItem("HP", "39");
  assertItem("Attack", "52");
  assertItem("Defense", "43");
  assertItem("Speed", "65");
  assertItem("Special Attack", "60");
  assertItem("Special Defense", "50");
  assertItem("Total", "309");
};

const assertAbilities = () => {
  assertItem("First", "Blaze");
  assertItem("Hidden", "Solar Power");
};

const assertItem = (field: string, value: string) =>
  cy.get(LIST).contains(field).siblings().contains(value).should("exist");
