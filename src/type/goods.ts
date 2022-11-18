export interface listInt {
    userId: number,
    id: number,
    title: string,
    introduce: string
}
interface selectDataInt {
    title: string,
    introduce: string,
    page: number,//页码
    count: number,//总条数
    pageSize: number,//一页展示几条
}
export class InitData {
    selectData: selectDataInt = {
        title: '',
        introduce: '',
        page: 1,
        pageSize:5,
        count: 0,
    }
    list: listInt[] = []//展示内容数据

}