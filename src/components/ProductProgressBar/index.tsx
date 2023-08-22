import clsx from 'clsx'
import styles from './styles.module.css'

interface Props {
  reserved: number
  paid: number
}

export default function ProductProgressBar({ reserved, paid }: Props) {
  return (
    <div className={clsx(styles.progress)}>
      <>
        <div
          className={clsx(
            styles['progress-bar'],
            styles['bg-success'],
            styles['progress-bar-striped'],
            styles['fw-bold'],
            styles['progress-bar-animated'],
          )}
          role="progressbar"
          aria-valuenow={paid}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${paid}%` }}
        ></div>
        <div
          className={clsx(
            styles['progress-bar'],
            styles['bg-info'],
            styles['progress-bar-striped'],
            styles['fw-bold'],
            styles['progress-bar-animated'],
          )}
          role="progressbar"
          aria-valuenow={reserved}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${reserved}%` }}
        ></div>
      </>
    </div>
  )
}
