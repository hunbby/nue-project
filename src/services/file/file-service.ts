import axios from '@/plugins/axios/axios'

class FileService {
  async fileUpload(_file: FormData) {
    console.log('fileUpload_file', _file)
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

  async fileDel(_file: any) {
    console.log('fileDel_file', _file)
    const result = await axios
      .post('/file/delete', _file)
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
