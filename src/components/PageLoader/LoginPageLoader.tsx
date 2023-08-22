import { Skeleton, Card } from '@mui/material'
import Title from '../Title'

const LoginPageLoader = () => (
  <>
    <Title data={{ title: '⚡Login', sub: '' }} />

    <Card sx={{ m: '15px 0px 20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={65}
      />
    </Card>

    <Card sx={{ m: '20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={32}
      />
    </Card>

    <Card sx={{ m: '20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={40}
      />
    </Card>
  </>
)

export default LoginPageLoader
