import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTheme } from "../components/themeContext";
import { Colors } from "../components/styles";
import momentHijra from "moment-hijri"; // Import moment-hijri for Hijri date conversion

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const CalendarScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [islamicHolidays, setIslamicHolidays] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date();
  const [hijriDate, setHijriDate] = useState({
    day: "",
    month: "",
    year: "",
    weekday: "",
  });

  // Helper to format numbers with zero-padding if needed
  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  // ----------------------------
  // Islamic Holidays Fetching using Calendarific API
  // ----------------------------
  useEffect(() => {
    const fetchIslamicHolidays = async () => {
      try {
        // Replace with your actual Calendarific API key
        const API_KEY = process.env.CALENDARIFIC_API_KEY;
        // You can change the country code as needed (e.g., "SA" for Saudi Arabia)
        const country = "SA";
        const year = currentDate.getFullYear();
        const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.response && data.response.holidays) {
          // Filter holidays that are Islamic by checking the holiday type array
          const islamicHolidays = data.response.holidays
            .filter(
              (holiday) => holiday.type && holiday.type.includes("Islamic")
            )
            .map((holiday) => {
              const gDate = new Date(holiday.date.iso);
              // Convert Gregorian date to Hijri date using moment-hijri
              const hDate = momentHijra(gDate).format("iD iMMMM, iYYYY AH");
              return {
                name: holiday.name,
                date: gDate,
                hijriDate: hDate,
              };
            });
          setIslamicHolidays(islamicHolidays);
        } else {
          setError("No holidays found.");
        }
      } catch (error) {
        console.error(
          "Error fetching Islamic holidays from Calendarific:",
          error
        );
        setError("Error fetching Islamic holidays");
      }
    };

    fetchIslamicHolidays();
  }, [currentDate]);

  // ----------------------------
  // Gregorian Calendar Data Fetching
  // ----------------------------
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.aladhan.com/v1/gToHCalendar/${formatNumber(
            currentDate.getMonth() + 1
          )}/${currentDate.getFullYear()}`
        );
        const data = await response.json();
        if (data.code === 200) {
          setCalendarData(data.data);
          setError(null);
        } else {
          setError("Failed to fetch calendar data");
        }
      } catch (err) {
        setError("Error fetching calendar data");
      } finally {
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, [currentDate]);

  // ----------------------------
  // Helper Functions for Calendar
  // ----------------------------
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ----------------------------
  // helper function for quran month
  // ----------------------------
  const hijriMonthDescriptions = {
    Muharram: "First month and one of the four sacred months",
    Safar: "Second month",
    "Rabi al-Awwal": "Birth month of Prophet Muhammad",
    "Rabi al-Thani": "Also known as Rabi al-Akhir",
    "Jumada al-Awwal": "Fifth month",
    "Jumada al-Thani": "Also known as Jumada al-Akhir",
    Rajab: "Another sacred month",
    "Sha'ban": "Eighth month",
    Ramadan: "Month of fasting and when the Quran was revealed",
    Shawwal: "Month of Eid al-Fitr",
    "Dhu al-Qa'dah": "A sacred month",
    "Dhu al-Hijjah":
      "Final month, includes Hajj and Eid al-Adha, also a sacred",
  };

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );

  const isHoliday = (date) =>
    islamicHolidays.find(
      (holiday) => new Date(holiday.date).toDateString() === date.toDateString()
    );

  // Navigation handler (if needed for other screens)
  const handlePrayerNavigation = () => navigation.navigate("Prayer");

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const holiday = isHoliday(dateObj);
      const isToday = dateObj.toDateString() === today.toDateString();
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            holiday && styles.holidayCell,
            selectedDate?.toDateString() === dateObj.toDateString() &&
              styles.selectedCell,
            isToday && styles.todayCell,
          ]}
          onPress={() => {
            if (selectedDate.toDateString() !== dateObj.toDateString()) {
              setSelectedDate(dateObj);
            }
          }}
        >
          <Text
            style={[
              styles.dayText,
              holiday && styles.holidayText,
              selectedDate?.toDateString() === dateObj.toDateString() &&
                styles.selectedText,
              isToday && styles.todayText,
            ]}
          >
            {day}
          </Text>
          {holiday && <View style={styles.holidayDot} />}
        </TouchableOpacity>
      );
    }
    return days;
  };

  const renderHolidaysList = () => {
    if (islamicHolidays.length === 0) {
      return (
        <Text style={[styles.holidayName, { color: theme.textSecondary }]}>
          No holidays this month
        </Text>
      );
    }
    return islamicHolidays.map((holiday, index) => (
      <View key={index} style={styles.holidayItem}>
        <Text style={[styles.holidayName, { color: theme.textColor }]}>
          {holiday.name}
        </Text>
        <View style={styles.holidayDates}>
          <Text style={[styles.holidayDate, { color: Colors.brand }]}>
            {holiday.date.toLocaleDateString()}
          </Text>
          <Text style={[styles.holidayHijri, { color: theme.textSecondary }]}>
            {holiday.hijriDate}
          </Text>
        </View>
      </View>
    ));
  };

  // Component to display Gregorian and Hijri dates using moment-hijri
  const DateDetails = () => {
    const gregorianDate = selectedDate.toLocaleDateString();
    const hijriDateStr = momentHijra(selectedDate).format("iYYYY/iM/iD");
    const hijriMonthName = momentHijra(selectedDate).format("iMMMM");
    const monthDescription = hijriMonthDescriptions[hijriMonthName] || "";
    return (
      <View
        style={[
          styles.dateDetailsContainer,
          { backgroundColor: theme.cardBackground },
        ]}
      >
        <Text style={[styles.dateDetailsTitle, { color: theme.textColor }]}>
          Date Details
        </Text>
          <View style={styles.dateRow}>
            <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>
            Gregorian:
            </Text>
            <Text style={[styles.dateValue, { color: theme.textColor }]}>
            {gregorianDate}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>
            Hijra:
            </Text>
            <Text style={[styles.dateValue, { color: theme.textColor }]}>
            {hijriDateStr}
            </Text>
          <Text style={[styles.dateValue, { color: theme.textColor }]}>
            {hijriMonthName} {monthDescription && `- ${monthDescription}`}
                </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const formattedDate = `${selectedDate.getFullYear()}-${formatNumber(
          selectedDate.getMonth() + 1
        )}-${formatNumber(selectedDate.getDate())}`;
        const response = await fetch(
          `http://api.aladhan.com/v1/gToH/${formattedDate}`
        );
        const data = await response.json();
        if (data.code === 200 && data.data) {
          setHijriDate({
            day: data.data.hijri.day,
            month: data.data.hijri.month.en,
            year: data.data.hijri.year,
            weekday: data.data.hijri.weekday.en,
          });
        }
      } catch (error) {
        console.error("Error fetching Hijri date:", error);
      }
    };

    fetchHijriDate();
  }, [selectedDate]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Navigation button (if needed) */}
      <TouchableOpacity
        onPress={handlePrayerNavigation}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={[styles.navigationButton, { color: Colors.brand }]}>
            ←
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.monthYear, { color: theme.textColor }]}>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={[styles.navigationButton, { color: Colors.brand }]}>
            →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendar}>{renderCalendar()}</View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.brand}
          style={styles.loader}
        />
      ) : (
        <DateDetails />
      )}

      {/* <View style={[styles.holidaysList, { borderTopColor: theme.border }]}>
        <Text style={[styles.holidaysTitle, { color: theme.textColor }]}>
          Islamic Holidays
        </Text>
        {renderHolidaysList()}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navigationButton: {
    fontSize: 24,
    padding: 10,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDay: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dayText: {
    fontSize: 16,
  },
  holidayCell: {
    backgroundColor: "#e8f5e9",
  },
  holidayText: {
    color: "#4CAF50",
  },
  selectedCell: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  holidayDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  holidaysList: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  holidaysTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  holidayItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  holidayName: {
    fontSize: 16,
    flex: 1,
  },
  holidayDates: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  holidayDate: {
    fontSize: 14,
  },
  holidayHijri: {
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.brand,
  },
  todayCell: {
    backgroundColor: Colors.brand,
    borderRadius: 20,
  },
  todayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateDetailsContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  dateDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateValue: {
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default CalendarScreen;
