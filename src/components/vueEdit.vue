<template>
  <div>
    <admin-header></admin-header>
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import adminHeader from "@/common/admin-header";
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data() {
    return {
      content: "<h3>文本编辑</h3>",
      editorOption: {}
    };
  },
  components: {
    adminHeader,
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    submit() {
      console.log(this.content);
      this.$message.success("提交成功！");
    }
  }
};
</script>

<style scoped>
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.submit_btn {
  text-align: center;
}
</style>