'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <svg className={`${styles.icon} ${styles['icon-rental-car']}`}>
            <use href="/sprite.svg#icon-RentalCar"></use>
          </svg>
        </Link>

        <ul className={styles.navigation}>
          <li>
            <Link
              href="/"
              className={clsx(styles.link, pathname === '/' && styles.active)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/catalog"
              className={clsx(
                styles.link,
                pathname.startsWith('/catalog') && styles.active,
              )}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}