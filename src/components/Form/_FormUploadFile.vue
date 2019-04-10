<template>
  <a-upload
    :multiple="false"
    :data="{ token }"
    name="file"
    action="https://upload.qiniup.com"
    @change="handleChange"
  >
    <a-button>
      <a-icon type="upload" /> Click to Upload
    </a-button>
  </a-upload>
  <!-- <a-upload
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :data="{ token }"
    list-type="picture-card"
    class="avatar-uploader"
    action="https://upload.qiniup.com"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" >
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload> -->
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'FormUploadFile',

  props: {
    value: String
  },

  data() {
    return {
      loading: false,
      token: '',
      imageUrl: ''
    }
  },

  watch: {
    value(val) {
      this.imageUrl = val
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      const data = await this.Fetch.get('/upload/token')
      this.token = data.uploadToken
    },

    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        const url = `https://yundun-statics.yundun.com/${info.file.response.hash}`
        this.$emit('success', url)
        this.$emit('input', url)
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // if (!isJPG) {
      //   this.$message.error('You can only upload JPG file!')
      // }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="less">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;

  img {
    max-width: 128px;
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
