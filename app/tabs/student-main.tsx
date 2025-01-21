import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Notification {
  id: number;
  message: string;
  subject: string;
}

interface Subject {
  id: number;
  name: string;
  taskCount: number;
  totalTasks: number;
}

type RootStackParamList = {
  "tabs/student-school-subject": { slug: string };
  Revisar: undefined;
};

export default function HomePage() {
  const route = useRoute();
  const navigation = useNavigation();

  const navigateToSubjectTasks = (subjectName : string) => {
    navigation.navigate('StudentSubjectTasks', { subjectName });
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Tienes 1 tarea pendiente", subject: "Matematicas" },
  ]);

  const subjects: Subject[] = [
    { id: 1, name: "Matematica", taskCount: 0, totalTasks: 4 },
    { id: 2, name: "Fisica", taskCount: 0, totalTasks: 4 },
    { id: 3, name: "Lenguas", taskCount: 0, totalTasks: 2 },
    { id: 4, name: "Computacion", taskCount: 0, totalTasks: 1 },
  ];

  const handleDragEnd = (notificationId: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Promedio <Text style={{ color: "#075eec" }}>Perfecto</Text>
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Notificaciones</Text>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Animated.View key={notification.id} style={styles.notification}>
              <TouchableOpacity
                onPress={() => handleDragEnd(notification.id)}
                style={styles.notificationContent}
              >
                <View>
                  <Text>
                    {notification.message}{" "}
                    <Text style={styles.bold}>{notification.subject}</Text>
                  </Text>
                </View>
                <TouchableOpacity onPress={() => console.log("Revisar")}>
                  <Text style={styles.link}>Revisar</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          ))
        ) : (
          <Text>No hay notificaciones</Text>
        )}
      </View>

      <ScrollView style={styles.section}>
        <Text style={styles.sectionHeader}>Materias</Text>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            onPress={() => {
              navigateToSubjectTasks(subject.name);
            }}
            style={styles.subject}
          >
            <View style={styles.subjectContent}>
              <View>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectTasks}>
                  Cantidad de Tareas ({subject.taskCount}/{subject.totalTasks})
                </Text>
              </View>
              <Text style={styles.chevron}>&gt;</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center", // Centra el texto
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notification: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
  },
  subject: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  subjectContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subjectTasks: {
    color: "#666",
  },
  chevron: {
    fontSize: 24,
    color: "#666",
  },
});
