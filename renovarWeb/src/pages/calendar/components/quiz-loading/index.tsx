import type { QuizLoadingProps } from './types'

export function QuizLoading({
  questionsCount = 1,
  optionsPerQuestion = 5,
}: QuizLoadingProps) {
  return (
    <div className="w-full ">
      <div className="w-full flex flex-col gap-6 mb-8 border border-gray-300 p-6 rounded-2xl animate-pulse">
        {Array.from({ length: questionsCount }).map((_, questionIndex) => (
          <div
            key={`quiz-loading-${questionIndex + 1}`}
            className="flex flex-col gap-6"
          >
            <div className="h-6 bg-gray-200 rounded w-2/3" />

            <div className="flex flex-col gap-4">
              {Array.from({ length: optionsPerQuestion }).map(
                (_, optionIndex) => (
                  <div
                    key={`option-loading-${optionIndex + 1}`}
                    className="flex items-center gap-4 border border-gray-200 rounded-xl px-6 py-4"
                  >
                    <div className="size-7 bg-gray-200 rounded" />

                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="h-5 bg-gray-200 rounded w-12" />
          <div className="h-2 bg-gray-200 rounded flex-1" />
        </div>

        <div className="h-9 bg-gray-300 rounded-sm w-22" />
      </div>
    </div>
  )
}
