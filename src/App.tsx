import { useRef, useState } from "react";
import search from "./assets/search.png";


interface WeatherType {
  type: string;
  img: string;
}

const WeatherTypes: WeatherType[] = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiData, setApiData] = useState<any>(null);
  const [showWeather, setShowWeather] = useState<WeatherType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${
      inputRef.current?.value
    }&units=metric&appid=${import.meta.env.VITE_SOME_KEY}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className=" bg-gradient-to-r from-orange-100 to-blue-100 h-screen grid place-items-center">
      <div className="bg-stone-100 w-96   p-4 rounded-md ">
        <h1 className="text-4xl text-black font-bold text-center mb-8">
          Weather <span className="text-orange-500">Forecast</span>
        </h1>

        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className=" peer h-10 w-full rounded-md bg-gray-50 px-4  outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:shadow-lg focus:shadow-orange-200  text-sm border-b
            p-1 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img className="w-8 h-9 p-1" src={search} alt="" />
          </button>
        </div>

        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full ">
              <img
                alt="..."
                className="w-12 h-12 rounded-full animate-spin
                border-8 border-dashed border-orange-500 border-t-transparent"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-bold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="..."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>

                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="..."
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-extrabold text-orange-500">
                        {apiData?.main?.temp}&#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
