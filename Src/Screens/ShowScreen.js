import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: Dimensions.get("window").width,
    justifyContent: "center",
    backgroundColor: "#c36a2d"
  },
  imageStyle: {
    width: "100%",
    height: Dimensions.get("window").height * 0.69
  },
  starsSectionStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 24
  },
  starsTextStyle: {
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 18
  },
  textWrapper: {
    width: "93%",
    textAlign: "center",
    paddingTop: 5
  },
  showSummaryStyle: {
    fontSize: 14,
    fontSize: 17,
    fontWeight: "500"
  },
  extraData: {
    alignItems: "flex-start",
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: "3%"
  },
  lineStyle: {
    marginTop: 10,
    fontSize: 16
  },
  titlesStyle: {
    fontSize: 22,
    fontWeight: "500"
  }
});

export default class ShowScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("data").name
    };
  };

  displayStars(numOfStarsToDisplay) {
    let arrOfStars = [];
    for (let i = 1; i < numOfStarsToDisplay; i++)
      arrOfStars.push(<Icon name="star" size={32} color="black" />);

    if (numOfStarsToDisplay % 1 >= 0.3 && numOfStarsToDisplay % 1 <= 0.7)
      arrOfStars.push(<Icon name="star-half" size={32} color="black" />);
    else if (numOfStarsToDisplay % 1 > 0.7)
      arrOfStars.push(<Icon name="star" size={32} color="black" />);

    return <View style={{ flexDirection: "row" }}>{arrOfStars}</View>;
  }

  generateStringFromArray(arrayToDisplay) {
    let genresString = "";
    for (let i = 0; i < arrayToDisplay.length; i++) {
      genresString = genresString.concat(arrayToDisplay[i]);
      if (arrayToDisplay.length - i !== 1)
        genresString = genresString.concat(", ");
    }
    return genresString;
  }

  cleanHtmlTagsFromShowReview(textToClean) {
    let summaryText;
    if (!textToClean) {
      summaryText = "No review for this show.";
      return summaryText;
    }
    summaryText = textToClean;
    let regex = /(<([^>]+)>)/gi;
    summaryText = summaryText.replace(regex, "");
    return summaryText;
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");
    let summaryText = this.cleanHtmlTagsFromShowReview(data.summary);

    return (
      <SafeAreaView style={{ backgroundColor: "#c36a2d" }}>
        <ScrollView>
          <View style={styles.container}>
            {data.image ? (
              <Image
                source={{ uri: data.image.original }}
                style={styles.imageStyle}
              />
            ) : (
              <Image
                source={require("../../assets/imageNotFound.png")}
                style={styles.imageStyle}
              />
            )}

            <View style={styles.starsSectionStyle}>
              <Text style={styles.starsTextStyle}>
                {data.rating.average ? data.rating.average : "0"} stars
              </Text>
              <View>{this.displayStars(data.rating.average)}</View>
              <View style={styles.textWrapper}>
                <Text style={styles.showSummaryStyle}>{summaryText}</Text>
              </View>
            </View>

            <View style={styles.extraData}>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Genres: </Text>{" "}
                {data.genres.length > 0
                  ? this.generateStringFromArray(data.genres)
                  : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Days: </Text>{" "}
                {data.schedule.days > 0
                  ? this.generateStringFromArray(data.schedule.days)
                  : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Time: </Text>
                {data.schedule.time ? data.schedule.time : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Country Details: </Text>{" "}
                {data.network
                  ? data.network.country.name + ", " + data.network.country.code
                  : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Time Zone: </Text>{" "}
                {data.network ? data.network.country.timezone : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Network Name: </Text>{" "}
                {data.network ? data.network.name : "-"}
              </Text>
              <Text style={styles.lineStyle}>
                <Text style={styles.titlesStyle}>Language: </Text>{" "}
                {data.language ? data.language : "-"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ShowScreen.propTypes = {
  navigation: PropTypes.object
};
