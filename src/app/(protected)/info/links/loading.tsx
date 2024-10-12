export default function Loading() {
  return (
    <div className="p-0 animate-pulse">
      <div className="text-start flex flex-col gap-2 animate-pulse mb-15">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-5"></div>
        <div className="mt-5 h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5  overflow-y-auto border p-4 rounded-lg">
        <div className="bg-gray-200 h-12 w-full rounded"></div>
        <div className="bg-gray-200 h-12 w-full rounded"></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5  overflow-y-auto border p-4 rounded-lg">
        <div className="bg-gray-200 h-12 w-full rounded"></div>
        <div className="bg-gray-200 h-12 w-full rounded"></div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5  overflow-y-auto border p-4 rounded-lg">
        <div className="bg-gray-200 h-12 w-full rounded"></div>
        <div className="bg-gray-200 h-12 w-full rounded"></div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5  overflow-y-auto border p-4 rounded-lg">
        <div className="bg-gray-200 h-12 w-full rounded"></div>
        <div className="bg-gray-200 h-12 w-full rounded"></div>
      </div>

      <div className="h-px w-full bg-gray-200 my-3 mt-12"></div>

      <div className="flex items-center justify-end">
        <div className="bg-gray-200 h-10 w-full md:w-20 rounded"></div>
      </div>

      <div className="h-20 w-full rounded"></div>
    </div>
  );
}
