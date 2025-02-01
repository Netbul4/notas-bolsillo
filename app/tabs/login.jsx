import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://127.0.0.1:3000/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        role,
      });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleLogin = async () => {
    try {
      setErrorMessage(""); // Limpiar cualquier error previo
      const response = await login(form.email, form.password);
      navigation.navigate("StudentMain");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      let message;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Si el error tiene una estructura específica del backend
        message = error.response.data.message;
      } else if (error.message) {
        // Si es un error de JavaScript estándar
        message = error.message;
      } else {
        // Mensaje genérico si no podemos determinar el error específico
        message =
          "Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.";
      }
      setErrorMessage(message);

      // Configurar el temporizador para limpiar el mensaje después de 5 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5000 milisegundos = 5 segundos
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: "./assets/images/login.png" }}
          />

          <Text style={styles.title}>
            Promedio <Text style={{ color: "#075eec" }}>Perfecto</Text>
          </Text>

          <Text style={styles.subtitle}>Inicia sesion para continuar.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              onFocus={clearErrorMessage}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(password) => setForm({ ...form, password })}
              onFocus={clearErrorMessage}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                handleLogin();
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle link
            }}
          >
            <Text style={styles.formLink}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          // handle link
        }}
      >
        <Text style={styles.formFooter}>
          No eres miembro?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Registrarse</Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.formError}>{errorMessage}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formError: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff0000",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
