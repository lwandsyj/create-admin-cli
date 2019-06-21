# create-admin-cli
自动化创建后台管理系统

#安装依赖
  npm install

#创建全局链接
   
   npm link

#命令
  
   #查看帮助
   create-admin -h
   
   #创建项目
   
   create-admin init <项目名称>


   #创建模块，在项目根目录下执行以下命令
   cd 项目名称：
   create-admin create <模块名称>   创建基于modal的添加编辑页面
   create-admin create <模块名称> -i  创建单独的添加页面
   create-admin create <模块名称> -d  创建基于drawer的右侧滑入添加编辑页面

   create-admin create 其他参数：
        .option('-i,--independent', '添加编辑独立于列表页')
        .option('-a,--drawer','添加编辑基于drawer')
        .option('-d,--date', '表单依赖于时间选择')
        .option('-e,--edit', '表单依赖于富文本编辑器')
        .option('-m,--codemirror', '表单依赖于代码编辑器')
        .option('-c,--checkbox', '表单依赖于checkbox')
        .option('-r,--radio', '表单依赖于radio')
        .option('-w,--switch', '表单依赖于switch')
        .option('-l,--slider', '表单依赖于slider')
        .option('-s,--select', '表单依赖于select')

   参数可以多选，例如：
   create-admin create Hello -idmc
   创建hello模块，单独的添加页面（添加页面跳转路由)
   添加页表单默认选项：
   时间选择，代码编辑器，checkbox
