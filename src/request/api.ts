import service from ".";
interface loginData {
    username: string,
    password: string
}
export function login(data: loginData) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}