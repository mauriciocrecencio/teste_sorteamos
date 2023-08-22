import React, { useState } from 'react'
import styles from './styles.module.css'

import { createUser, login } from '../../services/actions'

import Title from '../../components/Title'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TelefoneBrasileiroInput from '@/components/TelefoneBrasileiroInput'
import Usability from '../../components/Usability'
import { useStaticData } from '../../store/staticStore'
import { onlyLetters, validateEmail } from '@/services/utils'
import ReactPixel from 'react-facebook-pixel'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const Login = () => {
  const { push } = useRouter()
  const staticData = useStaticData((state) => state.staticData)

  const [phone, setPhone] = useState('')
  const [confirmPhone, setConfirmPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorConfirmPhone, setErrorConfirmPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const checkLogin = async (e) => {
    setLoading(true)
    e.preventDefault()

    if (phone.length === 14 || phone.length === 15) {
      setErrorPhone('')
      setErrorConfirmPhone('')
    } else {
      setErrorPhone('Telefone precisa estar no formato (00) 90000-0000')
      setLoading(false)
      return false
    }

    if (step === 1) {
      const hasLogin = await login(phone)
      if (hasLogin) {
        push(`/meus-numeros`)
      } else {
        setStep(2)
      }
    }

    if (step === 2) {
      if (phone !== confirmPhone) {
        setErrorConfirmPhone('Número de telefone diferente')
        setLoading(false)
        return false
      }

      if (staticData?.login?.email && !validateEmail(email)) {
        setErrorEmail('Verifique o email digitado.')
        setLoading(false)
        return false
      } else {
        setErrorEmail('')
      }

      if (name.length >= 5 && confirmPhone === phone) {
        const user = await createUser({ name, phone, email })
        // ReactPixel.track('CompleteRegistration', {
        //   name,
        //   phone,
        //   status: user.status,
        //   email,
        // })

        if (user.status) {
          push(`/meus-numeros`)
        } else {
          console.log('erro ao criar o usuario ', name)
        }
      }
    }

    setLoading(false)
  }

  return (
    <>
      <Usability
        title={`Login ${
          staticData?.useful?.name ? `- ${staticData.useful.name}` : ''
        }`}
        robots="noindex"
      />

      <Title data={{ title: '⚡Login', sub: '' }} />

      <form onSubmit={checkLogin} className="login-form">
        <section className="form-item">
          <label>
            <p>Informe seu telefone</p>
            <TelefoneBrasileiroInput
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              temDDD
              separaDDD
              required
              minLength={14}
              maxLength={15}
              placeholder="(00) 90000-0000"
              disabled={step === 2}
            />
            {errorPhone && <p className="form-error">{errorPhone}</p>}
          </label>
        </section>

        {step === 2 && (
          <>
            <section className="form-item">
              <label>
                <p>Confirme seu telefone</p>
                <TelefoneBrasileiroInput
                  type="text"
                  value={confirmPhone}
                  onChange={(e) => setConfirmPhone(e.target.value)}
                  temDDD
                  separaDDD
                  required
                  minLength={14}
                  maxLength={15}
                  placeholder="(00) 90000-0000"
                />
                {errorConfirmPhone && (
                  <p className="form-error">{errorConfirmPhone}</p>
                )}
              </label>
            </section>
            <section className="form-item">
              <label>
                <p>Nome Completo</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(onlyLetters(e.target.value))}
                  required
                  placeholder="Informe seu nome e sobrenome"
                  minLength={5}
                  maxLength={30}
                />
                {errorPhone && <p className="form-error">{errorPhone}</p>}
              </label>
            </section>

            {staticData?.login?.email && (
              <section className="form-item">
                <label>
                  <p>Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Informe seu email"
                    minLength={5}
                    className="email"
                  />
                  {errorEmail && <p className="form-error">{errorEmail}</p>}
                </label>
              </section>
            )}
          </>
        )}

        {step === 1 && (
          <section
            className={clsx(styles['info-form-text'], styles.lightyellow)}
          >
            <InfoOutlinedIcon /> Informe seu telefone para continuar.
          </section>
        )}

        <section className="button-container">
          <section>
            <button
              className="button-item join"
              type="submit"
              disabled={loading}
            >
              <span className="icon-text">
                {step === 1 ? 'Entrar / Cadastrar' : 'Cadastrar'}
              </span>
            </button>
          </section>
        </section>
      </form>
    </>
  )
}

export default Login
