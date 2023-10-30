const useImageDataURI = (file: File | undefined, reqImageSize: number) => {
  const filel = file as File
  if (filel.type == 'image/jpeg' || filel.type == 'image/png') {
    if (filel.size < reqImageSize) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(filel)
        fileReader.onload = () => {
          resolve({ data: fileReader.result })
        }

        fileReader.onerror = (error) => {
          reject({ error })
        }
      })
    } else {
      return { error: 'Maximum Image File Size is 600KB' }
    }
  } else {
    return { error: 'Please Select Image Files of JPG or PNG Only' }
  }
}

export default useImageDataURI
