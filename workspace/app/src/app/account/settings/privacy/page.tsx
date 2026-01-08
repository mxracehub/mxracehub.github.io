
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPage() {
  const [profileVisibility, setProfileVisibility] = useState('friends');
  const [bettingVisibility, setBettingVisibility] = useState('friends');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Privacy"
        description="Control your account privacy settings."
      />
      <Card>
        <CardHeader>
          <CardTitle>Privacy Controls</CardTitle>
          <CardDescription>
            Manage who can see your information and activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Profile visibility</h4>
              <p className="text-sm text-muted-foreground">
                Control who can see your profile information.
              </p>
            </div>
            <Select
              value={profileVisibility}
              onValueChange={setProfileVisibility}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Betting activity visibility</h4>
              <p className="text-sm text-muted-foreground">
                Control who can see your betting activity.
              </p>
            </div>
            <Select
              value={bettingVisibility}
              onValueChange={setBettingVisibility}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show online status</h4>
              <p className="text-sm text-muted-foreground">
                Allow others to see when you're online.
              </p>
            </div>
            <Switch
              checked={showOnlineStatus}
              onCheckedChange={setShowOnlineStatus}
              aria-label="Toggle online status"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
