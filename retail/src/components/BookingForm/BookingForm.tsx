"use client";

import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { createBooking } from "../../api/api";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";

type BookingFormProps = {
  carId: string;
};

type FormSubmitEvent = Parameters<
  NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>
>[0];

export default function BookingForm({ carId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function submitBooking(e: FormSubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      await createBooking(carId, {
        name,
        email,
        comment,
      });

      toast.success("Booking request sent successfully!");

      setName("");
      setEmail("");
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send booking request");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitBooking}>
      <h2 className={styles.title}>Book your car now</h2>

      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        className={styles.input}
        type="text"
        name="name"
        id="name"
        autoComplete="name"
        placeholder="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        autoComplete="off"
        placeholder="Comment*"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={5}
        required
      />

      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}