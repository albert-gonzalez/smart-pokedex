import { HEADER_SEARCH, LIST, LIST_ELEMENTS } from "../screens/common";
import { TAB_EXPLORE } from "../screens/explore";
import { SPECIES } from "../screens/pokemon";

describe("Search", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE_URL"));
  });

  describe("On Search Screen", () => {
    it("displays a list with all the pokémon if no search have been typed", () => {
      cy.get(TAB_EXPLORE).click();
      cy.get(LIST_ELEMENTS).should("have.length.above", 10);
    });

    it("opens the pokémon screen when a element of the list is clicked", () => {
      cy.get(TAB_EXPLORE).click();
      cy.get(LIST).contains("4. Charmander").click();
      cy.get(SPECIES).should("have.text", "4. charmander");
    });

    it("filters by pokémon number when the search is a number", () => {
      onExploreScreenTypeAndWaitForResults("125");
      cy.get(LIST_ELEMENTS).should("have.length.within", 2, 3);
      cy.get(LIST).contains("125. Electabuzz").should("exist");
    });

    it("filters by pokémon name when the search is a string", () => {
      onExploreScreenTypeAndWaitForResults("charm");
      assertCharmSearch();
    });

    it.skip("filters by type and pokémon name when the search is a known type", () => {
      onExploreScreenTypeAndWaitForResults("fire");
      cy.get(LIST_ELEMENTS).should("have.length.above", 20);
      cy.get(LIST).contains("136. Flareon").should("exist");
      cy.get(LIST).contains("4. Charmander").should("exist");
    });
  });

  describe("On Another Screen", () => {
    it("searches when the search is submitted instead of typing", () => {
      cy.get(HEADER_SEARCH).type("charm\n");
      assertCharmSearch();
    });

    it("does not search if the search is not submitted", () => {
      cy.get(HEADER_SEARCH).type("charm");
      cy.wait(600);
      cy.get(LIST).contains("4. charmander").should("not.exist");
    });
  });
});

const onExploreScreenTypeAndWaitForResults = (search: string) => {
  cy.get(TAB_EXPLORE).click();
  cy.get(HEADER_SEARCH).type(search);
  cy.wait(600);
  cy.get(LIST).contains("Results").should("exist");
};

const assertCharmSearch = () => {
  cy.get(LIST_ELEMENTS).should("have.length.below", 15);
  cy.get(LIST).contains("4. charmander").should("exist");
  cy.get(LIST).contains("5. charmeleon").should("exist");
  cy.get(LIST).contains("6. charizard").should("exist");
};
