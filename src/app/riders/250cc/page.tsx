import { PageHeader } from '@/components/page-header';

export default function Riders250Page() {
  return (
    <div>
      <PageHeader title="250cc Riders" description="Coming soon." />
      <div className="flex items-center justify-center h-64 border rounded-lg bg-card">
          <p className="text-muted-foreground">The 250cc rider roster will be available shortly.</p>
      </div>
    </div>
  );
}
