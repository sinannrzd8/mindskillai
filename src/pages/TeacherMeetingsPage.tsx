import { useState, useEffect } from 'react';
import { Calendar, Clock, UserIcon, CheckCircle, XCircle, Plus, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockDatabase } from '@/lib/database';

interface Meeting {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  scheduledDate: Date;
  duration: number; // minutes
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
  meetingLink?: string;
}

export default function TeacherMeetingsPage() {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [teacherStudents, setTeacherStudents] = useState<any[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [duration, setDuration] = useState('30');

  // Mock meetings data - in production, fetch from API
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const mockMeetings: Meeting[] = [
          {
            id: '1',
            studentId: 'student1',
            studentName: 'Alice Johnson',
            teacherId: user.id,
            teacherName: user.fullName,
            scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
            duration: 30,
            status: 'pending',
            topic: 'Career Guidance Session'
          },
          {
            id: '2',
            studentId: 'student2',
            studentName: 'Bob Smith',
            teacherId: user.id,
            teacherName: user.fullName,
            scheduledDate: new Date(Date.now() + 172800000), // Day after tomorrow
            duration: 45,
            status: 'approved',
            topic: 'Project Review',
            meetingLink: 'https://meet.google.com/abc-defg-hij'
          }
        ];
        setMeetings(mockMeetings);

        // Get students for the teacher's courses
        const students = await mockDatabase.getUsersByRole('student');
        setTeacherStudents(students);
      }
    };
    loadData();
  }, [user]);

  const handleApproveMeeting = (meetingId: string) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === meetingId
          ? { ...meeting, status: 'approved' as const, meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 8)}` }
          : meeting
      )
    );
  };

  const handleRejectMeeting = (meetingId: string) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === meetingId
          ? { ...meeting, status: 'cancelled' as const }
          : meeting
      )
    );
  };

  const handleCreateMeeting = () => {
    if (!selectedStudent || !meetingTopic || !meetingDate || !meetingTime) return;

    const scheduledDateTime = new Date(`${meetingDate}T${meetingTime}`);

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      studentId: selectedStudent,
      studentName: teacherStudents.find(s => s.id === selectedStudent)?.fullName || 'Unknown',
      teacherId: user!.id,
      teacherName: user!.fullName,
      scheduledDate: scheduledDateTime,
      duration: parseInt(duration),
      status: 'approved',
      topic: meetingTopic,
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 8)}`
    };

    setMeetings(prev => [...prev, newMeeting]);

    // Reset form
    setSelectedStudent('');
    setMeetingTopic('');
    setMeetingDate('');
    setMeetingTime('');
    setDuration('30');
    setIsCreateDialogOpen(false);
  };

  const getStatusColor = (status: Meeting['status']) => {
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

  const pendingMeetings = meetings.filter(m => m.status === 'pending');
  const upcomingMeetings = meetings.filter(m => m.status === 'approved' && m.scheduledDate > new Date());

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Meeting Management</h1>
            <p className="text-muted-foreground">Schedule and manage student meetings</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.fullName}
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
                    placeholder="Meeting topic..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <input
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
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
                <Button onClick={handleCreateMeeting} className="w-full">
                  Schedule Meeting
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Requests */}
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
                pendingMeetings.map(meeting => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{meeting.studentName}</p>
                        <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
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
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveMeeting(meeting.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectMeeting(meeting.id)}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
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
                upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{meeting.studentName}</p>
                        <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
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
        </div>
      </div>
    </DashboardLayout>
  );
}