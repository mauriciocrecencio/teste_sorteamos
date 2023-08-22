import { Skeleton, Card } from '@mui/material'

const HomePageLoader = () => (
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

    {Array(6)
      .fill(null)
      .map((_, index) => (
        <Card
          key={index}
          sx={{ m: '10px 0px', display: 'flex', alignItems: 'center' }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={90}
            height={90}
            sx={{ m: 1 }}
          />
          <div style={{ height: 'fit-content' }}>
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
      ))}
  </>
)

export default HomePageLoader
