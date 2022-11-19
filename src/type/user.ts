export interface ListInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}
interface RoleInt {
    role: number,
    roleName: string
}
interface SelectDataInt {
    nickName: string,
    role: number
}
interface RoleListInt {
    authority: number,
    roleId: number,
    roleName: string
}
interface ActiveInt {
    id: number,
    nickName: string,
    role: number[],
    userName: string
}
export class InitData {
    selectData: SelectDataInt = {
        nickName: '',
        role: 0
    }
    list: ListInt[] = []//接收用户信息
    roleList: RoleListInt[] = []//接收角色信息列表
    isShow = false
    active: ActiveInt = {//选中的对象
        id: 0,
        nickName: '',
        role: [],
        userName: ''
    }
}