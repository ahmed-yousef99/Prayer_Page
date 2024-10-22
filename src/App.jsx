import { useEffect } from "react";
import Prayer from "./components/Prayer/Prayer";
import { useState } from "react";
function App() {

  const [prayerTime , setPrayerTime] = useState({});
  const [dateTime , setDateTime] = useState("");
  const [city , setCity] = useState("Damascus");
  

  const cities = [
    {name:"الشام" ,      value:"Damascus"},
    {name:"حلب" ,        value:"Aleppo"},
    {name:"حمص" ,        value:"Hummus"},
    {name:"حماه" ,       value:"Hama"},
    {name:"الرقة" ,      value:"Raqqa"},
    {name:"دير الزور" ,  value:"DeirEzzor"},
    {name:"طرطوس" ,      value:"Tartous"},
    {name:"اللاذقية" ,    value:"Latakia"},
    {name:"السويداء" ,   value:"Sweida"},
    {name:"الحسكة" ,     value:"Hasakah"},
    {name:"درعا" ,       value:"Daraa"},
    {name:"إدلب" ,       value:"Idlib"},
    {name:"القنيطرة" ,   value:"Quneitra"},
  ];


  useEffect(() => {
    const fechPrayerTime = async() => {
      try{
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/21-10-2024?city=Sy&country=${city}`);
        const data_prayer = await response.json();
        setPrayerTime(data_prayer.data.timings)
        setDateTime(data_prayer.data.date.gregorian.date);
        // console.log(data_prayer.data);
        
      }catch(error){
        console.error(error);
      }
    }
    fechPrayerTime()
  },[city])


  const formatTimes = (time) => {
    if (!time) {
      return "00:00"
    }

    let [hours , minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${minutes < 10 ? "0" + minutes : minutes} : ${hours} ${perd}`
  }

  return (
    <>
      <section>
        <div className="container">
          
          <div className="top-sec">
            <div className="city">
              <h3>المدينة</h3>
              <select name="" id="" onChange={(e) => setCity(e.target.value)}>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>{city.name}</option>
                ))};
              </select>
            </div>
    
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{dateTime}</h4>
            </div>
          </div>

          <Prayer name="الفجر" time={formatTimes(prayerTime.Fajr)}/>
          <Prayer name="الظهر" time={formatTimes(prayerTime.Dhuhr)}/>
          <Prayer name="العصر" time={formatTimes(prayerTime.Asr)}/>
          <Prayer name="المغرب" time={formatTimes(prayerTime.Maghrib)}/>
          <Prayer name="العشاء" time={formatTimes(prayerTime.Isha)}/>
        </div>
      </section>
    </>
  )
}

export default App
