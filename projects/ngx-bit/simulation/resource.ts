export default {
  error: 0,
  data: [
    {
      key: 'system',
      parent: 'origin',
      name: '{"zh_cn":"系统设置","en_us":"System"}',
      nav: 1,
      router: 0,
      policy: 0,
      icon: 'setting'
    },
    {
      key: 'resource-add',
      parent: 'resource-index',
      name: '{"zh_cn":"资源控制新增","en_us":"Resource Add"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'acl-index',
      parent: 'system',
      name: '{"zh_cn":"访问控制管理","en_us":"Acl"}',
      nav: 1,
      router: 1,
      policy: 1,
      icon: null
    },
    {
      key: 'acl-add',
      parent: 'acl-index',
      name: '{"zh_cn":"访问控制新增","en_us":"Acl Add"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'role-add',
      parent: 'role-index',
      name: '{"zh_cn":"权限组新增","en_us":"Role Add"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'admin-add',
      parent: 'admin-index',
      name: '{"zh_cn":"管理员新增","en_us":"Admin Add"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'profile',
      parent: 'center',
      name: '{"zh_cn":"信息修改","en_us":"Profile"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'resource-index',
      parent: 'system',
      name: '{"zh_cn":"资源控制管理","en_us":"Resource"}',
      nav: 1,
      router: 1,
      policy: 1,
      icon: null
    },
    {
      key: 'resource-edit',
      parent: 'resource-index',
      name: '{"zh_cn":"资源控制修改","en_us":"Resource Edit"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'acl-edit',
      parent: 'acl-index',
      name: '{"zh_cn":"访问控制修改","en_us":"Acl Edit"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'role-edit',
      parent: 'role-index',
      name: '{"zh_cn":"权限组修改","en_us":"Role Edit"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'admin-edit',
      parent: 'admin-index',
      name: '{"zh_cn":"管理员修改","en_us":"Admin Edit"}',
      nav: 0,
      router: 1,
      policy: 0,
      icon: null
    },
    {
      key: 'center',
      parent: 'origin',
      name: '{"zh_cn":"个人中心","en_us":"Center"}',
      nav: 0,
      router: 0,
      policy: 0,
      icon: null
    },
    {
      key: 'role-index',
      parent: 'system',
      name: '{"zh_cn":"权限组","en_us":"Role"}',
      nav: 1,
      router: 1,
      policy: 1,
      icon: null
    },
    {
      key: 'admin-index',
      parent: 'system',
      name: '{"zh_cn":"管理员","en_us":"Admin"}',
      nav: 1,
      router: 1,
      policy: 1,
      icon: null
    }
  ]
};