import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = ({ assistant = false, lines = 3 }) => {
  return (
    <div
      className={`flex w-full ${assistant ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`relative w-full overflow-hidden max-w-[78%] rounded-2xl border border-zinc-800/80 bg-zinc-900/90 px-4 py-3 shadow-sm backdrop-blur-sm ${assistant ? "rounded-bl-md" : "rounded-br-md"}`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 rounded-md bg-zinc-800 ${i === lines - 1 ? "w-2/3" : i % 2 === 0 ? "w-full" : "w-11/12"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
