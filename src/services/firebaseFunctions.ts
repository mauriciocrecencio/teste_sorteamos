import { storage } from './firebase'
// import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

async function uploadImagesToFirebaseStorage(files, showLog = false) {
  const promises = []
  for (const file of files) {
    const promise = new Promise((resolve, reject) => {
      if (file.link) {
        return resolve(file)
      }

      const filename = uuidv4()
      const storageRef = ref(storage, `${window.location.hostname}/${filename}`)

      uploadString(storageRef, file.base64, 'data_url')
        .then(() => {
          showLog &&
            console.log(
              `Upload da imagem ${filename} para o Firebase Storage realizado com sucesso!`,
            )

          return getDownloadURL(storageRef)
            .then((url) => {
              showLog && console.log('Link da imagem:', url)
              file.link = url
              return resolve(file)
            })
            .catch((error) => {
              showLog &&
                console.error('Erro ao recuperar o URL da imagem:', error)
              throw error
            })
        })
        .catch((error) => {
          reject(error)
          showLog &&
            console.error(
              `Erro ao fazer o upload da imagem ${filename} para o Firebase Storage:`,
              error,
            )
        })
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}

export { uploadImagesToFirebaseStorage }
