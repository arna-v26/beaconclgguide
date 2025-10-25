import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ClipboardList, FileText, Bell, LogOut, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("attendance");

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const menuItems = [
    { id: "attendance", label: "Mark Attendance", icon: ClipboardList },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "assignments", label: "Assign Work", icon: FileText },
    { id: "tests", label: "Test Schedules", icon: Calendar },
    { id: "announcements", label: "Announcements", icon: Bell },
  ];

  const students = [
    { id: 1, name: "John Doe", rollNo: "CS2021001" },
    { id: 2, name: "Jane Smith", rollNo: "CS2021002" },
    { id: 3, name: "Mike Johnson", rollNo: "CS2021003" },
    { id: 4, name: "Sarah Williams", rollNo: "CS2021004" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "attendance":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mark Attendance</h2>
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-success/10 hover:bg-success/20">
                          Present
                        </Button>
                        <Button size="sm" variant="outline" className="bg-destructive/10 hover:bg-destructive/20">
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">Submit Attendance</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "timetable":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Teaching Schedule</h2>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Timetable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div key={day} className="p-4 border rounded-lg">
                      <h3 className="font-bold mb-2">{day}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 bg-primary/10 rounded">
                          <span>9:00 AM - 10:30 AM</span>
                          <span>Data Structures - CS3A</span>
                        </div>
                        <div className="flex justify-between p-2 bg-secondary/10 rounded">
                          <span>2:00 PM - 3:30 PM</span>
                          <span>Database Lab - CS3B</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Request Schedule Change</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "assignments":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Assign Work</h2>
            <Card>
              <CardHeader>
                <CardTitle>Create New Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Assignment Title</Label>
                    <Input placeholder="Enter assignment title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Enter assignment description" rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Input placeholder="e.g., CS3A" />
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast({
                      title: "Assignment Created",
                      description: "Students have been notified",
                    });
                  }}>
                    <Send className="w-4 h-4 mr-2" />
                    Assign to Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "announcements":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Send Announcement</h2>
            <Card>
              <CardHeader>
                <CardTitle>Broadcast Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="Announcement subject" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Enter your announcement" rows={5} />
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast({
                      title: "Announcement Sent",
                      description: "All students have been notified",
                    });
                  }}>
                    <Bell className="w-4 h-4 mr-2" />
                    Send to All Students
                  </Button>
                </div>
              </CardContent>
            </Card>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Faculty Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome, {localStorage.getItem("userEmail")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
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
                          ? "bg-secondary text-secondary-foreground"
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

          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
