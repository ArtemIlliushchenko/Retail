"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.css"

type FilterSelectProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: number;
  dropdownHeight?: number;
};

export default function FilterSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  width = 204,
  dropdownHeight = 272,
}: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.wrapper}
        style={{ width: `${width}px` }}
        ref={selectRef}
      >
        <button
          type="button"
          className={styles['select-button']}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.value}>{value || placeholder}</span>

          <svg className={styles.icon}>
            <use
              href={
                isOpen ? "/sprite.svg#icon-arrow-up" : "/sprite.svg#icon-arrow"
              }
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className={styles.dropdown}
            style={{ maxHeight: `${dropdownHeight}px` }}
          >
            {options.map((option) => {
              const isSelected = value === option;

              return (
                <li key={option}>
                  <button
                    type="button"
                    className={`${styles.option} ${
                      isSelected ? styles['selected-option'] : ""
                    }`}
                    onClick={() => selectOption(option)}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}