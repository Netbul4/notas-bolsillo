import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./tabs/login";
import StudentMain from "./tabs/student-main";
import SubjectTasks from "./tabs/student-subject-tasks";
import TaskDetail from "./tabs/student-tasks";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentMain"
        component={StudentMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentSubjectTasks"
        component={SubjectTasks}
        options={({ route }) => ({ title: route.params.subjectName })}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={({ route }) => ({ title: "Tarea" })}
      />
    </Stack.Navigator>
  );
}
