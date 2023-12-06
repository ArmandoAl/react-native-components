import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { clase } from "../styles/clases";
import { useState } from "react";

const ClockPicker = ({ visible, setVisible, changeTime, setTime }) => {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [period, setPeriod] = useState(null);

  const handleHourClick = (hour) => {
    setHours(hour);
  };

  const handleMinutesClick = (minutes) => {
    if (minutes < 10) {
      setMinutes("0" + minutes);
    } else {
      setMinutes(minutes);
    }
  };

  const handlePeriodClick = (period) => {
    setPeriod(period);
  };

  const send = () => {
    if (period === "PM") {
      changeTime(hours + 12 + ":" + minutes);
      setTime(hours + 12 + ":" + minutes);
    } else {
      changeTime(hours + ":" + minutes);
      setTime(hours + ":" + minutes);
    }

    setHours(null);
    setMinutes(null);
    setPeriod(null);

    setVisible(false);
  };

  const renderHourText = (hour) => {
    const angle = (hour - 12) * (360 / 12); // Posición de la hora en el círculo
    const translateX = Math.sin((angle * Math.PI) / 180) * 85 - 5; // Radio del círculo: 80
    const translateY = -Math.cos((angle * Math.PI) / 180) * 85 - 8;

    return (
      <TouchableOpacity
        key={hour}
        style={[
          styles.hourContainer,
          { transform: [{ translateX }, { translateY }] },
        ]}
        onPress={() => handleHourClick(hour)}
      >
        <Text style={styles.hourText}>{hour}</Text>
      </TouchableOpacity>
    );
  };

  const renderMinutesText = (minutes) => {
    //necesito que los minutos sean multiplos de 5 y que no sean mayores a 60, tambien que empiezen desde arriba el minuto 0 y se vaya a la derecha, tambien que si minutes es un numero menor a 10 se le agregue un 0 al principio
    const angle = (minutes - 60) * (360 / 60); // Posición de la hora en el círculo
    const translateX = Math.sin((angle * Math.PI) / 180) * 85 - 5; // Radio del círculo: 80
    const translateY = -Math.cos((angle * Math.PI) / 180) * 85 - 8;

    return (
      <TouchableOpacity
        key={minutes}
        style={[
          styles.hourContainer,
          { transform: [{ translateX }, { translateY }] },
        ]}
        onPress={() => handleMinutesClick(minutes)}
      >
        <Text style={styles.hourText}>{minutes}</Text>
      </TouchableOpacity>
    );
  };

  const renderPeriodText = (period) => {
    return (
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            ...clase.bg_blue,
            ...clase.px_25,
            ...clase.py_10,
            ...clase.r_10,
          }}
          onPress={() => {
            handlePeriodClick("AM");
          }}
        >
          <Text>AM</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 20,
          }}
        />
        <TouchableOpacity
          style={{
            ...clase.bg_blue,
            ...clase.px_25,
            ...clase.py_10,
            ...clase.r_10,
          }}
          onPress={() => {
            handlePeriodClick("PM");
          }}
        >
          <Text>PM</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000aa",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.container}>
            <View style={styles.clock}>
              {hours === null
                ? Array.from({ length: 12 }, (_, i) => renderHourText(i + 1))
                : minutes === null
                ? Array.from({ length: 12 }, (_, i) => renderMinutesText(i * 5))
                : renderPeriodText()}
            </View>

            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {hours === null ? "00: " : hours + ": "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {minutes === null ? "00: " : minutes + ": "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {period === null ? "AM" : period}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    ...clase.bg_red,
                    ...clase.px_25,
                    ...clase.py_5,
                    ...clase.r_10,
                  }}
                  onPress={() => {
                    setHours(null);
                    setMinutes(null);
                    setPeriod(null);
                    setVisible(false);
                  }}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <View style={{ height: 5 }} />
                <TouchableOpacity
                  style={{
                    ...clase.bg_blue,
                    ...clase.px_25,
                    ...clase.py_5,
                    ...clase.r_10,
                  }}
                  onPress={send}
                >
                  <Text>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  clock: {
    position: "relative",
    width: 220,
    height: 220,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: "#1E97E7",
    alignItems: "center",
    justifyContent: "center",
  },
  hourContainer: {
    position: "absolute",
    top: 100,
    left: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  hourText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E97E7",
  },
});

export default ClockPicker;
