import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import './Calendar.css';

const CalendarScreen = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Islamic holidays for 2024-2025
  const islamicHolidays = [
    { name: 'Al-Hijira', date: 'Jul 7, 2024', hijriDate: 'Muharram 1, 1446 AH' },
    { name: 'Lailat al Miraj', date: 'Jan 27, 2025', hijriDate: 'Rajab 27, 1446 AH' },
    { name: 'Laylat al Baraat', date: 'Feb 14, 2025', hijriDate: "Sha'ban 15, 1446 AH" },
    { name: 'Ramadan (start)', date: 'Mar 1, 2025', hijriDate: 'Ramadan 1, 1446 AH' },
    { name: 'Eid-Ul-Fitr', date: 'Mar 30, 2025', hijriDate: 'Shawwal 1, 1446 AH' },
    { name: 'Waqf Al Arafa - Hajj', date: 'Jun 5, 2025', hijriDate: "Dhu'l-Hijjah 9, 1446 AH" },
    { name: 'Eid-Ul-Adha', date: 'Jun 6, 2025', hijriDate: "Dhu'l-Hijjah 10, 1446 AH" },
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const islamicMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu'l-Qadah", "Dhu'l-Hijjah"
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isHoliday = (date) => {
    return islamicHolidays.find(holiday => 
      new Date(holiday.date).toDateString() === date.toDateString()
    );
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
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const holiday = isHoliday(date);
      
      days.push(
        <TouchableOpacity 
          key={day}
          style={[
            styles.dayCell,
            holiday && styles.holidayCell,
            selectedDate?.toDateString() === date.toDateString() && styles.selectedCell
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[
            styles.dayText,
            holiday && styles.holidayText,
            selectedDate?.toDateString() === date.toDateString() && styles.selectedText
          ]}>
            {day}
          </Text>
          {holiday && <View style={styles.holidayDot} />}
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={onClose}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity> */}
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navigationButton}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.monthYear}>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <Text style={styles.islamicDate}>
            {islamicMonths[7]} {1446} AH
          </Text>
        </View>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navigationButton}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {renderCalendar()}
      </View>

      <View style={styles.holidaysList}>
        <Text style={styles.holidaysTitle}>Islamic Holidays</Text>
        {islamicHolidays.map((holiday, index) => (
          <View key={index} style={styles.holidayItem}>
            <Text style={styles.holidayName}>{holiday.name}</Text>
            <View style={styles.holidayDates}>
              <Text style={styles.holidayDate}>{holiday.date}</Text>
              <Text style={styles.holidayHijri}>{holiday.hijriDate}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButton: {
    fontSize: 24,
    color: '#4CAF50',
    padding: 10,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  islamicDate: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
  },
  holidayCell: {
    backgroundColor: '#e8f5e9',
  },
  holidayText: {
    color: '#4CAF50',
  },
  selectedCell: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  selectedText: {
    color: '#fff',
  },
  holidayDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
  },
  holidaysList: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  holidaysTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  holidayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  holidayName: {
    fontSize: 16,
    color: '#333',
  },
  holidayDates: {
    alignItems: 'flex-end',
  },
  holidayDate: {
    fontSize: 14,
    color: '#4CAF50',
  },
  holidayHijri: {
    fontSize: 12,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
};

export default CalendarScreen; 