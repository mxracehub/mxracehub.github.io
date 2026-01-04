
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { accounts } from '@/lib/accounts-data';

export default function ChangeNamePage() {
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const account = accounts.find((a) => a.id === 'user-123'); // Example user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast({
        title: 'Error',
        description: 'New name cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    if (!account) {
        toast({
            title: 'Error',
            description: 'Could not find user account.',
            variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
        title: 'Success!',
        description: 'Your account name has been changed.',
    });

    setNewName('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Change Account Name" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Account Name</CardTitle>
            <CardDescription>
              This is the name that will be displayed on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-name">Old Account Name</Label>
              <Input
                id="old-name"
                type="text"
                value={account?.name}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-name">New Account Name</Label>
              <Input
                id="new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your new account name"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
