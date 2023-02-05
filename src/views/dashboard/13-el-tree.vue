<template>
  <div>
    <!-- el-tree
           data:树形数据
           props:{
              label:'需要展示文本内容字段名，默认是label',
              children:'展示子集默认是children'
           }
           作用域插槽:替换label展示 的内容
              v-slot="{node,data}"
              node:el-tree组件内提供的一些组件内数据
              data：当前行数据(当前节点展示所有数据)

   -->

    <!-- 需求：
      省份展示
         广东省                无
            广州市             阴
            深圳市             晴
               宝安区          雨

    -->

    <el-tree
      default-expand-all
      :data="list"
      :props="{ label: 'name', children: 'child' }"
    >
      <template v-slot="{ data }">
        <div class="item">
          <div class="name">{{ data.name }}</div>
          <div>管理员</div>
          <div>操作</div>
        </div>
      </template>
    </el-tree>

    <hr>
    <el-tree :data="cityArr">
      <template v-slot="{ data }">
        <div>{{ data.label }}------------{{ data.other }}</div>
      </template>
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: '一级 1',
          child: [
            {
              name: '二级 1-1',
              child: [
                {
                  name: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          name: '一级 2',
          child: [
            {
              name: '二级 2-1',
              child: [
                {
                  name: '三级 2-1-1'
                }
              ]
            },
            {
              name: '二级 2-2',
              child: [
                {
                  name: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          name: '一级 3',
          child: [
            {
              name: '二级 3-1',
              child: [
                {
                  name: '三级 3-1-1'
                }
              ]
            },
            {
              name: '二级 3-2',
              child: [
                {
                  name: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      cityArr: [
        {
          label: '广东省',
          other: '无',
          children: [
            {
              label: '广州市',
              other: '阴'
            },
            {
              label: '深圳市',
              other: '晴',
              children: [
                {
                  label: '宝安区',
                  other: '雨'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  width: 100%;
  .name {
    flex: 1;
  }
}
</style>
