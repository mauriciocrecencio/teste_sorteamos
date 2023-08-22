import { Skeleton, Card } from '@mui/material'
import Title from '../Title'

const ProductPageLoader = () => (
  <>
    <Card>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={'100%'}
        height={290}
        sx={{ mb: 1 }}
      />

      <div style={{ margin: '0px 0px 15px 10px' }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={160}
          height={20}
          sx={{ m: '5px 0px' }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={150}
          height={20}
          sx={{ m: '5px 0px' }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={160}
          height={20}
          sx={{ m: '5px 0px' }}
        />
      </div>
    </Card>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ m: '20px 0px' }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={150}
          height={30}
        />
      </Card>
    </div>

    <Card sx={{ m: '20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={30}
      />
    </Card>

    <Card>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={290}
      />
    </Card>

    <Card sx={{ m: '20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={30}
      />
    </Card>

    <Card>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={290}
      />
    </Card>

    <Card sx={{ m: '20px 0px' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={30}
      />
    </Card>
  </>
)

export default ProductPageLoader
