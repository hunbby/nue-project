import axios from '@/plugins/axios/axios'

class FileService {
  async fileUpload(_file: FormData) {
    console.log('_file', _file)
    await axios
      .post('/file/upload/model', _file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default new FileService()
