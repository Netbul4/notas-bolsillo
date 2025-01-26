import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import type { Task, Subject } from '../types/task';
import type { Notification } from '../types/notification';
import { useNavigation, useRoute } from "@react-navigation/native";

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

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/courses')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);

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
                <TouchableOpacity onPress={() => navigateToSubjectTasks(notification.subject)}>
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
            key={subject.course_id}
            onPress={() => {
              navigateToSubjectTasks(subject.course_name);
            }}
            style={styles.subject}
          >
            <View style={styles.subjectContent}>
              <View>
                <Text style={styles.subjectName}>{subject.course_name}</Text>
                <Text style={styles.subjectTasks}>
                  Cantidad de Tareas ({subject.done_tasks}/{subject.total_tasks})
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
