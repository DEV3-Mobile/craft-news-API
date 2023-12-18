
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';


const NewsArticle = props => {
  const [article, setArticle] = useState({});
  const getArticleData = async () => {
    //console.log(props.articleId);
    //request naar 
    try {
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:63469/api/news/";
      }
      else {
        url = "http://craft-news-a.ddev.site/api/news/";
      }
      url += props.articleId;
      const response = await fetch(url, {
        "method": "GET",
      });
      const json = await response.json();
      if (Platform.OS == 'android') {
        json.headerImg = json.headerImg.replace("craft-news-a.ddev.site", "10.0.2.2:63469");
      }
      setArticle(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArticleData();
  }, []);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: article.headerImg
        }}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.body}>{article.fullText}</Text>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
  wrapper: {
    padding: 24
  },
  title: {
    fontSize: 24,
    color: "#D24335",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  body: {
    lineHeight: 24

  }
});
export default NewsArticle;