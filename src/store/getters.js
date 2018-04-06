/**
 * Created by kangxiaoxiao on 2018/4/5.
 */

const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles

}
export default getters;