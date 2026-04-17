import { useEffect, useState } from 'react';
import { Award, CheckCircle2, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import RatingStars from '@/components/RatingStars';
import { mockDatabase, Session, User } from '@/lib/database';
import { useAuth } from '@/contexts/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [summary, setSummary] = useState({ averageRating: 0, reviewCount: 0 });

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const sessionList = await mockDatabase.getSessionsByUser(user.id, 'teacher');
      setSessions(sessionList);
      const rating = await mockDatabase.getRatingSummary(user.id, 'teacher');
      setSummary({ averageRating: rating.averageRating, reviewCount: rating.reviewCount });
    }

    loadData();
  }, [user]);

  const completedCount = sessions.filter(session => session.status === 'completed').length;
  const pendingCount = sessions.filter(session => session.status === 'pending').length;
  const approvedCount = sessions.filter(session => session.status === 'approved').length;

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Teacher Workspace</p>
            <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">Track upcoming sessions, manage completed lessons, and review student feedback.</p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">Add Session</Button>
            <Button>View Reviews</Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Current Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold font-display">{sessions.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Active session records assigned to you.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold">{summary.averageRating.toFixed(1)}</span>
                <RatingStars rating={summary.averageRating} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">Based on {summary.reviewCount} reviews.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Session Status</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold">{pendingCount}</p>
              </div>
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold">{approvedCount}</p>
              </div>
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">{completedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions.length === 0 ? (
              <p className="text-muted-foreground">No sessions assigned yet.</p>
            ) : (
              sessions.slice(0, 4).map(session => (
                <div key={session.id} className="grid gap-4 rounded-lg border border-border p-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-semibold">{session.topic}</p>
                    <p className="text-xs text-muted-foreground">{new Date(session.scheduledDate).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">{session.status}</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
