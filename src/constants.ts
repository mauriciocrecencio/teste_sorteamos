export enum Status {
  OPEN = 'open',
  ONHOLD = 'onhold',
  DONE = 'done',
}

export const PaymentStatus = {
  expired: {
    icon: 'red',
    title: 'Compra recusada!',
    sub: 'Sua compra foi recusada.',
  },
  checking: {
    icon: 'yellow',
    title: 'Em análise!',
    sub: 'Seu pagamento será analisado.',
  },
  pending: {
    icon: 'yellow',
    title: 'Aguardando Pagamento!',
    sub: 'Finalize o pagamento.',
  },
  paid: {
    icon: 'green',
    title: 'Compra Aprovada!',
    sub: 'Agora é só torcer!',
  },
}
