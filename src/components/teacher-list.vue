<template>
  <div id="teacher-div">
    <!-- 顶部的工具按钮 -->
    <div class="tools-top">
      <el-col :span="8">
        <el-input
          id="searchBar"
          placeholder="输入工号"
          v-model="searchBarText"
          clearable
        >
        </el-input>
      </el-col>
      <el-button id="btn-search" @click="handleSearch">搜索</el-button>
      <el-button @click="addTeacherDialogVisible = true">添加教师</el-button>
      <el-button>批量导入</el-button>
    </div>

    <!-- 教师表格 -->
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
          <el-button size="mini" @click="handleEdit(scope.row)">
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
            @change="handleChange(scope.row)"
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
      :total="totalTeacherCount"
      @current-change="pageChange"
    >
    </el-pagination>

    <!-- 工具按钮 -->
    <div class="tools-bottom">
      <el-button @click="deleteSelection()">删除所选</el-button>
    </div>

    <!-- 对话框 -->
    <!-- 编辑教师的对话框 -->
    <el-dialog
      title="编辑教师"
      :visible.sync="editTeacherDialogVisible"
      width="45%"
    >
      <el-form :model="editTeacherForm" label-position="left">
        <el-form-item label="工 号" label-width="50px">
          <el-input v-model="editTeacherForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="姓 名" label-width="50px">
          <el-input v-model="editTeacherForm.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="电 话" label-width="50px">
          <el-input v-model="editTeacherForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" label-width="50px">
          <el-input v-model="editTeacherForm.email"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editTeacherDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="onEditClick">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 对话框 -->
    <!-- 添加教师的对话框 -->
    <el-dialog
      title="添加学生"
      :visible.sync="addTeacherDialogVisible"
      width="45%"
    >
      <el-form :model="addTeacherForm" label-position="left">
        <el-form-item label="工 号" label-width="50px">
          <el-input v-model="addTeacherForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓 名" label-width="50px">
          <el-input v-model="addTeacherForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性 别" label-width="50px">
          <el-select v-model="addTeacherForm.sex" placeholder="性别">
            <el-option
              v-for="item in sexOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电 话" label-width="50px">
          <el-input v-model="addTeacherForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" label-width="50px">
          <el-input v-model="addTeacherForm.email"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeacherDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="onAddClick">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import jwt_decode from '@/util/jwt-decode.js';
export default {
  data() {
    return {
      // 教师列表
      teachers: [{
        teacher_id: '正在获取中...',
        teacher_name: '正在获取中...',
        teacher_sex: '获取中...',
        teacher_phone: '正在获取中...',
        teacher_email: '正在获取中...',
        teacher_status: 'LOADING',
        enable: false
      }],
      // 搜索框文字
      searchBarText: '',
      searching: false,

      // 教师总数
      totalTeacherCount: 1,
      multipleSelection: [],
      currentPage: 0,
      sizePerPage: 13,

      // 编辑教师的对话框
      editTeacherDialogVisible: false,
      editTeacherForm: {
        id: '',
        name: '',
        phone: '',
        email: ''
      },

      // 添加教师的对话框
      addTeacherDialogVisible: false,
      addTeacherForm: {
        id: '',
        name: '',
        sex: 1,
        phone: '',
        email: ''
      },
      sexOpts: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }]
    }
  },

  // 数据加载
  async created() {
    this.refersh(this.currentPage, this.sizePerPage);
  },

  methods: {
    // 请求数据并刷新
    async refersh(page, size) {
      let err, data;
      // 判断是否在搜索中
      if (this.searching) {
        [data, err] = await this.$awaitWrap(this.$get('teacher/all', {
          page: page,
          size: size,
          condition: this.searchBarText
        }));
      } else {
        [data, err] = await this.$awaitWrap(this.$get('teacher/all', {
          page: page,
          size: size
        }));
      }

      if (err) {
        this.$message.warning(err);
        this.teachers = [];
        return;
      }
      if (data.code === 300) {
        this.$message.info(data.msg);
        this.teachers = [];
        this.totalTeacherCount = 0;
        return;
      }
      // 请求成功，拿到数据
      console.log('刷新成功 ↓ ↓');
      console.log(data);
      console.log('刷新成功 ↑ ↑');
      this.teachers = this.formatData(data.data.teachers);
      this.totalTeacherCount = data.data.total - 1;
    },

    // 处理数据
    formatData(teachers) {
      for (let i = 0; i < teachers.length; i++) {
        teachers[i].teacher_sex = teachers[i].teacher_sex === 0 ? '女' : '男';
        teachers[i]['enable'] = teachers[i].teacher_status === 0;
        teachers[i].teacher_status = teachers[i].teacher_status === 1 ? 'OK' : 'Disable';
      }
      return teachers;
    },

    // 处理搜索
    async handleSearch() {
      this.searching = true;
      this.refersh(0, this.sizePerPage);
    },

    // 点击编辑
    handleEdit(row) {
      console.log(row);
      this.editTeacherDialogVisible = true;
      this.editTeacherForm = {
        id: row.teacher_id,
        name: row.teacher_name,
        phone: row.teacher_phone,
        email: row.teacher_email
      }
    },
    // 处理编辑
    async onEditClick() {
      let params = {
        id: this.editTeacherForm.id,
        phone: this.editTeacherForm.phone,
        email: this.editTeacherForm.email
      }
      let [data, err] = await this.$awaitWrap(this.$post('/teacher/update', params));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.editTeacherDialogVisible = false;
      this.$message.success(data.msg);
      this.refersh(this.currentPage, this.sizePerPage);
    },

    // 处理添加
    async onAddClick() {
      // 拿到当前管理员用户的id
      // 从token里面获取
      let obj = jwt_decode(localStorage.getItem('hncj_management_admin_token'));
      this.addTeacherForm.admin_id = obj.id;

      let [data, err] = await this.$awaitWrap(this.$post('teacher/insert', this.addTeacherForm));

      if (err) {
        this.$message.warning(err);
        return;
      }

      this.$message.success(data.msg);
      this.addTeacherDialogVisible = false;
      this.refersh(this.currentPage, this.sizePerPage);

      // 清空表单的数据
      this.addTeacherForm = {
        id: '',
        name: '',
        sex: 1,
        phone: '',
        email: ''
      };

    },

    // 处理重置
    async handleReset(index, id) {
      let [data, err] = await this.$awaitWrap(this.$post('teacher/reset', {
        id: id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success('重置成功');
    },

    // 处理删除
    async handleDelete(index, id) {
      let [data, err] = await this.$awaitWrap(this.$post('teacher/delete', {
        id: id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success('删除成功');
      this.refersh(this.currentPage, this.sizePerPage);
    },

    // 禁用按钮切换
    async handleChange(row) {
      console.log(row.teacher_id);
      console.log(row.teacher_status);
      // 切换为disable
      let params = {
        id: row.teacher_id,
        status: 0
      }
      if (row.teacher_status === 'OK') {
        console.log(row.teacher_id + '切换为disable');
        params.status = 0;
      }
      // 切换为OK
      else {
        console.log(row.teacher_id + '切换为OK');
        params.status = 1;
      }
      let [data, err] = await this.$awaitWrap(this.$post('teacher/status', params));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      // 刷新
      this.refersh(this.currentPage, this.sizePerPage);
    },

    // 删除所选
    deleteSelection() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选中！');
        return;
      }
      this.multipleSelection.forEach(item => {
        console.log(item['teacher_id']);
      });
    },

    // 处理多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 点击分页
    pageChange(page) {
      this.currentPage = page - 1;
      this.refersh(this.currentPage, this.sizePerPage);
    }
  },
}
</script>

<style lang="less" scoped>
#teacher-div {
  width: 100%;
  height: 877px;
  overflow: auto;

  #teacher-table {
    width: 100%;
  }

  // 分页控件
  .pagination {
    margin-top: 10px;
    margin-bottom: 0;
  }

  // 顶部工具按钮
  .tools-top {
    margin-bottom: 10px;
    #btn-search {
      margin-left: 10px;
    }
  }

  // 底部工具按钮
  .tools-bottom {
    margin-top: 7px;
  }
}
</style>