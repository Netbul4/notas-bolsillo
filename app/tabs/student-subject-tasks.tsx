import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card } from "react-native-paper";
import type { Task, Subject } from "../types/task";

const subjectTasks: Task[] = [
  {
    task_id: "1",
    title: "Ejercicios de Álgebra Lineal",
    subject: "Matematicas",
    description:
      "Resolver problemas de matrices y determinantes. Entregar antes del viernes.",
    image_url: "/placeholder.svg",
    created_by: 1,
    created_at: new Date(),
  },
  {
    task_id: "2",
    title: "Proyecto de Geometría Analítica",
    subject: "Matematicas",
    description:
      "Desarrollar una presentación sobre cónicas y sus aplicaciones en la vida real.",
    image_url: "/placeholder.svg",
    created_by: 1,
    created_at: new Date(),
  },
  {
    task_id: "3",
    title: "Práctica de Cálculo Diferencial",
    subject: "Matematicas",
    description:
      "Completar ejercicios sobre límites, continuidad y reglas de derivación.",
    image_url: "/placeholder.svg",
    created_by: 1,
    created_at: new Date(),
  },
];

export default function SubjectTasks({}) {
  const route = useRoute();
  const navigation = useNavigation();
  const { subjectName } = route.params;

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/tasks?courseName=${subjectName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if(response.status !== 200) {
        throw new Error("Status error " + response.status);
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <ScrollView contentContainerStyle={{ padding: 16, marginBottom: 16 }}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.task_id}
            onPress={() =>
              navigation.navigate("TaskDetail", { taskElement: task })
            }
          >
            <Card style={{ overflow: "hidden", marginBottom: 16 }}>
              <View style={{ flexDirection: "row", padding: 16, gap: 16 }}>
                <View
                  style={{
                    width: 96,
                    height: 96,
                    backgroundColor: "#E5E7EB",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: task.image_url || "/placeholder.svg" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginTop: 4,
                      color: "#111827",
                    }}
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#4B5563", marginTop: 4 }}
                  >
                    {task.description}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
