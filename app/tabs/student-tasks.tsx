import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import type { Task, Subject } from '../types/task';
import { Button } from "react-native-paper";

export default function TaskDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskElement } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Task marked as delivered");
      navigation.goBack();
    }, 5000);  };

  return (
    <View style={styles.container}>
      {isSubmitting ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3PTXuKI5j35lbOLmkNgUXMmsF6Wc77.png",
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailTitle}>{taskElement.title}</Text>
                  <Text style={styles.detailText}>{taskElement.subject}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Fixed Button at Bottom */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.footerButton}
        >
          Marcar como entregado
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    color: "gray",
  },
  headerTitle: {
    color: "#111827",
    marginLeft: "auto",
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 0,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    padding: 16,
    gap: 16,
  },
  detailItem: {},
  detailTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  detailText: {
    color: "gray",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerButton: {
    backgroundColor: "#4F46E5",
  },
});
