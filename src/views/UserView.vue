<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="角色：">
                    <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
                        <el-option label="全部" :value="0" />

                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="nickName" label="姓名" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" link :key="item.role" size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="changeUser(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


    <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateUser">更改</el-button>
                <el-button type="primary" @click="cancelUpdate">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api';
import { InitData, ListInt } from '../type/user';
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        onMounted(() => {
            getUser();
            getRole();
        });
        const getUser = () => {
            getUserList().then(res => {
                data.list = res.data.data;
            })
        }
        const getRole = () => {
            getRoleList().then(res => {
                data.roleList = res.data.data;
            })
        }
        const onSubmit = () => {
            let searchArr: ListInt[] = [];//存储筛选后的数据
            const { list = [] } = data;
            const { nickName = '', role = '' } = data.selectData;
            if (nickName || role) {
                if (nickName) {
                    searchArr = list.filter((value) => {
                        return value.nickName.indexOf(nickName) !== -1;
                    });
                }
                if (role) {
                    searchArr = (data.selectData.nickName ? searchArr : data.list).filter((value) => {
                        return value.role.find((item) => item.role === data.selectData.role);
                    });
                }
            } else {
                searchArr = [...list];
            }
            data.list = searchArr;
        }
        watch([() => data.selectData.nickName, () => data.selectData.role], () => {
            const { nickName = '', role = 0 } = data.selectData;
            if (nickName == '' || role == 0) {
                getUser();
            }
        })
        const changeUser = (row: ListInt) => {
            data.active = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                role: row.role.map((value: any) => value.role || value.roleId)
            }
            data.isShow = true;
        }
        const updateUser = () => {
            let obj: any = data.list.find(value => value.id === data.active.id);
            obj.nickName = data.active.nickName;
            obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !== -1);
            data.list.forEach((item, index) => {
                if (item.id === obj.id) {
                    data.list[index] = obj;
                }
            });
            data.isShow = false;
        }
        const cancelUpdate = () => {
            data.isShow = false;
        }
        return { ...toRefs(data), onSubmit, changeUser, updateUser, cancelUpdate };
    }
})
</script>

<style scoped>

</style>