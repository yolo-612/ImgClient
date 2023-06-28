<template>
  <h2>图片分片上传下载</h2>
  <div class="img-upload-area">
    <input type="file" name="file" ref="fileInput" />
    <input type="button" value="上传文件" @click=upload />
  </div>
</template>

<script setup lang="ts">
import '@/app.css'
import '@/app.less'
import { ref } from 'vue'
import axios from 'axios'
import { FileUploaderClient } from './utils/imgClient/index'

const fileInput = ref(null)

const HOST = 'http://localhost:10001/'
let uploadId = ''
const fileUploaderClient = new FileUploaderClient({
    chunkSize: 2 * 1024 * 1024, // 2MB
    requestOptions: {
      retryTimes: 2,
      initFilePartUploadFunc: async () => {
        const fileName = fileInput.value.files[0].name
        const { data } = await axios.post(`${HOST}api/initUpload`, {
          name: fileName,
        })
        uploadId = data.uploadId
        console.log('初始化上传完成')
        //  setUrl('')
      },
      uploadPartFileFunc: async (chunk: Blob, index: number) => {
        const formData = new FormData()
        formData.append('uploadId', uploadId)
        formData.append('partIndex', index.toString())
        formData.append('partFile', chunk)

        await axios.post(`${HOST}api/uploadPart`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log(`上传分片${index}完成`)
      },
      finishFilePartUploadFunc: async (md5: string) => {
        const fileName = fileInput.value.files[0].name
        const { data } = await axios.post(`${HOST}api/finishUpload`, {
          name: fileName,
          uploadId,
          md5,
        })
        console.log(`上传完成，存储地址为：${HOST}${data.path}`)
        // setUrl(`${HOST}${data.path}`)
      },
    },
  })

const upload = () => {
  if(fileInput.value){
    fileUploaderClient.uploadFile(fileInput.value.files[0])
  }
  console.log(fileInput.value.files[0])
}

</script>
<style scoped>

</style>