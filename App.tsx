import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { client } from "./src/api/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { colors } from "./src/styles/variables";
import { Header } from "./src/components/Header/Header";
import { Explore } from "./src/components/Explore/Explore";
import { navigationRef } from "./src/components/Navigation/RootNavigation";
import { Image } from "react-native";
import { PokemonOfTheDay } from "./src/components/Pokemon/PokemonOfTheDay";

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
          tabBarOptions={{
            activeBackgroundColor: colors.stickyBgColor,
            inactiveBackgroundColor: colors.background,
            activeTintColor: colors.text,
            style: { borderTopColor: colors.shadow },
            showLabel: false,
          }}
          sceneContainerStyle={{
            backgroundColor: colors.background,
            height: "100%",
          }}
        >
          <Tab.Screen
            name="PokemonOfTheDay"
            component={PokemonOfTheDayScreen}
            options={{
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
            name="Explore"
            component={ExploreScreen}
            options={{
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

const styles = StyleSheet.create({
  icon: { width: 32, height: 32 },
});
