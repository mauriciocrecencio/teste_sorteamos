import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { getPercentage } from '../../services/utils'
import { useStaticData } from '../../store/staticStore'
import clsx from 'clsx'

const BlinkMessage = ({ props }) => {
  const staticData = useStaticData((state) => state.staticData)
  const [message, setMessage] = useState({ label: '', setClass: '' })

  useEffect(() => {
    let shortMessage = { label: '', setClass: '' }

    if (props.status === 'done') {
      shortMessage = {
        label: staticData?.blink_message?.six || '',
        setClass: 'blink-bg-done',
      }
    } else if (props.status === 'onhold') {
      shortMessage = {
        label: staticData?.blink_message?.seven || '',
        setClass: 'blink-bg-done',
      }
    } else if (props.quantity === 0) {
      shortMessage = {
        label: staticData?.blink_message?.one || '',
        setClass: 'blink-bg-done',
      }
    } else if (props.quantity > getPercentage(50, props.total)) {
      shortMessage = {
        label: staticData?.blink_message?.two || '',
        setClass: 'blink-bg-success',
      }
    } else if (
      props.quantity >= getPercentage(70, props.total) &&
      props.quantity < getPercentage(50, props.total)
    ) {
      shortMessage = {
        label: staticData?.blink_message?.three || '',
        setClass: 'blink-bg-done',
      }
    } else if (
      props.quantity >= getPercentage(90, props.total) &&
      props.quantity < getPercentage(70, props.total)
    ) {
      shortMessage = {
        label: staticData?.blink_message?.four || '',
        setClass: 'blink-bg-done',
      }
    } else {
      shortMessage = {
        label: staticData?.blink_message?.five || '',
        setClass: 'blink-bg-done',
      }
    }

    setMessage(shortMessage)
  }, [])

  return (
    <>
      <span className={clsx(styles['blink-base'], styles[message.setClass])}>
        {message?.label}
      </span>
    </>
  )
}

export default BlinkMessage
