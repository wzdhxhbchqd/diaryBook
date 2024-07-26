<template>
    <div class="note-publish">
        <div class="editor">
            <QuillEditor theme="snow" placeholder="请输入日记内容" v-model:content="state.content" contentType="html" />
        </div>
        <div class="note-wrap">
            <div class="note-cell">
                <van-field v-model="state.title" label="标题" placeholder="请输入日记标题" />
            </div>
            <div class="note-cell">
                <van-field label="上传图片">
                    <template #input>
                        <van-uploader v-model="state.img" :after-read="afterRead" max-count="1" />
                    </template>
                </van-field>
            </div>
            <div class="note-cell">
                <div class="sort" @click="state.sortShow = true">
                    <span>选择分类</span>
                    <span>{{ state.note_type }}<van-icon name="arrow" /></span>
                </div>
                <van-action-sheet v-model:show="state.sortShow" :actions="actions" @select="onSelect" />
            </div>
        </div>
        <div class="btn" @click="publishNote">
            <van-button type="primary" block>发布日记</van-button>
        </div>
    </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from 'vue'
import axios from '@/api'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'

const router = useRouter()
const state = reactive({
    content: '',
    title: '',
    img: [],
    sortShow: false,
    note_type: '美食',
})
const actions = [
    { name: '美食' },
    { name: '旅行' },
    { name: '恋爱' },
    { name: '学习' },
    { name: '吵架' },
];
const onSelect = (item) => {
    state.sortShow = false;
    state.note_type = item.name;
};
const afterRead = () => {
    console.log('图片读取到了', state.img);
}
const publishNote = async () => {
    const date = new Date()
    console.log(`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    const res = await axios.post('/publishNote', {
        title: state.title,
        head_img: state.img.length ? state.img[0].content : '',
        note_type: state.note_type,
        note_content: state.content,
        nickname: JSON.parse(localStorage.getItem('userInfo')).nickname,
        user_id: JSON.parse(localStorage.getItem('userInfo')).id,
        c_time: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    })
    showSuccessToast(res.msg)
    console.log(res);
    router.push('/noteClass')
}
</script>

<style lang="less" scoped>
.note-publish {
    min-height: 100vh;

    :deep(.ql-container) {
        height: 200px;
    }

    .note-cell {
        border-bottom: 1px solid #d1d5db;

        .sort {
            display: flex;
            justify-content: space-between;
            line-height: 3;
            padding: 10px 16px;
            font-size: 14px;
            color: #323233;
        }
    }

    .btn {
        width: 80%;
        margin: 0 auto;
        margin-top: 2rem;
    }
}
</style>