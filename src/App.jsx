import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import jsonData from "./utils/MOCK_DATA.json";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Text,
  Image,
  Box,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";

function App() {
  const [searchMessage, setSearchMessage] = useState("");
  const [filteredData, setFilteredData] = useState(jsonData);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  //--- ฟังก์ชั่นแยกข้อมูล Gender(เพศ) และ Country(ประเทศ) ---//
  const data = jsonData;
  const gender = [];
  const country = [];
  data.forEach((item) => {
    if (!gender.includes(item.gender)) {
      gender.push(item.gender);
    } else if (!country.includes(item.country)) {
      country.push(item.country);
    }
  });

  //-- handlerFuntion เพื่อเก็บกด Filter Button ให้แสดงผล Country --//
  const handlerCountryFilter = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    filterData(selectedGender, selectedCountry, searchMessage);
  };

  //-- handlerFuntion เพื่อเก็บกด Filter Button ให้แสดงผล Gender --//
  const handlerGenderFilter = (selectedGender) => {
    setSelectedGender(selectedGender);
    filterData(selectedGender, selectedCountry, searchMessage);
  };

  //-- handlerFuntion เพื่อค้นหาข้อมูลตามการ search message ในกล่อง Input และรีเซ็ตค่า Gender,Country --//
  const handlerSearchMessage = (event) => {
    setSearchMessage(event.target.value);
    setSelectedCountry(null);
    setSelectedGender(null);
  };

  //-- handlerFuntion เพื่อ Clear ข้อมูลการ Filter ทั้งหมดให้กลับเป็นค่าเริ่มต้น --//
  const handlerClearFilters = () => {
    setSearchMessage(""); //-- เพื่อเคลียร์การค้นหาด้วยข้อความ --//
    setSelectedGender(null); //-- เพื่อเคลียร์การค้นหาด้วย filter gender --//
    setSelectedCountry(null); //-- เพื่อเคลียร์การค้นหาด้วย filter country --//
    setFilteredData(jsonData); //-- เพื่อรีเซ็ตกลับ Default แสดงข้อมูลทั้งหมด --//
  };

  //-- Function & Logic เพื่อค้นหาข้อมูลและ Matching Card จากการ Search และ Filter --//
  const filterData = (gender, country, search) => {
    const lowercaseSearch = search.toLowerCase();
    const filteredContent = jsonData.filter((mockData) => {
      const lowerFirstName = mockData.first_name.toLowerCase();
      const lowerLastName = mockData.last_name.toLowerCase();
      const lowerGender = mockData.gender.toLowerCase();
      const lowerCountry = mockData.country.toLowerCase();

      const matchSearch =
        !lowercaseSearch ||
        lowerFirstName.includes(lowercaseSearch) ||
        lowerLastName.includes(lowercaseSearch);

      if (lowercaseSearch !== "") {
        return matchSearch;
      } else {
        const matchGender = !gender || lowerGender === gender.toLowerCase();
        const matchCountry = !country || lowerCountry === country.toLowerCase();
        return matchGender && matchCountry && matchSearch;
      }
    });

    setFilteredData(filteredContent);
  };

  useEffect(() => {
    filterData(selectedGender, selectedCountry, searchMessage);
  }, [selectedGender, selectedCountry, searchMessage]);

  return (
    <>
      <Box w="100%">
        <Heading color="red">Test</Heading>

        <Box mt="25px">
          {gender.map((gender, index) => {
            return (
              <Button
                variant="solid"
                key={index}
                mx="20px"
                borderRadius="none"
                _focus={{ outline: "none" }}
                _active={{ bgColor: "black", textColor: "white" }}
                _focusVisible={{ outline: "none" }}
                onClick={() => handlerGenderFilter(gender)}
                isActive={selectedGender === gender}
              >
                {gender}
              </Button>
            );
          })}
        </Box>
        <Box mt="25px">
          {country.map((country, index) => {
            return (
              <Button
                variant="solid"
                key={index}
                mx="20px"
                borderRadius="none"
                _focus={{ outline: "none" }}
                _active={{ bgColor: "black", textColor: "white" }}
                _focusVisible={{ outline: "none" }}
                onClick={() => handlerCountryFilter(country)}
                isActive={selectedCountry === country}
              >
                {country}
              </Button>
            );
          })}
        </Box>

        <Input
          placeholder="Search"
          size="lg"
          my="35px"
          w="300px"
          value={searchMessage}
          onChange={handlerSearchMessage}
        />
        <Button
          colorScheme="blue"
          variant="link"
          borderColor={"white"}
          fontSize="xl"
          ml="10px"
          _hover={{ borderColor: "white" }}
          _focus={{ outline: "none" }}
          _focusVisible={{ outline: "none" }}
          onClick={handlerClearFilters}
        >
          Clear
        </Button>

        <SimpleGrid columns={3} spacing={10}>
          {filteredData.map((item, index) => {
            return (
              <Card maxW="sm" key={index} fontSize="2xl" align="center">
                <CardHeader w="100%" p="0">
                  <Image
                    src={item.image}
                    alt={`image-${index}`}
                    borderRadius="lg"
                    objectFit="cover"
                    w="100%"
                    h="230px"
                  />
                </CardHeader>
                <CardBody>
                  <Text textColor="gray">
                    {`${item.first_name}
                  ${item.last_name}`}
                  </Text>
                  <Text>{item.gender}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.country}</Text>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default App;
