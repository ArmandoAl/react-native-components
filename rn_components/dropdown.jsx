import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { clase } from "../styles/clases";
import { ScrollView } from "react-native-gesture-handler";
import { StyleContext } from "../contexts/style_context";
import { useContext } from "react";

const convertToModel = (opcion, modelo) => {
  return modelo[opcion];
};

const DropDown = ({ options, selectedOption, onSelectOption, model }) => {
  const [pressed, setPressed] = useState(false);
  const { fonts } = useContext(StyleContext);
  const [text, setText] = useState(
    selectedOption
      ? model
        ? convertToModel(selectedOption, model)
        : selectedOption
      : options[0].label
      ? options[0].label
      : options[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setText(option.label ? option.label : option);
    onSelectOption(option.value);
    toggleDropdown();
    setPressed(true);
  };

  return (
    <View
      style={{
        zIndex: 100,
      }}
    >
      <TouchableOpacity
        style={{
          ...clase.border_1,
          ...clase.r_5,
          ...clase.py_10,
          ...clase.px_10,
          ...clase.my_5,
          backgroundColor: pressed ? "#F2F2F2" : "#FFF",
        }}
        onPress={toggleDropdown}
      >
        <Text
          style={{
            ...clase.f_14,
            color: "#828282",
            fontFamily: fonts.RalewayRegular,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView
          style={{
            ...clase.border_1,
            ...clase.r_5,
            ...clase.py_10,
            ...clase.px_10,
            ...clase.my_5,
            ...clase.bg_white,
            maxHeight: 140,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              style={{
                ...clase.my_5,
              }}
              key={option.key}
              onPress={() => selectOption(option)}
            >
              <Text
                style={{
                  ...clase.f_14,
                  color: "#828282",
                  fontFamily: fonts.RalewayRegular,
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DropDown;
