import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Calendar, ClipboardList, FileText, MessageSquare, Trophy, LogOut, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("pinboard");

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const announcements = [
    { id: 1, from: "Dean's Office", message: "Mid-semester exams postponed to next week", time: "2 hours ago", type: "important" },
    { id: 2, from: "Prof. Smith", message: "Assignment 3 deadline extended by 2 days", time: "5 hours ago", type: "update" },
    { id: 3, from: "Robotics Club", message: "Workshop registration now open", time: "1 day ago", type: "event" },
    { id: 4, from: "Admin", message: "Campus closed on Friday for maintenance", time: "2 days ago", type: "holiday" },
  ];

  const menuItems = [
    { id: "pinboard", label: "Announcements", icon: Bell },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: ClipboardList },
    { id: "complaints", label: "Complaints", icon: MessageSquare },
    { id: "archive", label: "Event Archive", icon: Trophy },
    { id: "calendar", label: "Events Calendar", icon: Calendar },
    { id: "feedback", label: "Club Feedback", icon: MessageSquare },
    { id: "assignments", label: "Assignments", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "pinboard":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Announcements & Notices</h2>
            <ScrollArea className="h-[600px]">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="mb-4 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{announcement.from}</CardTitle>
                        <p className="text-sm text-muted-foreground">{announcement.time}</p>
                      </div>
                      <Badge variant={announcement.type === "important" ? "destructive" : "secondary"}>
                        {announcement.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.message}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
        );

      case "timetable":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Timetable</h2>
            <div className="grid gap-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <Card key={day}>
                  <CardHeader>
                    <CardTitle>{day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-semibold">9:00 AM - 10:30 AM</p>
                          <p className="text-sm text-muted-foreground">Data Structures - Room 301</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                        <Clock className="w-5 h-5 text-secondary" />
                        <div className="flex-1">
                          <p className="font-semibold">11:00 AM - 12:30 PM</p>
                          <p className="text-sm text-muted-foreground">Database Systems - Lab 2</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Attendance Overview</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {["Data Structures", "Database Systems", "Operating Systems", "Computer Networks"].map((subject) => (
                <Card key={subject}>
                  <CardHeader>
                    <CardTitle>{subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Attended:</span>
                        <span className="font-bold">28/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Percentage:</span>
                        <span className="font-bold text-success">93.3%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "93.3%" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "assignments":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Assignments</h2>
            <div className="grid gap-4">
              <Card className="border-l-4 border-l-destructive">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Data Structures Assignment 3</CardTitle>
                    <Badge variant="destructive">Due Tomorrow</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Implement Binary Search Tree with AVL balancing</p>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-warning">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Database Project</CardTitle>
                    <Badge className="bg-warning text-warning-foreground">Due in 3 days</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Design and implement college management system</p>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{activeSection}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This section is under development.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <ThemeToggle />
        <Button variant="outline" size="icon" onClick={handleLogout} className="rounded-full">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {localStorage.getItem("userEmail")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
