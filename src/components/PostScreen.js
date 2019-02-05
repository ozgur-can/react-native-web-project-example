import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [{ summary: "", name: "" }]
    };
  }

  componentWillMount() {
    const query = "http://api.tvmaze.com/search/shows?q=war";

    axios.get(query).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.status) {
          var stateCopy = Object.assign({}, this.state);
          stateCopy.array[i].summary = this.repAll(
            response.data[i].show.summary,
            ""
          );
          stateCopy.array[i].name = response.data[i].show.name;
          this.setState({
            array: [...this.state.array, stateCopy]
          });
        }
      }
    });
  }

  repAll(search, replacement) {
    if (search == null) return "";
    else {
      var target = [
        "<p>",
        "</p>",
        "<b>",
        "</b>",
        "<i>",
        "</i>",
        "<br>",
        "—",
        "--",
        "_______",
        "–",
        "amp;"
      ];
      for (var i = 0; i < target.length; i++)
        search = search.split(target[i]).join(replacement);

      var target2 = " - ";
      return search.split(target2).join(" ");
    }
  }

  returnList() {
    return this.state.array.map((data, i) => {
      return (
        <View key={i}>
          <Text>{data.name}</Text>
          <Text>{data.summary}</Text>
        </View>
      );
    });
  }

  printData() {
    return (
      <FlatList
        data={this.state.array}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            {"\n"}
            {item.summary}
            {"\n\n"}
          </Text>
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.printData()}</Text>
      </View>
    );
  }
}
export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
