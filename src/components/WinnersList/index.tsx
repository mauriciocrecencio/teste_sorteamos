import clsx from 'clsx'
import { capitalizeFirstLetter } from '../../services/utils'
import styles from './styles.module.css'
import { IWinner } from '@/interfaces/winners'
import { useStaticData } from '@/store/staticStore'
import Title from '../Title'

interface Props {
  winners: IWinner[]
}

const WinnersList = ({ winners }: Props) => {
  const staticData = useStaticData((state) => state.staticData)

  return (
    <div className="winners-container">
      <Title
        data={{
          title: '🎉 ' + staticData?.texts?.winners?.title || '',
          sub: staticData?.texts?.winners?.sub || '',
        }}
      />
      <div className="winners-list">
        {winners.map((winner) => (
          <section
            className={clsx(
              styles['card-item'],
              styles['card-flag'],
              styles['separate-cards'],
              styles['not-flag'],
              styles['winner-card'],
            )}
            key={winner.winner_name}
          >
            <section className={clsx(styles['card-image'], styles.winner)}>
              <img
                src={
                  winner?.winner_image
                    ? winner.winner_image
                    : 'default-user.jpg'
                }
                // loading="lazy"
                alt="Ganhador"
              />
            </section>
            <section
              className={clsx(styles['card-texts'], styles['winner-texts'])}
            >
              <h2>{capitalizeFirstLetter(winner.winner_name)}</h2>
              <p>
                Ganhou <b>{winner.product_name}</b> cota{' '}
                <span
                  className={clsx(
                    styles['blink-base'],
                    styles['blink-bg-success'],
                    styles.winner,
                    styles['order-number'],
                  )}
                >
                  {String(winner.winner_number).padStart(
                    String(winner.product_total - 1).length,
                    '0',
                  )}
                </span>
              </p>
            </section>
            <section className={clsx(styles['raffle-win'])}>
              <img
                src={JSON.parse(winner.product_images)[0]}
                loading="lazy"
                alt="Sorteio ganho"
              />
            </section>
          </section>
        ))}
      </div>
    </div>
  )
}

export default WinnersList
