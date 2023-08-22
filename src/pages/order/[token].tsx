import Order from '@/components/Order'

export function getServerSideProps(context) {
  return {
    props: {
      token: context.query.token,
    },
  }
}

export default function OrderPage({ token }) {
  return <Order token={token} />
}
