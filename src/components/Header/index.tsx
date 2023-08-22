import { useEffect, useState } from 'react'
import styles from './styles.module.css'

import { adminDecorators, md5, getCookie } from '../../services/utils'

import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import Link from 'next/link'

import { useUserStore } from '../../store/userStore'
import { logout } from '../../services/actions'
import { useStaticData } from '../../store/staticStore'
import Image from 'next/image'

import { Skeleton, Card } from '@mui/material'
import clsx from 'clsx'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const { isLogged, user } = useUserStore((state) => state)

  const useful = useStaticData((state) => state.staticData?.useful)

  const affiliatedAccess = user.role === 'afiliado' || user.role === 'super'

  useEffect(() => {
    const cookieExists = document.cookie.includes('isLogged')
    useUserStore.setState({ isLogged: cookieExists })

    if (cookieExists) {
      useUserStore.setState({
        isLogged: cookieExists,
        user: JSON.parse(getCookie('user')),
      })
    }
  }, [])

  return (
    <header className={clsx(styles.header)}>
      <section className={clsx(styles['header-container'])}>
        <section className={clsx(styles['header-content'])}>
          <section className={clsx(styles.logo)}>
            <Link href="/" onClick={() => setOpenMenu(false)}>
              {useful?.logo ? (
                <Image
                  loading="lazy"
                  src={useful?.logo?.url || ''}
                  alt={useful?.logo?.alt || ''}
                  height="32"
                  width="150"
                />
              ) : (
                <Card>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={150}
                    height={32}
                  />
                </Card>
              )}
            </Link>
          </section>

          <section
            className={clsx(styles['toggle-menu'])}
            onClick={(_) => setOpenMenu(!openMenu)}
          >
            {openMenu ? <CloseOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          </section>

          <section
            className={clsx(styles.menu, openMenu && styles.opened)}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <section className={clsx(styles.container)}>
              {isLogged && user ? (
                <section className={clsx(styles['name-user-logged'])}>
                  {user.name && (
                    <h2>
                      Olá,{' '}
                      {user.name
                        .split(' ')
                        .map(
                          (nome) =>
                            nome.charAt(0).toUpperCase() + nome.slice(1),
                        )
                        .join(' ')}{' '}
                      👋
                    </h2>
                  )}
                </section>
              ) : (
                ''
              )}
              <ul>
                <li>
                  <Link href="/">
                    <CottageOutlinedIcon /> Início
                  </Link>
                </li>
                <li>
                  <Link href={isLogged ? '/meus-numeros' : '/login'}>
                    <Filter1OutlinedIcon /> Meus Números
                  </Link>
                </li>
                <li>
                  <Link href="/sorteios">
                    <TextSnippetOutlinedIcon /> Sorteios
                  </Link>
                </li>
                <li>
                  <Link href="/ganhadores">
                    <EmojiEventsOutlinedIcon /> Ganhadores
                  </Link>
                </li>

                {affiliatedAccess && (
                  <li>
                    <Link href="afiliados">
                      <ListAltOutlinedIcon /> Afiliados
                    </Link>
                  </li>
                )}

                {adminDecorators.includes(user?.role) && (
                  <li>
                    <Link href={md5()}>
                      <VerifiedUserOutlinedIcon /> Painel Administrativo
                    </Link>
                  </li>
                )}
              </ul>
              {isLogged ? (
                <section className={clsx(styles.login, styles.sair)}>
                  <p
                    className={clsx(styles['login-link'])}
                    onClick={async () => {
                      await logout()
                      window.location.reload()
                    }}
                  >
                    <LogoutOutlinedIcon /> Sair
                  </p>
                </section>
              ) : (
                <section className={clsx(styles.login)}>
                  <Link href="/login" className={clsx(styles['login-link'])}>
                    <LoginOutlinedIcon /> Entrar / Cadastrar
                  </Link>
                </section>
              )}
            </section>
          </section>
        </section>
      </section>
    </header>
  )
}

export default Header
