<!--
 * @Author: benjie
 * @Date: 2023-06-11 13:02:17
 * @LastEditTime: 2023-06-11 16:11:38
 * @LastEditors: benjie
 * @Description: 
-->
<template lang="">
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
</template>
<script>
export default {
  data() {
    return {
      menus: [],
      expandedKey: [],
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
    append(data) {
      console.log("append", data);
    },
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
        .catch(() => {});
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
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="">
</style>