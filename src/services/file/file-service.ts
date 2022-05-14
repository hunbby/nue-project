import axios from '@/plugins/axios/axios'

class FileService {
  async fileUpload(_file: FormData) {
    console.log('_file', _file)
    const result = await axios
      .post('/file/upload/model', _file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log(error)
      })
    return result
  }
}

export default new FileService()
