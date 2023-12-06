import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import { clase } from "../styles/clases";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { StyleContext } from "../contexts/style_context";

const Calendar = ({ changeDate, setDate, startDate }) => {
  const { fonts } = useContext(StyleContext);
  const [loading, setLoading] = useState(true);
  const [calendarDays, setCalendarDays] = useState([]);
  const [month, setMonth] = useState([]);

  const [currentYear, setCurrentYear] = useState([
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
  ]);

  const [monthStart, setMonthStart] = useState(startDate?.split("-")[1]);

  useEffect(() => {
    let calendarDays = [];
    let month = [];
    let year;
    let currentMonth = startDate
      ? startDate?.split("-")[1]
      : new Date().getMonth() + 1;

    //remove the 0, just if the monthStart is less than 10
    if (startDate && currentMonth < 10) {
      currentMonth = currentMonth.replace(/^0+/, "");

      if (startDate) {
        currentMonth = currentMonth - 1;
      }
    }

    for (let i = 0; i < 12; i++) {
      currentMonth = currentMonth > 11 ? 1 : currentMonth + 1;
      year = currentMonth === 1 ? currentYear[1] : currentYear[0];
      calendarDays.push(...getMonthDays(year, currentMonth));
      month.push(currentMonth);
    }

    //set the monthStart if the monthStart is less than 10, remove the 0, just if the monthStart is less than 10
    if (monthStart < 10) {
      setMonthStart(monthStart.replace(/^0+/, ""));
    }

    setMonth(month);
    setCalendarDays(calendarDays);
    setLoading(false);
  }, []);

  const calendarDaysSeparated = separed(calendarDays, 12);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlashList
      horizontal
      pagingEnabled
      data={month}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item, index }) => {
        const year =
          item >= 1 && month[0] !== 1 && index < item
            ? currentYear[0]
            : currentYear[1];
        return (
          <CalendarUI
            monthDays={calendarDaysSeparated[index]}
            month={item}
            year={year}
            changeDate={changeDate}
            setDate={setDate}
            startDate={startDate}
          />
        );
      }}
      initialScrollIndex={month.indexOf(parseInt(monthStart))}
      estimatedItemSize={370}
    />
  );
};

const CalendarUI = ({
  monthDays,
  month,
  year,
  changeDate,
  setDate,
  startDate,
}) => {
  const { fonts } = useContext(StyleContext);
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const rows = chunk(monthDays, 7);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    if (startDate) {
      const dayStart = startDate.split("-")[2];
      const monthStart = startDate.split("-")[1].replace(/^0+/, "");
      const yearStart = startDate.split("-")[0];

      setSelectedDay(parseInt(dayStart));
      setSelectedMonth(parseInt(monthStart));
      setSelectedYear(parseInt(yearStart));
      setDate(dayStart + "/" + monthStart + "/" + yearStart);
    }
    setLoading(false);
  }, [startDate]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.calendarContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          ...clase.mx_5,
          ...clase.mb_5,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.RalewayRegular,
          }}
        >
          {months[month - 1]}
        </Text>
        <View style={{ width: 10 }} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.RalewayRegular,
          }}
        >
          {year}
        </Text>
      </View>
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#1E97E7",
              paddingHorizontal: 12,
              paddingVertical: 3,
              borderRadius: 5,
              fontFamily: fonts.RalewayRegular,
            }}
          >
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {row.map((day, dayIndex) => {
            return (
              <TouchableOpacity
                key={dayIndex}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor:
                    selectedDay === day &&
                    month === selectedMonth &&
                    year === selectedYear
                      ? "#FDAF19"
                      : "#EFEFEF",
                  margin: 6.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setSelectedDay(day);
                  setSelectedMonth(month);
                  setSelectedYear(year);
                  changeDate(day + "/" + month + "/" + year);
                  setDate(day + "/" + month + "/" + year);
                }}
              >
                <Text
                  style={{
                    color:
                      selectedDay === day &&
                      month === selectedMonth &&
                      year === selectedYear
                        ? "white"
                        : "#7C7C7C",
                    fontSize: 18,
                    fontFamily: fonts.RalewayRegular,
                  }}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 10,
    color: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#EFEFEF",
    margin: 6.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  dayText: {
    color: "#7C7C7C",
    fontWeight: "bold",
    fontSize: 18,
  },
  selectedDayContainer: {
    backgroundColor: "#FDAF19",
  },
  selectedDayText: {
    color: "white",
  },
});

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  date.setDate(0);
  const totalDays = date.getDate();
  const days = [];

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
};

const chunk = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const separed = (array, size) => {
  let result = [];
  let temp = [];
  let counter = 0;
  let j = 0;

  for (let i = 0; i < size; i++) {
    for (j; j < array.length; j++) {
      if (array[j] === 1) {
        counter++;
      }

      if (counter !== 2) {
        temp.push(array[j]);
      } else {
        break;
      }
    }

    result.splice(i, 0, [...temp]);
    temp = [];
    counter = 0;
  }

  return result;
};

export default Calendar;
