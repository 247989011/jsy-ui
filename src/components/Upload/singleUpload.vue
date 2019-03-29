<template> 
  <div><!--action="http://macro-oss.oss-cn-shenzhen.aliyuncs.com"-->
    <el-upload
      :action="importUrl"
      :headers="importHeaders"
      :data="dataObj"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'

  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        importUrl:'/admin/fdfs/upload',//后台接口config.admin_url+'rest/schedule/import/'
        importHeaders:{
          enctype:'multipart/form-data',
          cityCode:''
        },
        dialogVisible: false
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        // return new Promise((resolve, reject) => {
        //   policy().then(response => {
        //     _self.dataObj.policy = response.policy;
        //     _self.dataObj.signature = response.signature;
        //     _self.dataObj.ossaccessKeyId = response.accessKeyId;
        //     _self.dataObj.key = response.dir + '/${filename}';
        //     _self.dataObj.dir = response.dir;
        //     _self.dataObj.host = response.host;
        //     resolve(true)
        //   }).catch(err => {
        //     console.log(err)
        //     reject(false)
        //   })
        // })
      },
      handleUploadSuccess(res, file) {
        debugger
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
        this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style>

</style>


