import { Skeleton, Card } from '@mui/material'

const ListLoader = () => (
  <>
    {Array(6)
      .fill(null)
      .map((_, index) => (
        <Card key={index} sx={{ mt: 2, display: 'flex' }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'90px'}
            height={90}
            sx={{ mt: 1, mb: 1, ml: 1, borderRadius: '5px' }}
          />

          <div style={{ marginTop: 2 }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'150px'}
              height={15}
              sx={{ mt: 1, mb: 1, ml: 1 }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'150px'}
              height={15}
              sx={{ mt: 1, mb: 1, ml: 1 }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'150px'}
              height={15}
              sx={{ mt: 1, mb: 1, ml: 1 }}
            />
          </div>
        </Card>
      ))}
  </>
)

export default ListLoader
