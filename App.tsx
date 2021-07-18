import React, { Fragment } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ThemeProvider } from "react-native-elements";
import Routes from "./routes/Routes";
export default function App() {
  return (
    <ThemeProvider>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </Fragment>
    </ThemeProvider>
  );
}
