import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") || "Tokyo";
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "No API key configured. Using mock data on client." },
      { status: 503 }
    );
  }

  try {
    // Step 1: Get current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
      { next: { revalidate: 900 } }
    );

    if (!currentRes.ok) {
      throw new Error(`OpenWeatherMap error: ${currentRes.status}`);
    }

    // Step 2: Get 5-day forecast (3-hour intervals → we take one per day)
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&cnt=40`,
      { next: { revalidate: 900 } }
    );

    if (!forecastRes.ok) {
      throw new Error(`OpenWeatherMap forecast error: ${forecastRes.status}`);
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    // Map OWM condition code → our internal code format (approximate)
    function mapOwmCode(owmId: number): number {
      if (owmId >= 200 && owmId < 300) return 1276; // thunderstorm
      if (owmId >= 300 && owmId < 400) return 1150; // drizzle
      if (owmId >= 500 && owmId < 600) return 1189; // rain
      if (owmId >= 600 && owmId < 700) return 1210; // snow
      if (owmId === 800) return 1000; // clear
      if (owmId === 801 || owmId === 802) return 1003; // partly cloudy
      if (owmId === 803 || owmId === 804) return 1009; // overcast
      return 1003;
    }

    // Group forecast by day — pick noon reading per day
    const dailyMap = new Map<string, typeof forecast.list[0]>();
    for (const item of forecast.list) {
      const date = item.dt_txt.split(" ")[0];
      const hour = parseInt(item.dt_txt.split(" ")[1]);
      if (!dailyMap.has(date) || Math.abs(hour - 12) < Math.abs(parseInt(dailyMap.get(date)!.dt_txt.split(" ")[1]) - 12)) {
        dailyMap.set(date, item);
      }
    }

    const forecastDays = Array.from(dailyMap.entries())
      .slice(0, 7)
      .map(([date, item]) => ({
        date,
        date_epoch: item.dt * 1000,
        day: {
          maxtemp_c: item.main.temp_max,
          mintemp_c: item.main.temp_min,
          avgtemp_c: item.main.temp,
          condition: {
            text: item.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            code: mapOwmCode(item.weather[0].id),
          },
          daily_chance_of_rain: item.pop ? Math.round(item.pop * 100) : 0,
        },
      }));

    // Shape response to match our WeatherResponse type
    const response = {
      location: {
        name: current.name,
        region: "",
        country: current.sys.country,
        lat: current.coord.lat,
        lon: current.coord.lon,
        localtime: new Date().toISOString(),
      },
      current: {
        temp_c: current.main.temp,
        temp_f: current.main.temp * 9 / 5 + 32,
        condition: {
          text: current.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
          code: mapOwmCode(current.weather[0].id),
        },
        wind_kph: current.wind.speed * 3.6,
        humidity: current.main.humidity,
        feelslike_c: current.main.feels_like,
        uv: 0,
      },
      forecast: {
        forecastday: forecastDays,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
