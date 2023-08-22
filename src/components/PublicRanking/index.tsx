import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TrophyIcon from '@/assets/icons/trophy.svg'
import styles from './styles.module.css'
import { getPublicRanking } from '../../api/product'
import { capitalizeFirstLetter } from '../../services/utils'
import clsx from 'clsx'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function getFirstAndLastName(fullName) {
  const names = String(fullName).split(' ')
  const firstName = names[0]
  const lastName = names[names.length - 1]
  return `${firstName} ${lastName}`
}

const PublicRanking = ({ productName = '', productId }) => {
  const [open, setOpen] = React.useState(false)
  const [ranking, setRanking] = React.useState([])
  const [rankingType, setRankingType] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const winner = ranking.find(Boolean)

  const init = async () => {
    setIsLoading(true)
    const response = await getPublicRanking(productId)

    response.data.sort((a, b) => b.numbers_quantity - a.numbers_quantity)

    const newRanking = response.data.map((user) => {
      user.name = capitalizeFirstLetter(getFirstAndLastName(user.name.trim()))
      user.numbers_quantity = numberWithCommas(user.numbers_quantity)
      return user
    })

    setRanking(newRanking)
    setRankingType(response.type)
    setIsLoading(false)
  }

  React.useEffect(() => {
    init()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button
        // className={clsx(
        //   styles['button-item'],
        //   isLoading && styles['disabled-button'],
        // )}
        className="button-item"
        onClick={() => !isLoading && handleClickOpen()}
        style={{ backgroundColor: '#6c757d' }}
      >
        {isLoading ? (
          'Carregando...'
        ) : (
          <>
            <img src="assets/icons/trophy.svg" />
            {`Top Compradores${rankingType === 'all' ? '' : ' Diário'}`}
          </>
        )}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          <Box
            sx={{
              display: 'flex',
              alignItens: 'center',
              gap: 1,
              height: 'fit-content',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src="trophy.png" width="25" height="25" />
            </div>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
              Top Compradores {rankingType === 'all' ? '' : ' Diário'}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {ranking.length > 0 ? (
            <Typography gutterBottom>
              Esses são os maiores compradores no sorteio
              <span style={{ fontWeight: 600 }}>{` ${productName}`}</span>
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              Este produto não possui compras o suficiente
            </Typography>
          )}

          <ul className={clsx(styles['public-ranking'])}>
            {winner && (
              <li className={clsx(styles['list-item'])}>
                <div className={clsx(styles['item-icon'])}>
                  <TrophyIcon
                    style={{ width: 30, height: 'auto', fill: '#ffc107' }}
                  />
                </div>
                <div className={clsx(styles['item-text'])}>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {winner.name}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {winner.numbers_quantity} Números
                  </Typography>
                </div>
              </li>
            )}

            {ranking.slice(1).map((user) => (
              <li key={user.name}>
                <div className={clsx(styles['item-text'])}>
                  <TrophyIcon style={{ width: 22, height: 'auto' }} />
                </div>
                <div className={clsx(styles['item-text'])}>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {user.numbers_quantity} Números
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default PublicRanking
