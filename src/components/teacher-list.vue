<template>
  <div id="teacher-div">
    <el-table
      id="teacher-table"
      ref="multipleTable"
      :data="teachers"
      tooltip-effect="dark"
      max-height="780px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="teacher_id" label="工号" width="130" />

      <el-table-column prop="teacher_name" label="姓名" width="120" />

      <el-table-column prop="teacher_sex" label="性别" width="120" />

      <el-table-column prop="teacher_phone" label="电话" width="140" />

      <el-table-column prop="teacher_email" label="邮箱" width="180" />

      <el-table-column prop="teacher_status" label="状态" width="130" />

      <!-- 操作 -->
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button size="mini" @click="handleEdit(scope.row.teacher_id)">
            编辑
          </el-button>

          <!-- 重置 -->
          <el-popconfirm
            title="确认重置此用户？"
            style="margin-left:5px"
            @confirm="handleReset(scope.$index, scope.row.teacher_id)"
          >
            <el-button size="mini" type="info" slot="reference">
              重置
            </el-button>
          </el-popconfirm>

          <!-- 删除 -->
          <el-popconfirm
            title="确认删除此用户？"
            style="margin-left:5px"
            @confirm="handleDelete(scope.$index, scope.row.teacher_id)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

      <!-- 禁用 -->
      <el-table-column label="禁用中">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#ff4949"
            @change="handleChange"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>

    <!-- 工具按钮 -->
    <div class="tools">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 教师列表
      teachers: [{
        teacher_id: '666666666',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '1236547891@qq.com',
        teacher_status: 1,
        enable: true
      }, {
        teacher_id: '888888888',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '1236547891@321.com',
        teacher_status: 1,
        enable: true
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }, {
        teacher_id: '777777777',
        teacher_name: '张三',
        teacher_sex: 0,
        teacher_phone: '13512345687',
        teacher_email: '5558887715@321.com',
        teacher_status: 1,
        enable: false
      }],
      multipleSelection: []
    }
  },
  methods: {

    // 点击编辑
    handleEdit(id) {

    },

    // 处理重置
    handleReset(index, id) {
      console.log('重置：' + index + ' ' + id);
    },

    // 处理删除
    handleDelete(index, id) {
      console.log('删除：' + index + ' ' + id);
    },


    handleChange(value) {
      console.log(value);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="less" scoped>
#teacher-div {
  width: 100%;
  height: 878px;
  overflow: auto;

  #teacher-table {
    width: 100%;
  }

  // 分页控件
  .pagination {
    margin-top: 10px;
    margin-bottom: 0;
  }

  // 底部工具按钮
  .tools {
    margin-top: 10px;
  }
}
</style>