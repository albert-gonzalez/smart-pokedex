# Smart Pokédex App

Smart Pokédex is a mobile app made with React Native. It uses the [Favware GraphQL Pokémon API](https://www.npmjs.com/package/@favware/graphql-pokemon) to get the pokémon data.

<p align="center"><img height="400" src="./assets/screenshot.jpg"></p>

The App has 2 different screens:

- Pokémon of the Day: It shows a different pokémon every day.
- Explore: You can search pokémon by number, name and type.

## Testing

The project is unit tested with Jest and e2e tested with Cypress.

## Web version

The web app is published here: https://albert-gonzalez.github.io/smart-pokedex/

## Training

### Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- React Native Components: https://reactnative.dev/docs/components-and-apis
- Expo Docs: https://docs.expo.dev/
- React Navigation Docs: https://reactnavigation.org/docs/getting-started

### Set up

- Install Node.js >= v12
- Clone the training branch of this repo: `git clone -b training https://github.com/albert-gonzalez/smart-pokedex.git`
- Run `npm install --global expo-cli` to install Expo CLI
- Go to project folder
- Run `npm install` to install dependencies.
- Run `npm run web` to run the app in dev mode.
- Run `npm run e2e:open` to open Cypress.
- Run `npm t` to run unit tests.
- Run `npm t -- --watch` to run unit tests in watch mode.

### Exercises

1. The Search view should show a list of all of the pokémon instead of a loading page if the search input is empty.
   - File: Search.tsx
   - Unit tests: Search.test.tsx
   - E2E tests: Search.spec.ts
   - Tips:
     - Use the `renderPokemonList` function
     - You can use the `allPokemon` variable, which contains an array with all of the pokémon.
2. The Pokémon view should show a title with the number and the name of the pokémon with the format `{num}. {name}`. For example: `25. Pikachu`.
   - File: PokemonCard.tsx
   - Unit tests: PokemonCard.test.tsx
   - E2E tests: PokemonCard.spec.ts
   - Tips:
     - Use the `Text` component with the Test id `species`: https://reactnative.dev/docs/text.
     - Use the `getNameWithNum` helper function.
     - You can use the `styles.species` style object to style the text.
3. The Search should filter by pokémon type (fire, water, grass...). The filtered pokémon will be listed after the results of the API search.
   - File: Search.tsx
   - Unit tests: Search.test.tsx
   - E2E tests: Search.spec.ts
   - Tips:
     - Use `filterPokemonByTypeAndMapToItem` helper function. This function is very similar to `filterPokemonByNumAndMapToItem`.
4. Add two buttons to Pokémon view to select between normal and shiny images. The normal images are already in this view.
   - File: PokemonCard.tsx
   - Unit tests: PokemonCard.test.tsx
   - E2E tests: PokemonCard.spec.ts
   - Tips:
     - Use the `TouchableHighlight` component to make each button: https://reactnative.dev/docs/touchablehighlight.
     - Normal button test id should be `normalImageButton`.
     - Shiny button test id should be `shinyImageButton`.
     - You can use `styles.normalImageButton` and `styles.shinyImageButton` as button styles. Also, you can use `styles.selectedButton` to style the selected button.
