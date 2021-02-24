import {} from "../components/Themed";

import * as WebBrowser from "expo-web-browser";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { actionCreators, initialState, reducer } from "../hooks/posts";

import EditScreenInfo from "../components/EditScreenInfo";

export default function TabOneScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async (url: string) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  useEffect(() => {
    async function fetchPosts() {
      dispatch(actionCreators.loading());

      try {
        const response = await fetch(
          "https://bitcoinmagazine.com/wp-json/wp/v2/posts"
        );
        const posts = await response.json();
        dispatch(actionCreators.success(posts));
      } catch (e) {
        dispatch(actionCreators.failure());
      }
    }

    fetchPosts();
  }, []);

  const { posts, loading, error } = state;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load posts!</Text>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    <FlatList
      style={styles.container}
      keyExtractor={(post) => post.id.toString()}
      data={posts}
      renderItem={({ item: { id, title, excerpt, link }, index }) => (
        <View key={id} style={styles.post}>
          <Pressable
            onPress={() => {
              _handlePressButtonAsync(link);
            }}>
            <Text style={styles.title}>{title.rendered}</Text>
            <Text style={styles.body}>
              {excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
            </Text>
          </Pressable>
        </View>
      )}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  body: {
    marginTop: 10,
    fontSize: 14,
    color: "#F8F8F8",
  },
  post: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 20,
    paddingRight: 20,
    marginLeft: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
