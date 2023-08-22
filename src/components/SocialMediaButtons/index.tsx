import styles from './styles.module.css'
import Telegram from '@/assets/icons/telegram.svg'
import Whatsapp from '@/assets/icons/whatsapp.svg'
import ReactPixel from 'react-facebook-pixel'

const SocialMediaButtons = ({
  linkWhatsapp = '',
  linkTelegram = '',
  productSlug = '',
}) => {
  // TODO: verificar
  // const registerEvent = (buttonType) => {
  //   ReactPixel.trackCustom('SocialMediaGroupButton', {
  //     buttonType,
  //     productSlug,
  //   })
  // }

  return (
    <div className={styles.socialMediaButtons}>
      {linkWhatsapp && (
        <a
          className={styles['whatsapp-button']}
          href={linkWhatsapp}
          target="_blank"
          // onClick={() => registerEvent('Whatsapp')}
        >
          <Whatsapp />
          Grupo
        </a>
      )}
      {linkTelegram && (
        <a
          className={styles['telegram-button']}
          href={linkTelegram}
          target="_blank"
          // onClick={() => registerEvent('Telegram')}
        >
          <Telegram />
          Telegram
        </a>
      )}
    </div>
  )
}

export default SocialMediaButtons
