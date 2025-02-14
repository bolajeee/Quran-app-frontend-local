import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../components/themeContext";
import { Colors } from "../components/styles";
// import './Calendar.css';

const CalendarScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hijriDate, setHijriDate] = useState(null);
  const [islamicHolidays, setIslamicHolidays] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date();

  // Fetch Hijri date when selected date changes
  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const formattedDate = `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`;

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

  // Fetch Islamic holidays when month changes
  useEffect(() => {
    const fetchIslamicHolidays = async () => {
      try {
        // Get the first day of current month
        const firstDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const formattedDate = `${firstDay.getFullYear()}-${
          firstDay.getMonth() + 1
        }-${firstDay.getDate()}`;

        const response = await fetch(
          `http://api.aladhan.com/v1/hijriCalendar/${firstDay.getFullYear()}/${
            firstDay.getMonth() + 1
          }`
        );
        const data = await response.json();

        if (data.code === 200 && data.data) {
          console.log("Holidays response:", data.data); // Debug log
          const holidays = data.data
            .filter(
              (day) => day.hijri.holidays && day.hijri.holidays.length > 0
            )
            .map((day) => ({
              name: day.hijri.holidays[0],
              date: new Date(day.gregorian.date),
              hijriDate: `${day.hijri.day} ${day.hijri.month.en}, ${day.hijri.year} AH`,
            }));
          console.log("Processed holidays:", holidays); // Debug log
          setIslamicHolidays(holidays);
        }
      } catch (error) {
        console.error("Error fetching Islamic holidays:", error);
      }
    };

    fetchIslamicHolidays();
  }, [currentDate]);

  // Fetch Islamic calendar data when month changes
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.aladhan.com/v1/gToHCalendar/${
            currentDate.getMonth() + 1
          }/${currentDate.getFullYear()}`
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

  const islamicMonths = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu'l-Qadah",
    "Dhu'l-Hijjah",
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isHoliday = (date) => {
    return islamicHolidays.find(
      (holiday) => new Date(holiday.date).toDateString() === date.toDateString()
    );
  };

  //handle navigation
  const handlePrayerNavigation = () => {
    navigation.navigate("Prayer");
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const holiday = isHoliday(date);
      const isToday = date.toDateString() === today.toDateString();

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            holiday && styles.holidayCell,
            selectedDate?.toDateString() === date.toDateString() &&
              styles.selectedCell,
            isToday && styles.todayCell,
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text
            style={[
              styles.dayText,
              holiday && styles.holidayText,
              selectedDate?.toDateString() === date.toDateString() &&
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

  // Add this new component for Islamic date details
  const IslamicDateDetails = () => {
    if (!selectedDate || !calendarData.length) return null;

    const selectedIslamicDate = calendarData.find(
      (day) => day.gregorian.date === selectedDate.toISOString().split("T")[0]
    );

    if (!selectedIslamicDate) return null;

    return (
      <View
        style={[
          styles.islamicDetails,
          { backgroundColor: theme.cardBackground },
        ]}
      >
        <Text style={[styles.islamicDetailsTitle, { color: theme.textColor }]}>
          Islamic Date Details
        </Text>
        <View style={styles.islamicDetailsContent}>
          <View style={styles.dateRow}>
            <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>
              Hijri Date:
            </Text>
            <Text style={[styles.dateValue, { color: theme.textColor }]}>
              {`${selectedIslamicDate.hijri.day} ${selectedIslamicDate.hijri.month.en} ${selectedIslamicDate.hijri.year}`}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>
              Weekday:
            </Text>
            <Text style={[styles.dateValue, { color: theme.textColor }]}>
              {selectedIslamicDate.hijri.weekday.en}
            </Text>
          </View>
          {selectedIslamicDate.hijri.holidays.length > 0 && (
            <View style={styles.holidaysContainer}>
              <Text style={[styles.dateLabel, { color: Colors.brand }]}>
                Islamic Holiday:
              </Text>
              {selectedIslamicDate.hijri.holidays.map((holiday, index) => (
                <Text
                  key={index}
                  style={[styles.holidayText, { color: Colors.brand }]}
                >
                  {holiday}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <TouchableOpacity
        onPress={() => handlePrayerNavigation()}
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
          {hijriDate && (
            <Text style={[styles.islamicDate, { color: theme.textColor }]}>
              {`${hijriDate.day} ${hijriDate.month} ${hijriDate.year} AH`}
            </Text>
          )}
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
        <IslamicDateDetails />
      )}

      <View style={[styles.holidaysList, { borderTopColor: theme.border }]}>
        <Text style={[styles.holidaysTitle, { color: theme.textColor }]}>
          Islamic Holidays
        </Text>
        {renderHolidaysList()}
      </View>
    </View>
  );
};

const styles = {
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
  islamicDate: {
    fontSize: 16,
    color: "#666",
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
  islamicDetails: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  islamicDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  islamicDetailsContent: {
    gap: 8,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateValue: {
    fontSize: 16,
  },
  holidaysContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  holidayText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  loader: {
    marginTop: 20,
  },
};

export default CalendarScreen;
