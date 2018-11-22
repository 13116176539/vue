<template>
  <div id="tableView">
    <!--列表顶部搜索和工具条-->
    <el-row >
      <el-form :inline="true" :model="searchForm" >
        <el-form-item label="ID">
          <el-input v-model="searchForm.id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="searchForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="searchClick">查询</el-button>
          <el-button type="success" icon="plus" @click="addClick">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!--列表-->
    <el-row>
      <el-table
        :data.sync="currentTable"
        v-loading.body="loading"
        border
        @selection-change="selectionChange"

        >
        <el-table-column
          prop="id"
          type="selection"
          header-align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          header-align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          header-align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          header-align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期"
          header-align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          header-align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          header-align="center"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center">
          <template slot-scope="scope">
            <el-button :plain="true" type="success" size="small" icon="edit" @click="editClick(scope.row)">编辑
            </el-button>
            <el-button :plain="true" type="danger" size="small" icon="delete" @click="deleteClick(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--列表底部工具条和分页符-->
    <el-row style="margin-top: 20px" type="flex" justify="end">
      <el-col :span="6">
        <el-button style="float:left" :plain="true" type="danger" size="small" icon="delete" @click="removeSelection">
          删除所选
        </el-button>
      </el-col>
      <el-col :span="18">
        <el-pagination
          style="float: right"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </el-col>
    </el-row>

    <!--新增界面-->
    <el-dialog
      title="新 增"
      :visible.sync="addFormVisible"
      width="30%"
      center>
      <span>
        <el-form :model="editForm" label-width="50px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1" :checked="editForm.sex=='男'">男</el-radio>
              <el-radio class="radio" :label="0" :checked="editForm.sex=='女'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" @change="selectTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="editForm.zip"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
       <el-button @click="addFormVisible = false">取 消</el-button><el-button type="primary"
                                                                            @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog
      title="编 辑"
      :visible.sync="editFormVisible"
      width="30%"
      center>
      <span>
        <el-form :model="editForm" label-width="50px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" @change="selectTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="editForm.zip"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
       <el-button @click="editFormVisible = false">取 消</el-button><el-button type="primary"
                                                                             @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

  import Vue from 'vue'
  import crud from "../assets/crud"

  export default {
    name: 'demo2',
    data() {
      return {
        //列表数据
        tableData: [],


        //tableData备份
        tableData_bak: [],
        //用于显示当前页的数据（分页）
        currentTable: [],
        //显示加载中样式
        loading: false,
        //搜索表单
        searchForm: {
          id: '',
          name: '',
          address: ''
        },
        //多选值
        multipleSelection: [],
        //当前页
        currentPage: 1,
        //分页大小
        pageSize: 5,
        //总记录数
        //total:800,
        //删除的弹出框
        deleteVisible: false,
        //编辑界面是否显示
        editFormVisible: false,
        addFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          birth: '',
          address: '',
          zip: ''
        },

      }
    },

    created() {
      //查方法
      crud.retrieve().then(list => {
        this.tableData = list;
        this.tableData_bak = list;

        //如果页面条数小于列表中数据，把列表当前页的数据从tableData中赋值给当前页数组，并进行加载，此时当前页数组长度为页面尺寸。
        if (this.pageSize < this.tableData.length) {

          for (var i = 0; i < this.pageSize; i++) {

            Vue.set(this.currentTable, i, this.tableData[i + (this.currentPage - 1) * this.pageSize]);
          }
          this.currentTable.length = this.pageSize;

        }
        //如果页面条数大于列表中数据，直接把列表的数据从tableData中赋值给当前页数组，并进行加载，此时当前页数组长度为列表长度。
        else {

          for (var i = 0; i < this.tableData.length; i++) {

            Vue.set(this.currentTable, i, this.tableData[i]);
          }
          this.currentTable.length = this.tableData.length;
        }

      }).catch(error => {
        console.log(error)
      });


    },

    methods: {

      selectTime: function (val) {
        console.log(val);
        this.editForm.birth = val;
      },

      //表格重新加载数据
      loadingData: function () {
        var _self = this;
        _self.loading = true;
        setTimeout(function () {
          console.info("加载数据成功");
          _self.loading = false;
        }, 300);
      },
      //新建事件
      addClick: function () {

        this.editForm = {
          id: 0,
          name: '',
          sex: -1,
          birth: '',
          address: '',
          zip: ''
        };
        this.addFormVisible = true;
      },

      addSubmit: function () {

        this.editForm.id = this.tableData.length + 1;
        if (this.editForm.sex == '1') {
          this.editForm.sex = '男';
        } else {
          this.editForm.sex = '女';
        }

        //以下代码放入了增方法里面

        // this.tableData.push(this.editForm);
        // this.addFormVisible = false;
        // this.currentPageChange(this.currentPage);

        //增方法
        //this.editForm.sex=='1'，为男
        crud.create(this.editForm).then(() => {
          this.addFormVisible = false;

          return crud.retrieve();
        }).then((list) => {
          this.tableData = list;
          this.tableData_bak = list;
          this.currentPageChange(this.currentPage);


        }).catch(error => {
          if (error == "增方法失败") {
            this.addFormVisible = false;

          }
          else if (error == "查方法失败") {

          }
        })


      },

      //表格编辑事件
      editClick: function (row) {
        console.log(`打印row:${row}`);
        this.editForm = Object.assign({}, row);
        //console.info(this.editForm.id);

        if (this.editForm.sex == '男') {
          this.editForm.sex = 1;
        } else {
          this.editForm.sex = 0;
        }
        this.editFormVisible = true;
      },
      //保存点击事件
      editSubmit: function () {
        //console.info(this.editForm.id);
        //console.info(this.editForm.id-1);
        if (this.editForm.sex == '1') {
          this.editForm.sex = '男';
        } else {
          this.editForm.sex = '女';
        }


        //改方法
        crud.update(this.editForm).then(() => {
          // Vue.set(this.tableData, this.editForm.id - 1, this.editForm);
          this.editFormVisible = false;
          return crud.retrieve();
        }).then((list) => {
          this.tableData = list;
          this.tableData_bak = list;
          this.currentPageChange(this.currentPage);
        }).catch(error => {
          if (error == "改方法失败") {
            this.editFormVisible = false;
            console.log(error);

          }
          else if (error == "查方法失败") {
            console.log(error);
          }
        })

      },
      //表格删除事件
      deleteClick: function (row) {
        //console.log(this.tableData.length);
        //console.log(this.tableData[this.tableData.length-1]);
        var _self = this;
        this.$confirm('确认删除' + row.name + '吗?', '提示', {
          type: 'warning'
        }).then(function () {



          // for (var i = row.id - 1; i < _self.tableData.length - 1; i++) {
          //   Vue.set(_self.tableData, i, _self.tableData[i + 1]);
          //   _self.tableData[i].id--;
          // }
          // Vue.set(_self.tableData, _self.tableData.length - 1, null);
          // _self.tableData.length--;
          //删方法，删除该行
          crud.delete(row).then((list)=>{
            _self.tableData=list;
            _self.tableData_bak=list;

            _self.$message({
              message: row.name + '删除成功',
              type: 'success'
            });

            if (_self.currentTable.length == 1) {
              _self.currentPageChange(_self.currentPage - 1);
            } else {
              _self.currentPageChange(_self.currentPage);
            }

          }).catch((error)=>{
            if(error=="删方法失败"){
              console.log(error);
            }
            else if(error=="查方法失败")
              console.log(error);
          });





          // _self.loadingData();//重新加载数据

        }).catch(function (e) {
          if (e != "cancel")
            console.log("出现错误：" + e);
        });
      },

      //表格查询事件
      searchClick: function () {
        //alert("搜索");
        var _self = this;
        var table = [];
        this.tableData = this.tableData_bak;
        var len = 0;
        if (this.searchForm.id.trim() == '' && this.searchForm.name.trim() != '' && this.searchForm.address.trim() != '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].name == this.searchForm.name && this.tableData[i].address == this.searchForm.address) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        } else if (this.searchForm.id.trim() != '' && this.searchForm.name.trim() == '' && this.searchForm.address.trim() != '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == this.searchForm.id && this.tableData[i].address == this.searchForm.address) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        } else if (this.searchForm.id.trim() != '' && this.searchForm.name.trim() != '' && this.searchForm.address.trim() == '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == this.searchForm.id && this.tableData[i].name == this.searchForm.name) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        }
        else if (this.searchForm.id.trim() != '' && this.searchForm.name.trim() != '' && this.searchForm.address.trim() != '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == this.searchForm.id && this.tableData[i].name == this.searchForm.name && this.tableData[i].address == this.searchForm.address) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        }
        else if (this.searchForm.id.trim() != '' && this.searchForm.name.trim() == '' && this.searchForm.address.trim() == '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == this.searchForm.id) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        } else if (this.searchForm.id.trim() == '' && this.searchForm.name.trim() != '' && this.searchForm.address.trim() == '') {
          // for (var i = 0; i < this.tableData.length; i++) {
          //   if (this.tableData[i].name == this.searchForm.name) {
          //     table[len] = this.tableData[i];
          //     len++;
          //   }
          // }
          // this.tableData = table;
          crud.retrieveLike(this.searchForm.name).then((list)=>{
            this.tableData=list;
            this.currentPageChange(1);
          }).catch(error=>{
            console.log(error)
          })

        } else if (this.searchForm.id.trim() == '' && this.searchForm.name.trim() == '' && this.searchForm.address.trim() != '') {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].address == this.searchForm.address) {
              table[len] = this.tableData[i];
              len++;
            }
          }
          this.tableData = table;
        } else {

        }
        this.currentPageChange(1);

        _self.loadingData();//重新加载数据
      },

      //表格勾选事件
      selectionChange: function (val) {
        for (var i = 0; i < val.length; i++) {
          var row = val[i];
        }
        this.multipleSelection = val;
        console.info(val);
      },

      //删除一行
      deleteOne: function (row) {

        for (var i = row.id - 1; i < this.tableData.length - 1; i++) {
          Vue.set(this.tableData, i, this.tableData[i + 1]);
          this.tableData[i].id--;


        }
        Vue.set(this.tableData, this.tableData.length - 1, null);
        this.tableData.length--;

      },
      //删除所选，批量删除
      removeSelection: function () {
        var _self = this;
        var multipleSelection = this.multipleSelection;
        if (multipleSelection.length < 1) {
          _self.$message({
            message: '请至少选中一条记录',
            type: 'error'
          });
          return;
        }
        var ids = "";
        for (var i = 0; i < multipleSelection.length; i++) {
          var row = multipleSelection[i];

          ids += row.name + ","
        }

        this.$confirm('确认删除' + ids + '吗?', '提示', {
          type: 'warning'
        }).then(function () {
          var id_array = [];



          for (var i = 0; i < multipleSelection.length; i++) {
            id_array.push(multipleSelection[i].id);
            // var row = multipleSelection[i];
            _self.deleteOne(row);

          }

          crud.deleteMultiple(id_array).then((list)=>{
            console.log("执行了本次方法");
            _self.tableData=list;
            _self.tableData_bak=list;
            console.log( _self.tableData);
            // console.log(`回调函数打印:${multipleSelection}`);
            console.log(`当前页:${_self.currentPage}`);



            if (_self.currentTable.length == multipleSelection.length) {
              _self.currentPageChange(_self.currentPage - 1);
            } else {
              _self.currentPageChange(_self.currentPage);
            }
            _self.$message({
              message: ids + '删除成功',
              type: 'success'
            });
          }).catch(error=>{
            if(error=="批量删方法失败"){
              console.log("批量删方法失败")
            }
            else if(error=="查方法失败"){
              console.log("查方法失败")
            }
          })




        }).catch(function (e) {
          if (e != "cancel")
            console.log("出现错误：" + e);
        });
      },
      //分页大小修改事件
      pageSizeChange: function (val) {
        console.log('每页 ' + val + ' 条');
        this.pageSize = val;
        this.currentPageChange(1);
        var _self = this;
        _self.loadingData();//重新加载数据
      },
      //当前页修改事件
      currentPageChange: function (val) {
        this.currentPage = val;
        console.log('当前页: ' + val);
        this.currentTable = [];
        if (this.pageSize >= this.tableData.length) {

          for (var i = 0; i < this.tableData.length; i++) {
            Vue.set(this.currentTable, i, this.tableData[i]);
          }
          this.currentTable.length = this.tableData.length;

        } else {

          //当前页小于总条目处于
          if (this.currentPage < (this.tableData.length / this.pageSize)) {
            for (var i = 0; i < this.pageSize; i++) {
              Vue.set(this.currentTable, i, this.tableData[i + (this.currentPage - 1) * this.pageSize]);
            }
            this.currentTable.length = this.pageSize;

          } else {

            for (var i = 0; i < this.tableData.length - this.pageSize * (this.currentPage - 1); i++) {
              Vue.set(this.currentTable, i, this.tableData[i + (this.currentPage - 1) * this.pageSize]);
            }
            this.currentTable.length = this.tableData.length - this.pageSize * (this.currentPage - 1);

          }
        }

        var _self = this;
        _self.loadingData();//重新加载数据
      },

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #tableView{
    width:100%;

  }

</style>
