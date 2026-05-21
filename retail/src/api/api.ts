import axios from "axios";
import { Car } from "../types/car";

export const rentalCarApi = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

export type FetchCarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

export type FetchCarsParams = {
  page?: number;
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
};

type FiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export async function getCars(
  params: FetchCarsParams
): Promise<FetchCarsResponse> {
  const response = await rentalCarApi.get("/cars", {
    params: {
      ...params,
      perPage: 12,
    },
  });

  return response.data;
}

export async function getBrands(): Promise<string[]> {
  const response = await rentalCarApi.get<FiltersResponse>("/cars/filters");

  return response.data.brands;
}

export async function getCarById(carId: string): Promise<Car> {
  const response = await rentalCarApi.get(`/cars/${carId}`);

  return response.data;
}

export type BookingRequestData = {
  name: string;
  email: string;
  comment: string;
};

export async function createBooking(
  carId: string,
  data: BookingRequestData
): Promise<{ message: string }> {
  const response = await rentalCarApi.post(
    `/cars/${carId}/booking-requests`,
    data
  );

  return response.data;
}