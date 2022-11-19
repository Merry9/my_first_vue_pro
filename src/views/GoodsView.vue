<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题：">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="详情：">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="newDataList.comList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="introduce" label="详情" />
        </el-table>
        <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next"
            :total="selectData.count * 2" />
    </div>
</template>
<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { getGoodsList } from '../request/api';
import { InitData, listInt } from '../type/goods'
export default defineComponent({
    setup() {
        const dataList = reactive(new InitData());
        const { selectData } = dataList;
        onMounted(() => {
            getGoods();
        });
        const getGoods = () => {
            getGoodsList().then((res) => {
                const { data = [] } = res.data;
                dataList.list = data;
                selectData.count = data.length;
            })
        }

        const newDataList = reactive({
            comList: computed(() => {
                const { page = 1, pageSize = 10 } = selectData;
                return dataList.list.slice((page - 1) * pageSize, page * pageSize);
            })
        })
        const currentChange = (page: number) => {
            selectData.page = page;
        }
        const sizeChange = (pagesize: number) => {
            selectData.pageSize = pagesize;
        }
        // 查询功能
        const onSubmit = () => {
            let searchArr: listInt[] = [];//存储筛选后的数据
            const { list = [] } = dataList;
            const { title = '', introduce = '' } = dataList.selectData;
            if (title || introduce) {
                if (title) {
                    searchArr = list.filter((value) => {
                        return value.title.indexOf(title) !== -1;
                    });
                }
                if (introduce) {
                    searchArr = list.filter((value) => {
                        return value.introduce.indexOf(introduce) !== -1;
                    });
                }
            } else {
                searchArr = [...list];
            }
            dataList.selectData.count = searchArr.length;
            dataList.list = searchArr;
        };
        // 监听输入框2个属性
        watch([() => dataList.selectData.title, () => dataList.selectData.introduce], () => {
            const { title = '', introduce = '' } = dataList.selectData;
            if (title == '' && introduce == '') {
                getGoods();
            }
        })
        return { ...toRefs(dataList), newDataList, currentChange, sizeChange, onSubmit }
    }
})
</script>
<style scoped lang="scss">

</style>