import { useState } from "react";
import {
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
  FlatList,
  Center,
} from "native-base";

import { useNavigation } from "@react-navigation/native";

import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { useTheme } from "native-base";

import auth from "@react-native-firebase/auth";

import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { Alert } from "react-native";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "6",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "open",
    },
    {
      id: "1",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "open",
    },
    {
      id: "2",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "closed",
    },
    {
      id: "3",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "closed",
    },
    {
      id: "4",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "open",
    },
    {
      id: "5",
      patrimony: "123456",
      when: "26/01/2023 às 21:37",
      status: "open",
    },
  ]);

  const { colors } = useTheme();

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        Alert.alert("Sair", "Ocorreu um erro ao sair");
      });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} mt={8} px={6}>
        <HStack
          w="full"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            title=" finalizados"
            type="closed"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={() => {
            return (
              <Center>
                <ChatTeardropText size={40} color={colors.gray[300]} />
                <Text color="gray.300" mt={6} fontSize="xl" textAlign="center">
                  Você ainda não possui {"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            );
          }}
        />

        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
