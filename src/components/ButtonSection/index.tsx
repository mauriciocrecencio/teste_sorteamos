import clsx from 'clsx'
import styles from './styles.module.css'

interface Props {
  onClick: () => void
  text: string
  icon: React.ReactNode // Change this to React.ReactNode
  iconText: string
  price: string
}

export default function ButtonSection({
  onClick,
  icon, // Change this to use the correct prop name
  iconText,
  price,
}: Props) {
  return (
    <section className={clsx(styles['button-container'])}>
      <section>
        <button className={clsx('button-item', 'join')} onClick={onClick}>
          <span className={clsx(styles['icon-text'])}>
            {icon}
            {iconText || ''}
          </span>
          <span className={clsx(styles['calculed-price'])}>
            <small>R$</small> {price}
          </span>
        </button>
      </section>
    </section>
  )
}
