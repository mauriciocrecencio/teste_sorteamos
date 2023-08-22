import { useRef, useState } from 'react'
import styles from './styles.module.css'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'

const FaqItem = ({ data }) => {
  const faqItemRef = useRef(null)

  const [faqItem, setFaqItem] = useState(false)

  return (
    <section className={styles['faq-item-container']}>
      <section
        className={styles['faq-item-content']}
        ref={faqItemRef}
        style={faqItem ? { height: faqItemRef.current.scrollHeight } : {}}
        onClick={() => setFaqItem(!faqItem)}
      >
        <section className={styles['faq-item-title-arrow']}>
          <h2>{data.title}</h2>
          {faqItem ? <ExpandLess /> : <ExpandMore />}
        </section>
        <section
          className={styles['faq-item-text']}
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></section>
      </section>
    </section>
  )
}

export default FaqItem
