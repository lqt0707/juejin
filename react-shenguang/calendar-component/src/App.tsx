import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar defaultValue={dayjs("2023-11-08")}></Calendar>
    </div>
  );
}

export default App;
