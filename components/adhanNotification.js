import React, { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import Sound from "react-native-sound";

const AdhanNotification = ({ prayerTimes }) => {
  // Enable playing audio even when phone is in silent mode
  Sound.setCategory("Playback");

  // Initialize adhan sound
  const adhan = new Sound("adhan.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("Failed to load adhan sound", error);
    }
  });

  const createNotificationChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "adhan-channel",
        channelName: "Prayer Times",
        channelDescription: "Notifications for prayer times",
        playSound: true,
        soundName: "adhan.mp3",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );
  };

  const scheduleAdhan = (prayerName, prayerTime) => {
    try {
      // Convert 12-hour format to 24-hour format
      const [time, period] = prayerTime.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const scheduledTime = new Date();
      scheduledTime.setHours(hours);
      scheduledTime.setMinutes(parseInt(minutes));
      scheduledTime.setSeconds(0);

      // If time has passed for today, schedule for tomorrow
      if (scheduledTime < new Date()) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      PushNotification.localNotificationSchedule({
        channelId: "adhan-channel",
        title: `Time for ${prayerName}`,
        message: `It's time for ${prayerName} prayer`,
        date: scheduledTime,
        allowWhileIdle: true,
        playSound: true,
        soundName: "adhan.mp3",
        importance: "high",
        // Repeat daily
        repeatType: "day",
        repeatTime: 1,
      });
    } catch (error) {
      console.log("Error scheduling adhan:", error);
    }
  };

  const playAdhan = () => {
    adhan.play((success) => {
      if (!success) {
        console.log("Failed to play adhan sound");
      }
    });
  };

  // Configure push notifications
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        // Called when a notification is received
        console.log("Notification received:", notification);

        // Play adhan sound when notification is received
        if (notification.channelId === "adhan-channel") {
          playAdhan();
        }
      },

      // Required for iOS
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    // Create the notification channel
    createNotificationChannel();

    return () => {
      // Cleanup notifications when component unmounts
      PushNotification.cancelAllLocalNotifications();
      adhan.release();
    };
  }, []);

  // Schedule prayer time notifications
  useEffect(() => {
    if (prayerTimes) {
      // Cancel existing notifications before scheduling new ones
      PushNotification.cancelAllLocalNotifications();

      const prayers = [
        { name: "Fajr", time: prayerTimes.Fajr },
        { name: "Dhuhr", time: prayerTimes.Dhuhr },
        { name: "Asr", time: prayerTimes.Asr },
        { name: "Maghrib", time: prayerTimes.Maghrib },
        { name: "Isha", time: prayerTimes.Isha },
      ];

      prayers.forEach((prayer) => {
        scheduleAdhan(prayer.name, prayer.time);
      });
    }
  }, [prayerTimes]);

  return null; // This is a non-visual component
};

export default AdhanNotification;
