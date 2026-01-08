
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Reach out with any questions or feedback."
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            For support, partnerships, or any other inquiries, please email us at:
          </p>
          <a
            href="mailto:mxracehub@proton.me"
            className="mt-2 inline-block text-lg font-semibold text-primary hover:underline"
          >
            mxracehub@proton.me
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
