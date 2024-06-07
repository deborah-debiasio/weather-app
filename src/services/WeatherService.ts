
import { baseURL } from "../utils/utils";
import { APIBaseService } from "./ApiBaseService";

export class WeatherService implements APIBaseService {

    static async getWeather(cityName: string): Promise<ServiceResponse<WeatherResponse>> {
        try {
            const response = await APIBaseService.performAxiosRequest(
                'get',
                `${baseURL}/data/2.5/weather?q=${cityName}`
            );

            return { data: response.data };
        } catch (err: any) {
            return { error: err };
        }
    }


    // 5 day weather forecast
    // https://openweathermap.org/forecast5#5days
    static async getWeatherDaily(cityName: string): Promise<ServiceResponse<FiveDayWeatherForecast>> {
        try {
            const response = await APIBaseService.performAxiosRequest(
                'get',
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}`,
            );

            return { data: response.data };
        } catch (err: any) {
            return { error: err };
        }
    }
}