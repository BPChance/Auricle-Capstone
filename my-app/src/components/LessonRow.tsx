import LessonNode from "./LessonNode";

type Lesson = {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "completed";
};

type Props = {
  lessons: Lesson[];
};

export default function LessonRow({ lessons }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className={`flex w-full justify-center ${
            index % 2 === 0 ? "pl-32" : "pr-32"
          }`}
        >
          <LessonNode
            id={lesson.id}
            title={lesson.title}
            status={lesson.status}
          />
        </div>
      ))}
    </div>
  );
}
