declare interface FileData {
  file: {
    fileSeq: string
    fileTypeCd: string
    ognlFileNm: string
    makeFileNm: string
    thumFileNm: string
    filePath: string
    fileHash: string
    creationId: string
    creationDt: string
    fileDesc: string
  } | null
}

declare interface FileDatas {
  fileSeq: string | null
  fileTypeCd: string | null
  ognlFileNm: string | null
  makeFileNm: string | null
  thumFileNm: string | null
  filePath: string | null
  fileHash: string | null
  creationId: string | null
  creationDt: string | null
  fileDesc: string | null
}
