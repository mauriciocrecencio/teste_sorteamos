import TelefoneBrasileiroInput from '../TelefoneBrasileiroInput'

const UserInputLogin = ({ data }) => {
  return (
    <section className={`card-item InputLogin card-flag`}>
      <section className="card-image">
        <img
          loading="lazy"
          src="default-user.jpg"
          alt={data.name}
          height="70px"
          width="70px"
        />
      </section>
      <section className="card-texts">
        <h2 className="user_name">{data.name}</h2>
        <p>
          <TelefoneBrasileiroInput
            type="text"
            value={data.phone}
            temDDD
            separaDDD
            readOnly
            required
            minLength={14}
            maxLength={15}
            placeholder="(00) 90000-0000"
          />
        </p>
      </section>
    </section>
  )
}

export default UserInputLogin
