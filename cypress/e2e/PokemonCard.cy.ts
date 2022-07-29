import { LIST } from "../screens/common";
import { TAB_EXPLORE } from "../screens/explore";
import {
  BACK_IMAGE,
  CARD,
  IMAGE,
  IMAGES,
  LAST_SPECIES,
  NORMAL_IMAGE_BUTTON,
  SHINY_IMAGE_BUTTON,
  SPECIES,
} from "../screens/pokemon";

describe("Pokémon Card", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE_URL"));
  });

  it("shows pokemon information", () => {
    openExploreAndOpenPokemon("4. Charmander");
    cy.get(SPECIES).should("have.text", "4. charmander");
    cy.get(IMAGES).should("have.length", 2);

    assertImages([/\/ani\//, /\/ani-back\//]);
    assertGeneralData();
    assertStats();
    assertAbilities();
    assertEggGroups();
  });

  it("shows shiny sprite when clicking shiny button and shows again normal sprite when clicking normal button", () => {
    openExploreAndOpenPokemon("4. Charmander");
    cy.get(SHINY_IMAGE_BUTTON).click();
    assertImages([/\/ani-shiny\//, /\/ani-back-shiny\//]);

    cy.get(NORMAL_IMAGE_BUTTON).click();
    assertImages([/\/ani\//, /\/ani-back\//]);
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

const assertImages = ([frontImage, backImage]: RegExp[]) => {
  cy.get(IMAGE).find("img").should("have.attr", "src").and("match", frontImage);
  cy.get(BACK_IMAGE)
    .find("img")
    .should("have.attr", "src")
    .and("match", backImage);
};

const assertGeneralData = () => {
  const title = "General";

  assertItem(title, "Name", "charmander");
  assertItem(title, "Number", "4");
  assertItem(title, "Color", "Red");
  assertItem(title, "Height", "0.6 meters");
  assertItem(title, "Weight", "8.5 Kg.");
  assertItem(title, "Types", "Fire");
};

const assertStats = () => {
  const title = "Stats";

  assertItem(title, "HP", "39");
  assertItem(title, "Attack", "52");
  assertItem(title, "Defense", "43");
  assertItem(title, "Speed", "65");
  assertItem(title, "Special Attack", "60");
  assertItem(title, "Special Defense", "50");
  assertItem(title, "Total", "309");
};

const assertAbilities = () => {
  const title = "Abilities";

  assertItem(title, "First", "Blaze");
  assertItem(title, "Hidden", "Solar Power");
};

const assertEggGroups = () => {
  const title = "Egg Groups";

  assertValue(title, "Monster");
  assertValue(title, "Dragon");
};

const assertItem = (title: string, field: string, value: string) =>
  cy
    .get(LIST)
    .contains(title)
    .siblings()
    .contains(field)
    .siblings()
    .contains(value)
    .should("exist");

const assertValue = (title: string, value: string) =>
  cy.get(LIST).contains(title).siblings().contains(value).should("exist");
