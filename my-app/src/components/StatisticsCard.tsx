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
    <div className="w-full space-y-4">
      <h2 className="text-sm text-gray-400">Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#4848A1] rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white">{accuracy}%</div>
          <div className="text-xs text-gray-300 mt-1">Accuracy</div>
        </div>
        <div className="bg-[#4848A1] rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white">{streak}</div>
          <div className="text-xs text-gray-300 mt-1">Daily Streak</div>
        </div>
        <div className="bg-[#4848A1] rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white">{levelsCompleted}</div>
          <div className="text-xs text-gray-300 mt-1">Current Level</div>
        </div>
      </div>
    </div>
  );
}