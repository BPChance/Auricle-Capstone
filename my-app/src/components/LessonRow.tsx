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
    <div className="flex justify-center flex-wrap gap-6">
      {lessons.map((lesson) => (
        <LessonNode
          key={lesson.id}
          id={lesson.id}
          title={lesson.title}
          status={lesson.status}
        />
      ))}
    </div>
  );
}
