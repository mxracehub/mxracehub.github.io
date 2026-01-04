import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const raceBanner = PlaceHolderImages.find(
    (img) => img.id === 'race-banner-1'
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to MXHUB</h1>
        <p className="text-muted-foreground">The premier platform for everything motocross.</p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="relative aspect-video p-0">
                    {raceBanner && (
                      <Image
                        src={raceBanner.imageUrl}
                        alt={raceBanner.description}
                        fill
                        className="object-cover"
                        data-ai-hint={raceBanner.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white">
                        Race Event {index + 1}
                      </h3>
                      <p className="text-sm text-gray-300">Track Name</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Races</CardTitle>
            <CardDescription>View upcoming and past races.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View Races</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shop</CardTitle>
            <CardDescription>Buy gear and merchandise.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Go to Shop</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Check your stats and settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
