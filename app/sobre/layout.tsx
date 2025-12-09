import { Suspense } from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block max-w-9/10 text-center justify-center">
        {children}
      </div>
    </section>
  );
}
