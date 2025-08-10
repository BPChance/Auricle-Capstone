type StatisticsCardProps = {
  accuracy: number;
  levelsCompleted: number;
  streak: number;
};

export default function StatisticsCard({
  accuracy,
  levelsCompleted,
  streak,
}: StatisticsCardProps) {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-[#1C1C3A] text-[#FFC0CB] p-4 shadow-md space-y-4">
      <h2 className="text-center text-lg font-bold">Your Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center bg-[#2C2C71] rounded-xl p-4">
          <span className="text-2xl font-bold">{accuracy}%</span>
          <span className="text-sm">Accuracy</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#2C2C71] rounded-xl p-4">
          <span className="text-2xl font-bold">{levelsCompleted}</span>
          <span className="text-sm">Levels</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#2C2C71] rounded-xl p-4">
          <span className="text-2xl font-bold">{streak}</span>
          <span className="text-sm">Streak</span>
        </div>
      </div>
    </div>
  );
}
