import clsx from 'clsx'
import styles from './styles.module.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Twitter } from '@mui/icons-material'

export default function ResultShare({ formattedDate, productName }) {
  return (
    <section className={clsx(styles['container-result-share'])}>
      <div className={clsx(styles.result)}>
        <p>Sorteio</p>
        <span>{formattedDate}</span>
      </div>
      <div className={clsx(styles['share-links'])}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          title="Compartilhe no Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon sx={{ fontSize: 30 }} />
        </a>
        <a
          href={`https://t.me/share/url?url=${window.location.href}&text=${productName}`}
          title="Compartilhe no Telegram"
          target="_blank"
          rel="noreferrer"
        >
          <TelegramIcon sx={{ fontSize: 30 }} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          title="Compartilhe no Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter sx={{ fontSize: 30 }} />
        </a>
        <a
          href={`https://api.whatsapp.com/send/?text=${
            productName + ': ' + window.location.href
          }&type=custom_url&app_absent=0`}
          title="Compartilhe no WhatsApp"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </a>
      </div>
    </section>
  )
}
