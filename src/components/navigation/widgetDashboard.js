import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function WidgetDashboard(props) {
  const { title, screenToNavigate, navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate(screenToNavigate)}>
          <View style={styles.iconContent}>
            <Ionicons name="ios-arrow-dropright-circle" style={styles.icon} />
          </View>
          <View style={styles.contentText}>
            <Text style={styles.txtTitle}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ffff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  contentCategory: {
    flexDirection: "row",
  },
  iconContent: {
    justifyContent: 'center'
  },
  icon: {
    fontSize: 45,
    color: "#1cacdc",
  },
  contentText: {
    flex: 1,
    marginLeft: 25,
    justifyContent: 'center',
  },
  txtTitle: {
    color: '#1885f2',
    fontWeight: 'bold',
    fontSize: 17
  },
});