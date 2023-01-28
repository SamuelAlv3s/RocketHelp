import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) return Alert.alert("Preencha todos os campos");

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail ou Senha inválida");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Usuário não encontrado");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail ou Senha inválida");
        }

        return Alert.alert("Entrar", "Ocorreu um erro ao fazer login");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        marginBottom={4}
        InputLeftElement={
          <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
        }
        value={email}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        secureTextEntry
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
