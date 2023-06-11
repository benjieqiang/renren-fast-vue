<!--
 * @Author: benjie
 * @Date: 2023-06-11 13:02:17
 * @LastEditTime: 2023-06-11 16:55:04
 * @LastEditors: benjie
 * @Description: 
-->
<template lang="">
  <div>
    <el-tree    
      :data="menus"
      show-checkbox
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      node-key="catId"
      :default-expanded-keys="expandedKey"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button
          type="text"
          v-if="node.level <= 2"
          size="mini"
          @click="() => append(data)"
        >
          Append
        </el-button>
        <el-button
          type="text"
          v-if="node.childNodes.length == 0"
          size="mini"
          @click="() => remove(node, data)"
        >
          Delete
        </el-button>
      </span>
    </span>
    </el-tree>

   <!--对话框组件-->
	<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="categroy">
        <el-form-item label="分类名称">
          <el-input v-model="categroy.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      expandedKey: [],
      dialogVisible: false, //对话框
      categroy: { name: "", parentCid: 0, catLevel: 0, showStatus: 1, sort: 0 },
      defaultProps: {
        children: "children", //子节点
        label: "name", //name属性作为标签的值，展示出来
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    //获取后台数据 {data}是把参数结构出来；
    getMenus() {
      this.$http({
        url: this.$http.adornUrl("/product/category/list/tree"),
        method: "get",
      }).then(({ data }) => {
        console.log("成功了获取到菜单数据....", data.data);
        this.menus = data.data;
      });
    },
    // 添加节点
    append(data) {
      console.log("append", data);
      this.dialogVisible = true;
      this.categroy.parentCid = data.catId;
      this.categroy.catLevel = data.catLevel * 1 + 1;
    },
    // 删除子节点
    remove(node, data) {
      var ids = [data.catId];
      this.$confirm(`是否删除【${data.name}】菜单？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/product/category/delete"),
            method: "post",
            data: this.$http.adornData(ids, false),
          }).then(({ data }) => {
            this.$message({
              message: "菜单删除成功",
              type: "success",
            });
            //刷新出新的菜单
            this.getMenus();
            //设置需要默认展开的菜单
            this.expandedKey = [node.parent.data.catId]
          });
        })
        .catch(() => { });
    },
    //点击确定后，发送post请求
    //成功后显示添加成功，展开刚才的菜单
    addCategory() {
      console.log("提交的数据", this.categroy);
      this.$http({
        url: this.$http.adornUrl("/product/category/save"),
        method: "post",
        data: this.$http.adornData(this.categroy, false),
      }).then(({ data }) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        //刷新出新的菜单
        this.getMenus();
        //设置需要默认展开的菜单
        this.expandedKey = [this.categroy.parentCid];
        this.dialogVisible = false;
      });
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //创建完成时，就调用getMenus函数
    this.getMenus();
  }
}
</script>
<style lang="">
</style>