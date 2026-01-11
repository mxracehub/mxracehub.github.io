
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export default function SettingsPage() {
  const settingsBanner = PlaceHolderImages.find((p) => p.id === 'settings-banner');

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Settings" />
        
        {settingsBanner && (
            <div className="mb-8 overflow-hidden rounded-lg">
                <Image
                    src={settingsBanner.imageUrl}
                    alt={settingsBanner.description}
                    width={800}
                    height={300}
                    className="w-full object-cover"
                    data-ai-hint={settingsBanner.imageHint}
                />
            </div>
        )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <Link href="/account/settings/name" className="block text-lg font-medium text-primary hover:underline">
              Change Account Name
          </Link>
          <Link href="/account/settings/email" className="block text-lg font-medium text-primary hover:underline">
              Change Email
          </Link>
           <Link href="/account/settings/password" className="block text-lg font-medium text-primary hover:underline">
              Change Password
          </Link>
          <Link href="/account/settings/rider-number" className="block text-lg font-medium text-primary hover:underline">
              Change Rider Number
          </Link>
          <Link href="/account/settings/banking" className="block text-lg font-medium text-primary hover:underline">
              Banking Details
          </Link>
          <Link href="/account/transactions" className="block text-lg font-medium text-primary hover:underline">
              Transaction History
          </Link>
           <Link href="/account/settings/privacy" className="block text-lg font-medium text-primary hover:underline">
              Privacy
          </Link>
          <Link href="/how-it-works" className="block text-lg font-medium text-primary hover:underline">
              How It Works
          </Link>
          <Link href="/account/settings/rules" className="block text-lg font-medium text-primary hover:underline">
              Rules
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
