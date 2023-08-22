import { getProductsWinners } from '@/api/product'
import WinnersList from '@/components/WinnersList'

export async function getServerSideProps() {
  const winners = await getProductsWinners()
  return {
    props: {
      winners,
    },
  }
}

export default function Ganhadores({ winners }) {
  return <WinnersList winners={winners} />
}
