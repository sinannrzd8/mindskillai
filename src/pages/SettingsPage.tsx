import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import RatingStars from '@/components/RatingStars';
import { Bell, Shield, Palette, Globe, Moon, Sun, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockDatabase } from '@/lib/database';

const sections = [
  { icon: User, title: 'Profile', desc: 'Update your name, bio, and career goals.' },
  { icon: Bell, title: 'Notifications', desc: 'Manage email and push notification preferences.' },
  { icon: Shield, title: 'Privacy & Security', desc: 'Two-factor authentication and data controls.' },
  { icon: Palette, title: 'Appearance', desc: 'Theme, font size, and accessibility options.' },
  { icon: Globe, title: 'Language & Region', desc: 'Set your preferred language and timezone.' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    async function loadRating() {
      if (!user) return;
      const summary = await mockDatabase.getRatingSummary(user.id, user.role === 'teacher' ? 'teacher' : 'student');
      setRating(summary.averageRating);
      setReviews(summary.reviewCount);
    }

    loadRating();
  }, [user]);

  const skillTags = user?.skills?.slice(0, 4) || [];
  const profileSubtitle = user?.role === 'student'
    ? `${user.courseId ?? 'No course assigned'} · Student` 
    : user?.role === 'teacher' 
      ? 'Mentor & Course Guide' 
      : 'Platform Administrator';

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, rating profile, and platform preferences.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-3xl font-semibold text-primary">
                  {user?.fullName.split(' ').map((token) => token[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{user?.role}</p>
                  <h2 className="font-display text-2xl font-bold">{user?.fullName}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{profileSubtitle}</p>
                </div>
              </div>
              <Button variant="hero-outline" size="sm">Edit Profile</Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="mt-2 text-2xl font-semibold">{rating.toFixed(1)}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="mt-2 text-2xl font-semibold">{reviews}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Profile</p>
                <p className="mt-2 text-2xl font-semibold">{user?.role === 'teacher' ? 'Mentor' : 'Learner'}</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-border bg-card/50 p-5">
              <h3 className="font-semibold">About</h3>
              <p className="mt-2 text-sm text-muted-foreground">{user?.bio || 'A dedicated member of the MindSkill AI community.'}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {skillTags.map(tag => (
                  <span key={tag} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <RatingStars rating={rating} size={20} />
                <span className="text-sm text-muted-foreground">{rating.toFixed(1)} / 5 from {reviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <button key={section.title} className="glass-card hover-lift flex w-full items-center gap-4 rounded-3xl p-5 text-left transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
