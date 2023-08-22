import clsx from 'clsx'
import styles from './styles.module.css'

const Title = ({ data }) => {
  return (
    <section className={clsx(styles['title-container'])}>
      <section className={clsx(styles['title-content'])}>
        <h2 className={clsx(styles.title)}>{data.title}</h2>
        <p className={clsx(styles['title-sub'])}>{data.sub}</p>
      </section>
    </section>
  )
}

export default Title
