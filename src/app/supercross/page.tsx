import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SupercrossPage() {
  return (
    <div>
      <PageHeader
        title="Supercross"
        description="The schedule for the Supercross series."
      />
      <Card>
        <CardHeader>
          <CardTitle>Schedule Coming Soon</CardTitle>
          <CardDescription>
            The 2026 Supercross schedule has not been released yet. Please check back later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Supercross races are held in stadiums across the country. Stay tuned for more information!</p>
        </CardContent>
      </Card>
    </div>
  );
}
