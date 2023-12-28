export const citiesData = [
  { name: "서울", gridRow: 6, gridColumn: 8 },
  { name: "춘천", gridRow: 5, gridColumn: 11 },
  { name: "강릉", gridRow: 7, gridColumn: 14 },
  { name: "수원", gridRow: 9, gridColumn: 9 },
  { name: "청주", gridRow: 10, gridColumn: 13 },
  { name: "안동", gridRow: 14, gridColumn: 15 },
  { name: "전주", gridRow: 15, gridColumn: 9 },
  { name: "대전", gridRow: 13, gridColumn: 11 },
  { name: "대구", gridRow: 17, gridColumn: 12 },
  { name: "울산", gridRow: 17, gridColumn: 16 },
  { name: "목포", gridRow: 22, gridColumn: 6 },
  { name: "광주", gridRow: 20, gridColumn: 8 },
  { name: "여수", gridRow: 22, gridColumn: 10 },
  { name: "부산", gridRow: 20, gridColumn: 15 },
  { name: "제주", gridRow: 28, gridColumn: 7 },
];

export const getCurrentDate = () => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return year + month + day;
};

export const getWeekDays = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = `${date.getFullYear()}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    dates.push(formattedDate);
  }
  return dates;
};

export const formatDateWithDay = (dateString) => {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);

  const date = new Date(year, month - 1, day);
  const today = new Date();

  const dayOfWeekKorean = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayOfWeekKorean[date.getDay()];

  if (date.toDateString() === today.toDateString()) {
    return (
      <>
        <div>{dayOfWeek}</div>
        <div>오늘</div>
      </>
    );
  } else {
    return (
      <>
        <div>{dayOfWeek}</div>
        <div>
          {month}.{day}
        </div>
      </>
    );
  }
};

export const CityComponent = ({ city, weather, isMorning }) => {
  const gridRow = city.gridRow;
  const gridColumn = city.gridColumn;

  if (!weather) {
    return <div>Loading...</div>; // 또는 다른 오류 처리 , 나중에 멋진걸로 대체하자
  }

  const temperature = isMorning
    ? weather.morningTemperature
    : weather.afternoonTemperature; // 아침 OR 오후
  const weatherCondition = isMorning
    ? weather.morningWeatherCondition
    : weather.afternoonWeatherCondition; // 아침 OR 오후

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        gridRow: gridRow,
        gridColumn: gridColumn,
        zIndex: 1,
        whiteSpace: "nowrap",
        fontSize: "0.8vw",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "1vw",
      }}>
      <div>
        <div
          // 추후 아이콘이 위치할거라 flex 적용 , 무조건 도시명+온도 표현식 정중앙에 위치
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // 세로 정렬
            height: "100%", // 그리드 셀의 전체 높이 사용
            width: "100%", // 그리드 셀의 전체 너비 사용
          }}>
          {`${weatherCondition}`}
          <div>
            {city.name}
            {`${temperature}°`}
          </div>
          {/* <span>{weather ? `${weather.temperature}°C` : '온도'}</span> */}
        </div>
      </div>
    </div>
  );
};
