export default {
    index: {
        type: 'index',
        width: 60,
        align: 'center',
        checked: true
    },
    username: {
        title: '用户名',
        key: 'username',
        checked: true
    },
    fullname: {
        title: '姓名',
        key: 'fullname',
        checked: true
    },
    role: {
        title: '角色',
        key: 'role',
        checked: true,
        render: (h, params) => {
            return h('div', [
                params.row.roles.map((item) => {
                    return h('Tag', {
                        props: {
                            color: 'blue',
                            Text: item.name
                        }
                    }, item.name)
                })
            ])
        }
    }
}
