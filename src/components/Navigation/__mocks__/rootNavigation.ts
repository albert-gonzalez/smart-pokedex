const rootNavigation = jest.createMockFromModule("../rootNavigation.ts") as any;

let currentRoute = "";

rootNavigation.navigate = jest.fn();

rootNavigation.getCurrentRoute = jest
  .fn()
  .mockImplementation(() => currentRoute);

rootNavigation.openPokemonScreen = jest.fn();

rootNavigation.setCurrentRoute = (route: string) => (currentRoute = route);

module.exports = rootNavigation;
