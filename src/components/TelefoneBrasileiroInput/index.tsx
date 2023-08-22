interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  temDDD?: boolean
  separaNono?: boolean
  separaDDD?: boolean
}

const TelefoneBrasileiroInput = ({
  temDDD = false,
  onChange,
  separaDDD = false,
  separaNono = false,
  value,
  ...restProps
}: IProps) => {
  const TYPES = {
    OITO: '9999-9999',
    NOVE: '99999-9999',
    SNOVE: '9 9999-9999',

    DDDOITO: '(99)9999-9999',
    DDDNOVE: '(99)99999-9999',
    DDDSNOVE: '(99)9 9999-9999',

    SDDDOITO: '(99) 9999-9999',
    SDDDNOVE: '(99) 99999-9999',
    SDDDSNOVE: '(99) 9 9999-9999',
  }

  const MAX_LENGTH = temDDD
    ? separaDDD
      ? separaNono
        ? clear(TYPES.SDDDSNOVE).length
        : clear(TYPES.SDDDNOVE).length
      : separaNono
      ? clear(TYPES.DDDSNOVE).length
      : clear(TYPES.DDDNOVE).length
    : separaNono
    ? clear(TYPES.SNOVE).length
    : clear(TYPES.NOVE).length

  value = clear(value)

  if (value) {
    value = applyMask(value, TYPES[getMask(value)])
  }

  function onLocalChange(ev) {
    let value = clear(ev.target.value)
    const mask = getMask(value)

    const nextLength = value.length

    if (nextLength > MAX_LENGTH) return

    value = applyMask(value, TYPES[mask])

    ev.target.value = value

    onChange(ev)
  }

  function getMask(value) {
    if (temDDD) {
      if (separaDDD) {
        if (separaNono) {
          return value.length > 10 ? 'SDDDSNOVE' : 'SDDDOITO'
        } else {
          return value.length > 10 ? 'SDDDNOVE' : 'SDDDOITO'
        }
      } else {
        if (separaNono) {
          return value.length > 10 ? 'DDDSNOVE' : 'DDDOITO'
        } else {
          return value.length > 10 ? 'DDDNOVE' : 'DDDOITO'
        }
      }
    } else {
      if (separaNono) {
        return value.length > 8 ? 'SNOVE' : 'OITO'
      } else {
        return value.length > 8 ? 'NOVE' : 'OITO'
      }
    }
  }

  function applyMask(value, mask) {
    let result = ''

    let inc = 0

    Array.from(value).forEach((letter, index) => {
      while (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc]
        inc++
      }
      result += letter
    })

    return result
  }

  function clear(value) {
    return value && value.replace(/[^0-9]/g, '')
  }

  return (
    <input
      value={value}
      onChange={onLocalChange}
      pattern="[0-9() -]*"
      inputMode="numeric"
      {...restProps}
    />
  )
}

export default TelefoneBrasileiroInput
