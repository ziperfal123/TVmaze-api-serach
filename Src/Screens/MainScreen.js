import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from "react-native";
import PropTypes from "prop-types";

import ShowItem from "../Components/ShowItem";
import SearchBarComp from "../Components/SearchBarComp";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#c36a2d"
  },
  emptyResultStyle: {
    fontSize: 30,
    marginTop: Dimensions.get("window").height * 0.25
  },
  loadAnimationStyle: {
    top: Dimensions.get("window").height * 0.4
  },
  scrollListStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100
  }
});

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplayLoadingAnimation: true,
      listOfShows: []
    };

    this.renderShow = this.renderShow.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static navigationOptions = {
    title: "TVmaze Search"
  };

  componentDidMount() {
    fetch(`http://api.tvmaze.com/shows`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          listOfShows: data,
          shouldDisplayLoadingAnimation: false
        });
      });
  }

  renderShow(item, index) {
    return (
      <ShowItem key={index} data={item} navigation={this.props.navigation} />
    );
  }

  async handleSearch(valueToSearch) {
    this.setState({ shouldDisplayLoadingAnimation: true });
    if (valueToSearch === "") {
      await fetch(`http://api.tvmaze.com/shows`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            listOfShows: data,
            shouldDisplayLoadingAnimation: false
          });
        });
    } else {
      await fetch(`http://api.tvmaze.com/search/shows?q=${valueToSearch}`)
        .then(res => res.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) data[i] = data[i].show;
          this.setState({
            listOfShows: data,
            shouldDisplayLoadingAnimation: false
          });
        });
    }
  }

  render() {
    const { shouldDisplayLoadingAnimation, listOfShows } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {shouldDisplayLoadingAnimation ? (
          <ActivityIndicator
            size="large"
            color="#484c7f"
            style={styles.loadAnimationStyle}
          />
        ) : (
          <View>
            <SearchBarComp handleSearch={this.handleSearch} />
            <ScrollView contentContainerStyle={styles.scrollListStyle}>
              {listOfShows.length > 0 ? (
                listOfShows.map(this.renderShow)
              ) : (
                <View>
                  <Text style={styles.emptyResultStyle}>
                    No results.. Try again :)
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

MainScreen.propTypes = {
  navigation: PropTypes.object
};
