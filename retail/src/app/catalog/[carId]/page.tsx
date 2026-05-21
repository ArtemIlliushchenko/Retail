import { getCarById } from "../../../api/api"
import BookingForm from "@/src/components/BookingForm/BookingForm";
import styles from "./page.module.css";

type CarDetailsPageProps = {
  params: Promise<{
    carId: string;
  }>;
};

function formatCarType(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

function Icon({ name }: { name: string }) {
  return (
    <svg className={styles.icon}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  const conditions = car.rentalConditions ?? [];
  const features = car.features ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles['left-column']}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.image}
          />

          <BookingForm carId={carId} />
        </div>

        <div className={styles['info-card']}>
          <div className={styles['title-row']}>
            <h1 className={styles.title}>
              {car.brand} {car.model}, {car.year}
            </h1>

            <span className={styles.article}>
              Article: {car.id.slice(0, 4)}
            </span>
          </div>

          <p className={styles.location}>
            <Icon name="icon-location" />
            {car.location.city}, {car.location.country}
          </p>

          <p className={styles.price}>${car.rentalPrice}</p>

          <p className={styles.description}>{car.description}</p>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>Rental Conditions:</h2>

            <ul className={styles.list}>
              {conditions.map((item) => (
                <li key={item} className={styles.item}>
                  <Icon name="icon-check-circle" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>Car Specifications:</h2>

            <ul className={styles.list}>
              <li className={styles.item}>
                <Icon name="icon-calendar" />
                Year: {car.year}
              </li>

              <li className={styles.item}>
                <Icon name="icon-car" />
                Type: {formatCarType(car.type)}
              </li>

              <li className={styles.item}>
                <Icon name="icon-fuel" />
                Fuel Consumption: {car.fuelConsumption}
              </li>

              <li className={styles.item}>
                <Icon name="icon-settings" />
                Engine: {car.engine}
              </li>

              <li className={styles.item}>
                <Icon name="icon-mileage" />
                Mileage: {car.mileage.toLocaleString("en-US")} km
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>Features</h2>

            <ul className={styles.list}>
              {features.map((item) => (
                <li key={item} className={styles.item}>
                  <Icon name="icon-check-circle" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}