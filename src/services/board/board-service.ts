import axios from '@/plugins/axios/axios'

class BoardService {
  async insertBoard(params: unknown) {
    const result = await axios
      .post('/boardInert', params)
      .then((res) => {
        console.log('board insert result : ', res)
        return res.data
      })
      .catch((error) => {
        alert(error)
      })
    return result
  }
}

export default new BoardService()
