import { Skeleton, Card } from '@mui/material'

const SummaryPageLoader = () => (
  <>
    <Card>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={290}
      />
    </Card>
  </>
)

export default SummaryPageLoader
