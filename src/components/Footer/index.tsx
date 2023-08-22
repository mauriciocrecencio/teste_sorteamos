import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TelegramIcon from '@mui/icons-material/Telegram'
import { useStaticData } from '../../store/staticStore'
import { shallow } from 'zustand/shallow'
import styles from './styles.module.css'
import clsx from 'clsx'

const socialMediaIcons = {
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookOutlinedIcon />,
  youtube: <YouTubeIcon />,
  whatsapp: <WhatsAppIcon />,
  telegram: <TelegramIcon />,
}

const Footer = () => {
  const data = useStaticData((state) => state.staticData)

  return (
    <footer className={clsx(styles.footer)}>
      <section>
        {data?.socials &&
          data.socials.map((social, index) => {
            if (social?.link) {
              return (
                <a key={index} href={social.link} target="_blank">
                  {socialMediaIcons[social.title] ?? ''}
                </a>
              )
            }
          })}
      </section>

      {data?.footer?.capitalizadora && data?.footer?.beneficiario && (
        <>
          <section
            className={clsx(styles['capitalizadora-beneficiario-container'])}
          >
            {data?.footer?.capitalizadora && (
              <img src={data.footer?.capitalizadora} alt="capitalizadora" />
            )}
            {data?.footer?.beneficiario && (
              <img src={data.footer?.beneficiario} alt="capitalizadora" />
            )}
          </section>
          <section
            className={clsx(
              styles['description-container'],
              styles['regulamentacao-container'],
            )}
          >
            <div
              className={clsx(
                styles['scroll-description'],
                styles['custom-scrollbar'],
              )}
              dangerouslySetInnerHTML={{ __html: data?.footer?.regulamentacao }}
            />
          </section>
        </>
      )}
    </footer>
  )
}

export default Footer
