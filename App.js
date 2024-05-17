import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style.js";

function App() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState("");

  async function ConsultarCep() {
    try {
      const req = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
      const res = await req.json();

      console.log(res);
      var result =
        "Cep: " +
        res.cep +
        "\n" +
        "Logradouro: " +
        res.logradouro +
        "\n" +
        "Complemento: " +
        res.complemento +
        "\n" +
        "Bairro: " +
        res.bairro +
        "\n" +
        "Localidade: " +
        res.localidade +
        "\n" +
        "UF: " +
        res.uf;
      setResult(result);
    } catch {
      setResult("CEP não encontrado!");
    }
  }

  function LimparCep() {
    setCep("");
    setResult("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image source={require("./assets/favicon.png")} />
        <Text style={styles.title}>Consulta de Ceps</Text>
      </View>
      {/*Form*/}
      <View>
        <TextInput
          value={cep}
          keyboardType="numeric"
          placeholder="Digite um cep (só números)"
          style={styles.InputText}
          onChangeText={(e) => setCep(e.trim())}
        />
        <Button title="Consultar" onPress={ConsultarCep} />
        <TouchableOpacity onPress={LimparCep}>
          <Text style={styles.btnClear}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/*Resultado*/}
      <View style={styles.result}>
        <Text style={styles.result}>Resultado da busca:</Text>
        <Text>{result}</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
