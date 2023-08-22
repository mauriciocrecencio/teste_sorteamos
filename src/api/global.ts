import axios from 'axios'

export const getStaticData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/static/public/data.json`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
