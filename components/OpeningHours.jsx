import { Text, StyleSheet, View } from "react-native";
import { useState, useMemo } from "react";

const dayMap = {
  1: "Luni",
  2: "Marti",
  3: "Miercuri",
  4: "Joi",
  5: "Vineri",
  6: "Sambata",
  0: "Duminica",
};

function formatTime(hour, minute) {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${hh}:${mm}`;
}
export default function OpeningHours({
  openingHours,
  container,
  text1,
  text2,
}) {
  const hasPeriods =
    openingHours &&
    Array.isArray(openingHours.periods) &&
    openingHours.periods.length > 0;

  const formatted = useMemo(() => {
    const periods = openingHours.periods || [];
    const dayOrder = [1, 2, 3, 4, 5, 6, 0];
    const days = dayOrder.map((day) => {
      const dayPeriods = periods.filter((p) => p.open.day == day);

      let desc;

      if (dayPeriods.length == 0) {
        desc = "Inchis";
      } else {
        const intervals = dayPeriods.map((p) => {
          const openStr = formatTime(p.open.hour, p.open.minute);
          const closeStr = formatTime(p.close.hour, p.close.minute);
          return `${openStr}-${closeStr}`;
        });
        desc = intervals.join(", ");
      }

      return { day, label: dayMap[day], desc };
    });

    const result = [];
    let start = 0;
    let currentDesc = days[0].desc;

    for (let i = 1; i <= days.length; i++) {
      if (i < days.length && days[i].desc === currentDesc) {
        continue;
      }
      const startLabel = days[start].label;
      const endLabel = days[i - 1].label;

      const prefix = start === i - 1 ? startLabel : `${startLabel}-${endLabel}`;

      result.push(`${prefix}: ${currentDesc}`);

      if (i < days.length) {
        start = i;
        currentDesc = days[i].desc;
      }
    }
    return result;
  }, [openingHours]);

  return (
    <View style={container}>
      {hasPeriods && (
        <>
          <Text
            style={[
              text1,
              openingHours.openNow ? { color: "green" } : { color: "red" },
            ]}
          >
            {openingHours.openNow ? "Deschis" : "Inchis"}
          </Text>
          {formatted.map((line, idx) => (
            <Text style={text2} key={idx}>
              {line}
            </Text>
          ))}
        </>
      )}
      {!hasPeriods && (
        <Text style={[text1, { color: "blue" }]}>
          Nu sunt informatii despre program!
        </Text>
      )}
    </View>
  );
}
