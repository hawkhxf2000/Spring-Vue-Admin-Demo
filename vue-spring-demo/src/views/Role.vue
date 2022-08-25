<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入角色名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-input style="width: 200px" placeholder="请输入角色描述" suffix-icon="el-icon-message" class="ml-5"
                v-model="description"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="danger" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <!--      <el-upload action="http://localhost:8081/role/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">-->
      <!--        <el-button type="primary" class="ml-5">导入 <i class="el-icon-top"></i></el-button>-->
      <!--      </el-upload>-->
      <!--      <el-button type="primary" class="ml-5" @click="exp">导出 <i class="el-icon-top"></i></el-button>-->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" size="medium"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="160" align="center"></el-table-column>
      <el-table-column prop="description" label="角色描述" width="500" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template v-slot="edit">
          <el-button type="primary" @click="selectMenu(edit.row.id)">分配菜单 <i class="el-icon-menu"></i></el-button>
          <el-button type="success" @click="handleEdit(edit.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(edit.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="分配菜单" :visible.sync="dialogMenuVisible" width="30%">
      <el-tree
          :data="menuData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2]"
          :default-checked-keys="[4]"
          :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {serverIp} from "../../public/config";
import request from "@/utils/request";

export default {
  name: "Role",
  data() {
    return {
      // serverIp: serverIp,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      description: "",
      form: {},
      dialogFormVisible: false,
      dialogMenuVisible: false,
      multipleSelection: [],
      headerBg: 'headerBg',
      menuData: [{
        id: 1,
        label: '主页',
        children: []
      },
        {
          id: 2,
          label: '系统管理',
          children: [{
            id: 3,
            label: '用户管理'
          },
            {
              id: 4,
              label: '角色管理'
            }, {
              id: 5,
              label: '菜单管理'
            }, {
              id: 6,
              label: '文件管理'
            }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      // roles: [],
      // courses: [],
      // vis: false,
      // stuCourses: [],
      // stuVis: false
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/role/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
          description: this.description
        }
      }).then(res => {
        this.tableData = res.records
        this.total = res.total
      })
    },
    reset() {
      this.name = ""
      this.description = ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      // console.log(this.form)
      request.post("/role/save", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.form = {}
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleEdit(row) {
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    del(id) {
      // console.log(id)
      request.delete("/role/deletebyid/" + id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch() {
      let ids = this.multipleSelection.map(e => e.id);
      console.log(ids)
      request.post("/role/deletebatchids", ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    selectMenu(roleId) {
      this.dialogMenuVisible = true
    },
    // exp() {
    //   window.open("http://localhost:8081/role/export")
    // },
    // handleExcelImportSuccess() {
    //   this.$message.success("导入成功")
    //   this.load()
    // },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },
}
</script>


<style>
.headerBg {
  background: #eee !important;
}
</style>
