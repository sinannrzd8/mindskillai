import { useState, useEffect } from 'react';
import { Calendar, Clock, UserIcon, Plus, Video, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockDatabase, Session, User } from '@/lib/database';

export default function StudentMeetingsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [notes, setNotes] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [completedReviews, setCompletedReviews] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      const [teacherList, studentSessions] = await Promise.all([
        mockDatabase.getUsersByRole('teacher'),
        mockDatabase.getSessionsByUser(user.id, 'student')
      ]);

      setTeachers(teacherList);
      setSessions(studentSessions.sort((a, b) => b.scheduledDate.getTime() - a.scheduledDate.getTime()));

      const reviewMap: Record<string, boolean> = {};
      await Promise.all(
        studentSessions.map(async (session) => {
          if (session.status === 'completed') {
            reviewMap[session.id] = await mockDatabase.hasReviewForSession(session.id, user.id);
          }
        })
      );
      setCompletedReviews(reviewMap);
    }

    loadData();
  }, [user]);

  const handleRequestMeeting = async () => {
    if (!selectedTeacher || !meetingTopic || !meetingDate || !meetingTime || !user) return;

    const scheduledDateTime = new Date(`${meetingDate}T${meetingTime}`);
    const session = await mockDatabase.createSession({
      studentId: user.id,
      teacherId: selectedTeacher,
      topic: meetingTopic,
      scheduledDate: scheduledDateTime,
      duration: parseInt(duration, 10),
      status: 'pending',
      notes
    });

    setSessions((prev) => [session, ...prev]);
    setSelectedTeacher('');
    setMeetingTopic('');
    setMeetingDate('');
    setMeetingTime('');
    setDuration('30');
    setNotes('');
    setIsRequestDialogOpen(false);
  };

  const handleReviewSubmit = async () => {
    if (!activeSession || !user) return;

    await mockDatabase.createReview({
      sessionId: activeSession.id,
      reviewerId: user.id,
      reviewerRole: 'student',
      targetId: activeSession.teacherId,
      targetRole: 'teacher',
      rating: reviewRating,
      comment: reviewComment
    });

    setCompletedReviews((prev) => ({ ...prev, [activeSession.id]: true }));
    setReviewDialogOpen(false);
    setReviewComment('');
    setReviewRating(5);
    setActiveSession(null);
  };

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const pendingMeetings = sessions.filter((session) => session.status === 'pending');
  const upcomingMeetings = sessions.filter((session) => session.status === 'approved' && session.scheduledDate > new Date());
  const pastMeetings = sessions.filter((session) => session.status === 'completed');

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Meetings</h1>
            <p className="text-muted-foreground">Schedule, review, and manage your learning sessions</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Meeting</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Teacher</label>
                    <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Topic</label>
                    <Textarea
                      value={meetingTopic}
                      onChange={(e) => setMeetingTopic(e.target.value)}
                      placeholder="What would you like to discuss?"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Preferred Date</label>
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preferred Time</label>
                      <input
                        type="time"
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Additional Notes (Optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific questions or topics you'd like to cover..."
                    />
                  </div>
                  <Button onClick={handleRequestMeeting} className="w-full">
                    Send Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              <DialogTrigger asChild>
                <div />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review Teacher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <div className="mt-2 flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setReviewRating(value)}
                            className={`rounded-full px-3 py-2 text-sm ${reviewRating === value ? 'bg-primary text-primary-foreground' : 'bg-muted/70 text-muted-foreground'}`}>
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Feedback</label>
                    <Textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share what worked well and what could improve."
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleReviewSubmit} className="w-full">
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Requests ({pendingMeetings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingMeetings.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No pending requests</p>
              ) : (
                pendingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{teachers.find((teacher) => teacher.id === meeting.teacherId)?.fullName ?? 'Teacher'}</p>
                        <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateTime(meeting.scheduledDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.duration} min
                      </div>
                    </div>
                    {meeting.notes && (
                      <p className="text-sm text-muted-foreground mb-3"><strong>Notes:</strong> {meeting.notes}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserIcon className="h-4 w-4" />
                      Awaiting teacher approval
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Meetings ({upcomingMeetings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No upcoming meetings</p>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{teachers.find((teacher) => teacher.id === meeting.teacherId)?.fullName ?? 'Teacher'}</p>
                        <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateTime(meeting.scheduledDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.duration} min
                      </div>
                    </div>
                    {meeting.meetingLink && (
                      <Button size="sm" className="w-full" asChild>
                        <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                          <Video className="h-4 w-4 mr-2" />
                          Join Meeting
                        </a>
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Sessions ({pastMeetings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastMeetings.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No completed sessions</p>
              ) : (
                pastMeetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{teachers.find((teacher) => teacher.id === meeting.teacherId)?.fullName ?? 'Teacher'}</p>
                        <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateTime(meeting.scheduledDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.duration} min
                      </div>
                    </div>
                    <div className="mt-4">
                      {completedReviews[meeting.id] ? (
                        <p className="text-sm text-muted-foreground">Review submitted</p>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setActiveSession(meeting);
                            setReviewDialogOpen(true);
                          }}
                        >
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
