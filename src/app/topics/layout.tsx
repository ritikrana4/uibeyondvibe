import { TopicSidebar } from "@/components/topic-sidebar";

export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-start gap-10 px-4 py-10 sm:px-6">
      <aside className="sticky top-20 hidden w-56 shrink-0 lg:block">
        <TopicSidebar />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
