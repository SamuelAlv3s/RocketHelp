import { useState } from "react";
import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

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

      <Button title="Entrar" w="full" />
    </VStack>
  );
}
