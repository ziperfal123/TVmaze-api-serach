import React, { Component } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import PropTypes from "prop-types";

export default class SearchBarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
  }

  handleUpdateSearch(searchValue) {
    this.setState({ searchValue });
  }

  handleSubmit() {
    this.props.handleSearch(this.searchRef.props.value);
  }

  render() {
    const { searchValue } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.handleUpdateSearch}
          onSubmitEditing={this.handleSubmit}
          value={searchValue}
          ref={searchRef => {
            this.searchRef = searchRef;
          }}
          lightTheme
        />
      </View>
    );
  }
}

SearchBarComp.propTypes = {
  handleSearch: PropTypes.func
};
