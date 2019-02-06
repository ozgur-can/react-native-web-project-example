import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import axios from "axios";

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      queryText: "cat"
    };
  }

  componentDidMount() {
    axios
      .get("https://api.tvmaze.com/search/shows?q=" + this.state.queryText)
      .then(response => {
        this.setState({
          shows: response.data.map(item => item.show)
        });
      });
  }

  replaceAll(search, replacement) {
    if (search == null) return "";
    else {
      var target = [
        "<strong>",
        "</strong>",
        "<p>",
        "</p>",
        "<b>",
        "</b>",
        "<i>",
        "</i>",
        "<br>",
        "<br/>",
        "<br />",
        "—",
        "--",
        "_______",
        "–",
        "amp;",
        ".",
        ",",
        "''.",
        "''",
        "?"
      ];
      for (var i = 0; i < target.length; i++)
        search = search.split(target[i]).join(replacement);

      var target2 = " - ";
      return search.split(target2).join(" ");
    }
  }

  colourText(str) {
    return str.map((data, i) => {
      if (data.length > 5)
        return (
          <View key={i}>
            <Text
              onPress={async () => {
                await this.setState({
                  queryText: data.replace(/[^a-z0-9+]+/gi, "")
                });
                this.componentDidMount();
              }}
              style={{ color: "purple" }}
            >
              {data + " "}
            </Text>
          </View>
        );
      else {
        return (
          <View key={i}>
            <Text>{data + " "}</Text>
          </View>
        );
      }
    });
  }

  printData() {
    return (
      <FlatList
        style={{
          flex: 1,
          flexDirection: "column"
        }}
        numColumns={5}
        data={this.state.shows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, borderWidth: 1 }}>
            <Text>
              {item.image != null && (
                <Image
                  style={{
                    width: 200,
                    height: 200
                  }}
                  source={{
                    uri: item.image.original
                  }}
                />
              )}
              {"\n"}
              <Text style={{ textAlign: "center" }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>
                  {this.colourText(
                    this.replaceAll(item.summary, "").split(" ")
                  )}
                </Text>
              </Text>
            </Text>
          </View>
        )}
      />
    );
  }
  render() {
    return <View>{this.printData()}</View>;
  }
}
export default PostScreen;
