import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.69,
    top: 30,
    marginBottom: 20,
    backgroundColor: "#484c7f"
  },
  imageStyle: {
    width: "100%",
    height: "80%",
    borderRadius: 10
  },
  titleStyle: {
    paddingTop: 12,
    fontSize: 24
  },
  starsTextStyle: {
    paddingTop: 5,
    fontSize: 18
  }
});

export default class ShowItem extends Component {
  constructor(props) {
    super(props);

    this.handleShowPress = this.handleShowPress.bind(this);
  }

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

  handleShowPress() {
    const { data, navigation } = this.props;
    navigation.navigate("ShowScreen", {
      data: data
    });
  }

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handleShowPress}>
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
        <Text style={styles.titleStyle}>{data.name}</Text>
        <Text style={styles.starsTextStyle}>
          {" "}
          {data.rating.average ? data.rating.average : "0"} stars
        </Text>
        <View>{this.displayStars(data.rating.average)}</View>
      </TouchableOpacity>
    );
  }
}

ShowItem.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object
};
