import clsx from 'clsx'
import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'

interface Props {
  index?: number
  children: any
  image: string
  pathname: string
  imageName: string
}

export default function CustomSection({
  image,
  index = null,
  children,
  pathname,
  imageName,
}: Props) {
  return (
    <Link
      href={{
        pathname,
      }}
      className={clsx(
        styles['card-item'],
        index === 0 ? styles['first-card-item'] : styles['card-flag'],
      )}
    >
      <section className={styles['card-image']}>
        <Image
          src={image}
          height={290}
          width={570}
          loading="lazy"
          alt={imageName}
        />
      </section>
      {children}
    </Link>
  )
}
