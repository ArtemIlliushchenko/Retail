"use client";

import { FormEvent, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getBrands, getCars } from "../../api/api";
import CarCard from "@/src/components/Card/Card";
import FilterSelect from "@/src/components/Filter/Filter";

import styles from "./page.module.css"

const priceOptions = ["30", "40", "50", "60", "70", "80", "90", "100"];

export default function CatalogPage() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const [activeFilters, setActiveFilters] = useState({
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", activeFilters],
    queryFn: ({ pageParam }) =>
      getCars({
        page: pageParam,
        brand: activeFilters.brand || undefined,
        price: activeFilters.price || undefined,
        minMileage: activeFilters.minMileage || undefined,
        maxMileage: activeFilters.maxMileage || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setActiveFilters({
      brand,
      price,
      minMileage,
      maxMileage,
    });
  };

  const resetFilters = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");

    setActiveFilters({
      brand: "",
      price: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <form className={styles.filters} onSubmit={applyFilters}>
          <FilterSelect
            label="Car brand"
            placeholder="Choose a brand"
            options={brands}
            value={brand}
            onChange={setBrand}
            width={204}
            dropdownHeight={272}
          />

          <FilterSelect
            label="Price/ 1 hour"
            placeholder="Choose a price"
            options={priceOptions}
            value={price}
            onChange={setPrice}
            width={196}
            dropdownHeight={188}
          />

          <div className={styles.field}>
            <label className={styles.label}>Car mileage / km</label>

            <div className={styles['mileage-group']}>
              <input
                className={`${styles['mileage-input']} ${styles['from-input']}`}
                placeholder="From"
                value={minMileage}
                onChange={(event) => setMinMileage(event.target.value)}
              />

              <input
                className={`${styles['mileage-input']} ${styles['to-input']}`}
                placeholder="To"
                value={maxMileage}
                onChange={(event) => setMaxMileage(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles['search-button']}>
              Search
            </button>

            <button
              type="button"
              className={styles['clear-button']}
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </div>
        </form>

        <ul className={styles.list}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>

        {hasNextPage && (
          <button
            type="button"
            className={styles['load-more-button']}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}