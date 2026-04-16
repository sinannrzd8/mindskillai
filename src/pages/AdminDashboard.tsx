import { useEffect, useMemo, useState } from 'react';
import { Search, Users, Award, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import RatingStars from '@/components/RatingStars';
import { User, RatingSummary, mockDatabase } from '@/lib/database';

interface UserRow extends User {
  ratingSummary: RatingSummary;
}

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState<UserRow[]>([]);
  const [students, setStudents] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadUsers() {
      const [teacherList, studentList] = await Promise.all([
        mockDatabase.getUsersByRole('teacher'),
        mockDatabase.getUsersByRole('student')
      ]);

      const teacherRows = await Promise.all(
        teacherList.map(async teacher => ({
          ...teacher,
          ratingSummary: await mockDatabase.getRatingSummary(teacher.id, 'teacher')
        }))
      );

      const studentRows = await Promise.all(
        studentList.map(async student => ({
          ...student,
          ratingSummary: await mockDatabase.getRatingSummary(student.id, 'student')
        }))
      );

      setTeachers(teacherRows);
      setStudents(studentRows);
    }

    loadUsers();
  }, []);

  const filteredTeachers = useMemo(
    () => teachers.filter(user =>
      [user.fullName, user.email, user.role].some(field => field.toLowerCase().includes(search.toLowerCase()))
    ),
    [teachers, search]
  );

  const filteredStudents = useMemo(
    () => students.filter(user =>
      [user.fullName, user.email, user.role, user.courseId || ''].some(field => field.toLowerCase().includes(search.toLowerCase()))
    ),
    [students, search]
  );

  const averageTeacherRating = useMemo(() => {
    if (teachers.length === 0) return 0;
    const total = teachers.reduce((sum, teacher) => sum + teacher.ratingSummary.averageRating, 0);
    return Math.round((total / teachers.length) * 10) / 10;
  }, [teachers]);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Administrator</p>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">Manage users, track teacher and student ratings, and review platform performance in one central workspace.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row items-stretch sm:items-center">
            <Input
              placeholder="Search teachers or students"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-[280px]"
            />
            <Button variant="secondary" className="whitespace-nowrap">Refresh</Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{teachers.length + students.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Count of all active teachers and students.</p>
            </CardContent>
          </Card>

          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Teacher Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold">{averageTeacherRating.toFixed(1)}</span>
                <div className="flex items-center gap-2">
                  <RatingStars rating={averageTeacherRating} />
                  <span className="text-sm text-muted-foreground">avg</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Average rating across all teachers.</p>
            </CardContent>
          </Card>

          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{teachers.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Profiles with full mentorship access.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Teacher Reputation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredTeachers.length === 0 ? (
                <p className="text-muted-foreground">No teachers match your search.</p>
              ) : (
                <div className="space-y-4">
                  {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="grid gap-4 rounded-3xl border border-border/50 p-4 md:grid-cols-[1fr_auto]">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold">{teacher.fullName.split(' ').map((segment) => segment[0]).join('')}</div>
                          <div>
                            <p className="font-semibold">{teacher.fullName}</p>
                            <p className="text-xs text-muted-foreground">{teacher.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full border border-border/70 px-2 py-1">{teacher.role}</span>
                          {teacher.skills?.map(skill => (
                            <span key={skill} className="rounded-full bg-muted/60 px-2 py-1">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-2 rounded-2xl bg-slate-950/5 p-4 text-right md:items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-semibold">{teacher.ratingSummary.averageRating.toFixed(1)}</span>
                          <RatingStars rating={teacher.ratingSummary.averageRating} />
                        </div>
                        <p className="text-sm text-muted-foreground">{teacher.ratingSummary.reviewCount} reviews</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Students Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredStudents.length === 0 ? (
                <p className="text-muted-foreground">No students match your search.</p>
              ) : (
                filteredStudents.map(student => (
                  <div key={student.id} className="rounded-3xl border border-border/50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold">{student.fullName.split(' ').map(segment => segment[0]).join('')}</div>
                        <div>
                          <p className="font-semibold">{student.fullName}</p>
                          <p className="text-xs text-muted-foreground">{student.courseId ?? 'N/A'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{student.ratingSummary.averageRating.toFixed(1)} / 5</p>
                        <p className="text-xs text-muted-foreground">{student.ratingSummary.reviewCount} evaluations</p>
                      </div>
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
