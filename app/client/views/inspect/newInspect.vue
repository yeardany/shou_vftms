<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        巡检详情
      </template>
    </NavBar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="inspectName"
        name="巡检名称"
        label="巡检名称"
        placeholder="巡检名称"
        :rules="[{ required: true, message: '请填写巡检名称' }]"
      />
      <van-field
        v-model="length"
        type="体长"
        name="体长"
        label="体长"
        placeholder="体长，单位（cm）"
        :rules="[{ required: true, message: '请填写体长' }]"
      />
      <van-field
        v-model="weight"
        type="体重"
        name="体重"
        label="体重"
        placeholder="体重，单位（kg）"
        :rules="[{ required: true, message: '请填写体重' }]"
      />
      <van-field
        v-model="ps"
        rows="1"
        autosize
        show-word-limit
        label="备注"
        type="textarea"
        maxlength="150"
        placeholder="请输入备注"
      />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="uploader"/>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import axios from "axios";
import api from "../../../config/api";

export default {
  name: "newInspect",
  data() {
    return {
      inspectName: '',
      length: '',
      weight: '',
      ps: '',
      uploader: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}]
    };
  },
  methods: {
    onSubmit(values) {

      let params = new URLSearchParams();
      params.append('iName', this.inspectName);
      params.append('iWho', '巡检员01');
      params.append('iLength', this.length);
      params.append('iWeight', this.weight);
      params.append('other', this.ps);
      params.append('time', new Date().getTime());

      axios.post(api.api.addInspects, params).then((res) => {
        console.log('----------->', res)
      })

    },
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
