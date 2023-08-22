import styles from './styles.module.css'
import Title from '../Title'
import FaqItem from './item'

const Faq = ({ staticData }) => {
  return (
    <>
      {staticData?.faq && (
        <section className={styles['faq-container']}>
          <section className={styles['faq-content']}>
            <Title
              data={{
                title:
                  '🤷 ' + staticData.faq.title.title ||
                  staticData.faq.titles.title,
              }}
            />

            {staticData.faq.items.map((item, index) => (
              <FaqItem key={index} data={item} />
            ))}
          </section>
        </section>
      )}
    </>
  )
}

export default Faq
