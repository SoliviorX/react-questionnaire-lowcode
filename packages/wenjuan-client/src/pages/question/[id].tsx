import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput";
// import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import styles from "@/styles/Question.module.scss";

type PropsType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

// 路徑：pages/question/[id]
export default function Question(props: PropsType) {
  const { errno, data, msg = "" } = props;
  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }
  const {
    id,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {};

  // 问卷已经被删除，错误提示
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }
  // 问卷未发布，错误提示
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  // 遍历组件，获取组件列表
  const ComponentListElem = (
    <>
      {componentList.map((c) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        {/* 通过隐藏输入框的方式提交问卷id */}
        <input type="hidden" name="questionId" value={id} />
        {ComponentListElem}
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  // 通过 id 动态获取问卷信息
  const data = getQuestionById(id);
  return {
    props: data,
  };
}
