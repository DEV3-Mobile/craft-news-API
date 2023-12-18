import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';

import NewsItem from '../components/NewsItem';

const NewsScreen = ({ navigation }) => {
  const [articles, getArticles] = useState([]);

  const getNewsArticles = async () => {
    try {
      //127.0.0.1 -> surft naar dit toestel
      //10.0.2.2 -> surft naar host toestel

      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:63469/api/news/";
      }
      else {
        url = "http://craft-news-a.ddev.site/api/news/";
      }

      const response = await fetch(url, {
        "method": "GET",
      });
      const json = await response.json();
      getArticles(json.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNewsArticles();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Craft Headlines</Text>
      <FlatList
        style={styles.list}
        data={articles}
        keyExtractor={item => item.id}//gebruik id als key voor de flatlist
        renderItem={({ item }) => {
          if (Platform.OS == 'android') {
            item.bannerImg = item.bannerImg.replace('craft-news-a.ddev.site', '10.0.2.2:63469')
          }
          // console.log(item.bannerImg);
          return <NewsItem
            id={item.id}
            title={item.title}
            intro={item.intro}
            banner={item.bannerImg}
            navigation={navigation}
            onSelectArticle={(selectedId) => { navigation.navigate('Details', { id: selectedId }) }}
          />
        }}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    backgroundColor: "#F8F6F6",
  },
  list: {
    height: "90%",
  },
  title: {
    fontSize: 24,
    color: "#D24335",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "center"
  }
});
export default NewsScreen;