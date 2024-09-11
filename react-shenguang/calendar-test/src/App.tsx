import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./index.css";
import { useControllableValue } from "ahooks";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const InternalCalendar: React.ForwardRefRenderFunction<
  CalendarRef,
  CalendarProps
> = (props, ref) => {
  const { defaultValue, onChange } = props;

  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date(),
  });

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    // 填充上月日期的空白格
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="empty">
          {new Date(
            date.getFullYear(),
            date.getMonth(),
            i - firstDay + 1
          ).getDate()}
        </div>
      );
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
      };
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      }
    }

    // 填充下月日期的空白格
    const curRow = Math.ceil(days.length / 7); // 向上取整
    const nextDays = curRow * 7 - days.length; // 下月的天数
    if (nextDays > 0) {
      for (let i = 0; i < nextDays; i++) {
        days.push(
          <div key={`empty-${i}-next`} className="empty">
            {new Date(date.getFullYear(), date.getMonth() + 1, i + 1).getDate()}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);

// function Test() {
//   const calendarRef = useRef<CalendarRef>(null);

//   useEffect(() => {
//     console.log(calendarRef.current?.getDate().toLocaleDateString());

//     setTimeout(() => {
//       calendarRef.current?.setDate(new Date(2024, 3, 1));
//     }, 3000);
//   }, []);

//   return (
//     <div>
//       {/* <Calendar defaultValue={new Date('2023-3-1')} onChange={(date: Date) => {
//         alert(date.toLocaleDateString());
//     }}></Calendar> */}
//       <Calendar
//         ref={calendarRef}
//         defaultValue={new Date("2024-8-15")}
//       ></Calendar>
//     </div>
//   );
// }
// export default Test;

function Test() {
  // const [date, setDate] = useState(new Date());

  // return <Calendar value={date} onChange={(newDate) => {
  //     setDate(newDate);
  //     alert(newDate.toLocaleDateString());
  // }}></Calendar>

  return (
    <Calendar
      defaultValue={new Date()}
      // onChange={(newDate) => {
      //   alert(newDate.toLocaleDateString());
      // }}
    ></Calendar>
  );
}

export default Test;
