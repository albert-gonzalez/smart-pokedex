import * as React from "react";
import { StatusBar, StyleSheet, AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { client } from "./src/api/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { colors } from "./src/styles/variables";
import { Header } from "./src/components/Header/Header";
import { Explore } from "./src/components/Explore/Explore";
import { navigationRef } from "./src/components/Navigation/rootNavigation";
import { Image } from "react-native";
import { PokemonOfTheDay } from "./src/components/Pokemon/PokemonOfTheDay";
import { Routes } from "./src/components/Navigation/routes";

function ExploreScreen() {
  return <Explore />;
}

function PokemonOfTheDayScreen() {
  return <PokemonOfTheDay />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar animated={true} backgroundColor={colors.background} />

      <NavigationContainer ref={navigationRef}>
        <Header />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveBackgroundColor: colors.stickyBgColor,
            tabBarInactiveBackgroundColor: colors.background,
            tabBarActiveTintColor: colors.text,
            tabBarStyle: { borderTopColor: colors.shadow },
            tabBarShowLabel: false,
            headerShown: false
          }}
          sceneContainerStyle={{
            backgroundColor: colors.background,
            flex: 1,
          }}
        >
          <Tab.Screen
            name={Routes.PokemonOfTheDay}
            component={PokemonOfTheDayScreen}
            options={{
              tabBarTestID: "tabPokemonOfTheDay",
              tabBarIcon: ({ focused }) => (
                <Image
                  style={styles.icon}
                  source={
                    focused
                      ? require("./assets/star.png")
                      : require("./assets/star-gray.png")
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name={Routes.Explore}
            component={ExploreScreen}
            options={{
              tabBarTestID: "tabExplore",
              tabBarIcon: ({ focused }) => (
                <Image
                  style={styles.icon}
                  source={
                    focused
                      ? require("./assets/search.png")
                      : require("./assets/search-gray.png")
                  }
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('SmartPokedex', () => App);

const styles = StyleSheet.create({
  icon: { width: 32, height: 32 },
});
