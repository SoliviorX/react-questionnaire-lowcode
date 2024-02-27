import type { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from "@/services/answer";

function genAnswerInfo(reqBody: any) {
  const answerList: any = [];
  Object.keys(reqBody).forEach((key) => {
    if (key === "questionId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });
  return {
    questionId: reqBody.questionId || "",
    answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(200).json({ errno: -1, msg: "Method 错误" });
  }
  const answerInfo = genAnswerInfo(req.body);
  console.log("提交数据", answerInfo);
  try {
    // 提交数据到 Mock 服务器
    const resData = await postAnswer(answerInfo);
    if (resData.errno === 0) {
      // 提交成功跳转到成功页面
      res.redirect("/success");
    } else {
      // 提交失败跳转到失败页面
      res.redirect("/fail");
    }
  } catch (error) {
    res.redirect("/fail");
  }
}
