<template>
  <el-dialog
      :title="props.title"
      v-model="visible"
      :width="props.width"
      :height="props.height"
  >
<!--    这里必须要调整为[0]，因为formModel是一个数组,否则校验失败-->
    <el-form
        :model="props.formModel[0]"
        class="blog-publish-form"
        :rules="props.formRules"
        ref="formRef"
    >
      <div class="blog-publish-form-input-group">
        <el-form-item
            v-for="item in props.formOption"
            :key="item.prop"
            :prop="item.prop"
            style="width: 45%; margin-top: 10px"
        >
          <el-input v-model="props.formModel[0][item.prop]" :placeholder="item.placeholder"></el-input>
        </el-form-item>

        <el-select
            style="width: 45%; margin-top: 10px"
            placeholder="请选择文章分类"
            v-model="props.formModel[0].category"
        >
          <el-option v-for="option in props.categoryOptions" :key="option.value" :value="option.value" :label="option.label" />
        </el-select>

        <el-select
            style="width: 45%; margin-top: 10px"
            placeholder="请选择文章标签"
            v-model="props.formModel[0].tags"
            multiple
        >
          <el-option v-for="tag in props.tagOptions" :key="tag" :value="tag" :label="tag" />
          <template #footer>
            <el-button text bg size="small" @click="onAddTag">
              <span> 添加一个标签 </span>
              <el-icon style="margin-left: 5px">
                <DocumentAdd />
              </el-icon>
            </el-button>
          </template>
        </el-select>
      </div>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { DocumentAdd } from "@element-plus/icons-vue";
import type {BlogItemFormRule} from "@/api/interface";


const visible = ref(true)
// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "保存文章",
  },
  width: {
    type: String,
    default: "80%",
  },
  height: {
    type: String,
    default: "90%",
  },
  formModel: {
    type: Array,
    required: true,
  },
  formRules: {
    type: Object,
    default: () => ({}),
  },
  formOption: {
    type: Array,
    default: () => [],
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
  tagOptions: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["update:visible", "confirm", "cancel", "add-tag"]);

// Methods
const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  emit("update:visible", false);
  emit("cancel");
};

const onAddTag = () => {
  emit("add-tag");
};
</script>