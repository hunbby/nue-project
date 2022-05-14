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
