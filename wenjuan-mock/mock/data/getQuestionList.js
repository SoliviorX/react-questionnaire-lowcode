/**
 * @description 生成问卷列表
 */
const Mock = require("mockjs");
const Random = Mock.Random;

function getQuestionList(opt) {
  const { pageSize, isDeleted = false, isStar = false } = opt;
  const list = [];
  for (let i = 0; i < pageSize; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted, // 假删除：改变isDeleted属性；（真删除：从数据库中移除）
    });
    1;
  }
  return list;
}

module.exports = getQuestionList;
