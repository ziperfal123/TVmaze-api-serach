import React, { Fragment } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import NavigatorContainer from "./Src/Navigation";
import Footer from "./Src/Components/Footer";
const styles = StyleSheet.create({});

const App = () => {
  return (
    <Fragment>
      <NavigatorContainer />
      <Footer />
    </Fragment>
  );
};

export default App;
