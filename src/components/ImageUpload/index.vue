<template>
  <div class="component-upload-image">
    <div style="display: flex; justify-content: flex-start; flex-wrap: wrap">
      <ul class="el-upload-list el-upload-list--picture-card">
        <!-- <draggable v-model="fileList"> -->
        <draggable
          :list="fileList"
          ghost-class="ghost"
          chosen-class="chosenClass"
          animation="300"
          @start="onStart"
          @end="onEnd"
        >
 
            <template #item="{ element  }">
          
     
            <li
             
              
              class="el-upload-list__item is-success animated"
            >  
              <img
                :src="element.name"
                alt=""
                class="el-upload-list__item-thumbnail"
              />
              <i class="el-icon-close"></i>
              <span class="el-upload-list__item-actions">
           
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(element)"
                >
                  

                  <el-icon><CirclePlus /></el-icon>
                </span>
              
                <span
                  class="el-upload-list__item-delete"
                  @click="handleDelete(element)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </li>
          </template>
        </draggable>
      </ul>

      <el-upload
        multiple
        :drag="true"
        :action="uploadImgUrl"
        list-type="picture-card"
        :on-success="handleUploadSuccess"
        :before-upload="handleBeforeUpload"
        :limit="limit"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        ref="imageUpload"
        :before-remove="handleDelete"
        :show-file-list="false"
        :headers="headers"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :class="{ hide: fileList.length >= limit }"
      >
        <el-icon class="avatar-uploader-icon"><plus /></el-icon>
      </el-upload>
    </div>

    <!-- 上传提示 -->
    <div class="el-upload__tip" v-if="showTip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
      </template>
      的文件<template v-if="limit"
        >，最多上传 <b style="color: #f56c6c">{{ limit }}</b> 张</template
      >
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="预览"
      width="800px"
      append-to-body
    >
      <img
        :src="dialogImageUrl"
        style="display: block; max-width: 100%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { getToken } from '@/utils/auth'
import draggable from 'vuedraggable'
const props = defineProps({
  modelValue: [String, Object, Array],
  // 图片数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ['png', 'jpg', 'jpeg', 'webp'],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true,
  },
})

const { proxy } = getCurrentInstance()
const emit = defineEmits()
const number = ref(0)
const uploadList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const baseUrl = ref('')
const uploadImgUrl = ref(import.meta.env.VITE_APP_BASE_API + '/common/upload') // 上传的图片服务器地址
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const fileList = ref([])
const onStart = () => {
  console.log('开始拖拽')
}

//拖拽结束的事件
const onEnd = () => {

  emit('update:modelValue', listToString(fileList.value))
  console.log('结束拖拽')
}
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
)
 
 
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      // 首先将值转为数组
      const list = Array.isArray(val) ? val : props.modelValue.split(',')
      // 然后将数组转为对象数组
      fileList.value = list.map((item) => {
        if (typeof item === 'string') {
          if (item.indexOf(baseUrl.value) === -1) {
            item = { name: baseUrl.value + item, url: baseUrl.value + item }
          } else {
            item = { name: item, url: item }
          }
        }
        return item
      })
    } else {
      fileList.value = []
      return []
    }
  },
  { deep: true, immediate: true }
)

// 上传前loading加载
function handleBeforeUpload(file) {
  let isImg = false
  if (props.fileType.length) {
    let fileExtension = ''
    if (file.name.lastIndexOf('.') > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
    }
    isImg = props.fileType.some((type) => {
      if (file.type.indexOf(type) > -1) return true
      if (fileExtension && fileExtension.indexOf(type) > -1) return true
      return false
    })
  } else {
    isImg = file.type.indexOf('image') > -1
  }

  if (!isImg) {
    proxy.$modal.msgError(
      `文件格式不正确, 请上传${props.fileType.join('/')}图片格式文件!`
    )
    return false
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      proxy.$modal.msgError(`上传头像图片大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  proxy.$modal.loading('正在上传图片，请稍候...')
  number.value++
}

// 文件个数超出
function handleExceed() {
  proxy.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    uploadList.value.push({
      name: res.fileName,
      url: res.fileName,
    })
    baseUrl.value = res.uploadBaseUrl
    uploadedSuccessfully()
  } else {
    number.value--
    proxy.$modal.closeLoading()
    proxy.$modal.msgError(res.msg)
    proxy.$refs.imageUpload.handleRemove(file)
    uploadedSuccessfully()
  }
}

// 删除图片
function handleDelete(file) {
  debugger
  const findex = fileList.value.map((f) => f.name).indexOf(file.name)
  if (findex > -1 && uploadList.value.length === number.value) {
    fileList.value.splice(findex, 1)
    emit('update:modelValue', listToString(fileList.value))
    return false
  }
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value
      .filter((f) => f.url !== undefined)
      .concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit('update:modelValue', listToString(fileList.value))
    proxy.$modal.closeLoading()
  }
}

// 上传失败
function handleUploadError() {
  proxy.$modal.msgError('上传图片失败')
  proxy.$modal.closeLoading()
}

// 预览
function handlePictureCardPreview(file) {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
  let strs = ''
  separator = separator || ','
  for (let i in list) {
    if (undefined !== list[i].url && list[i].url.indexOf('blob:') !== 0) {
      strs += list[i].url.replace(baseUrl, '') + separator
    }
  }
  return strs != '' ? strs.substr(0, strs.length - 1) : ''
}
</script>

<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
:deep(.hide .el-upload--picture-card) {
  display: none;
}
</style>
