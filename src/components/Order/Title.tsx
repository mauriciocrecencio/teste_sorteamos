import styles from './styles.module.css'

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

const Title = ({ data }) => {
  return (
    <section className={styles['title-payment-container']}>
      <section className={styles['title-payment-content']}>
        <section className={styles['title-payment-icon']}>
          <CheckCircleOutlinedIcon className={data.icon} />
        </section>
        <section className={styles['title-payment-texts']}>
          <h2 className={styles['title-payment-text']}>{data.title}</h2>
          <p className={styles['title-payment-sub']}>{data.sub}</p>
        </section>
      </section>
    </section>
  )
}

export default Title
