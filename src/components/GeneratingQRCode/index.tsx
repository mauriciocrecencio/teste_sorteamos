import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'

const GeneratingQRCODE = () => {
  return (
    <section className="title-payment-container" style={{ margin: '0' }}>
      <section className="title-payment-content">
        <section className="title-payment-icon">
          <RefreshOutlinedIcon className="green" />
        </section>
        <section className="title-payment-texts">
          <h2
            className="title-payment-text"
            style={{
              fontWeight: '600',
              fontSize: '15px',
              lineHeight: '1.1',
              width: '150px',
            }}
          >
            Gerando QRCODE para pagamento...
          </h2>
        </section>
      </section>
    </section>
  )
}

export default GeneratingQRCODE
