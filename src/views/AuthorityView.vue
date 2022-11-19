<template>
    <div>
        <el-tree :data="list" show-checkbox node-key="roleId" :default-checked-keys="authority" :check-strictly="true"
            ref="treeRef" :props="{
                children: 'roleList',
                label: 'name',
            }" />
    </div>
    <el-button type="primary" @click="changeAuthority">确认修改</el-button>
</template>

<script lang="ts">
import { InitData } from '@/type/authority';
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { getAuthorityList } from '../request/api';
export default defineComponent({
    setup() {
        const route = useRoute();
        const params: any = route.params;
        const data = reactive(new InitData(params.id, params.authority));
        onMounted(() => {
            getAuthorityList().then(res => {
                data.list = res.data.data;
            });
        });
        const changeAuthority = () => {
            console.log(data.treeRef.getCheckedKeys().sort((a: number, b: number) => a - b));
            // 后端修改

        };
        return { ...toRefs(data), changeAuthority };
    }
})
</script>

<style scoped>

</style>