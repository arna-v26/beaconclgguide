import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Calendar, Trophy, Send, Share2, LogOut, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const ClubDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("members");

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("societyName");
    navigate("/");
  };

  const menuItems = [
    { id: "members", label: "Manage Members", icon: Users },
    { id: "events", label: "Event Management", icon: Calendar },
    { id: "certificates", label: "Certificates", icon: Trophy },
    { id: "announcements", label: "Announcements", icon: Send },
    { id: "social", label: "Social Media", icon: Share2 },
  ];

  const members = [
    { id: 1, name: "Alice Johnson", role: "President", email: "alice@college.edu" },
    { id: 2, name: "Bob Smith", role: "Vice President", email: "bob@college.edu" },
    { id: 3, name: "Carol Davis", role: "Secretary", email: "carol@college.edu" },
    { id: 4, name: "David Wilson", role: "Member", email: "david@college.edu" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "members":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Members</h2>
              <Button>Add New Member</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Club Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>{member.role}</Badge>
                        <Button size="sm" variant="outline">Change Role</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "events":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Event Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Event Name</Label>
                    <Input placeholder="Enter event name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe your event" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Venue</Label>
                    <Input placeholder="Event location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Event Banner</Label>
                    <div className="flex gap-2">
                      <Input type="file" accept="image/*" />
                      <Button variant="outline">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast({
                      title: "Event Created",
                      description: "Event submitted for approval",
                    });
                  }}>
                    Submit for Approval
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registered Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">View and manage event registrations</p>
                <Button variant="outline">View Registration List</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "certificates":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Issue Certificates</h2>
            <Card>
              <CardHeader>
                <CardTitle>Certificate Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Event Name</Label>
                    <Input placeholder="Select event" />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient Email</Label>
                    <Input type="email" placeholder="student@college.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label>Achievement/Award</Label>
                    <Input placeholder="e.g., Winner, Participant" />
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast({
                      title: "Certificate Issued",
                      description: "Certificate sent to student's email",
                    });
                  }}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Issue Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "announcements":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Send Announcements</h2>
            <Card>
              <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="Announcement subject" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Your announcement message" rows={5} />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => {
                      toast({
                        title: "Announcement Sent",
                        description: "Sent to registered students",
                      });
                    }}>
                      Send to Registered Students
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => {
                      toast({
                        title: "Email Sent",
                        description: "Sent to all college emails",
                      });
                    }}>
                      Email All Students
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "social":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Social Media Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input placeholder="https://instagram.com/yourclub" />
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter/X</Label>
                    <Input placeholder="https://twitter.com/yourclub" />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input placeholder="https://linkedin.com/company/yourclub" />
                  </div>
                  <div className="space-y-2">
                    <Label>Facebook</Label>
                    <Input placeholder="https://facebook.com/yourclub" />
                  </div>
                  <Button className="w-full">Save Links</Button>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {localStorage.getItem("societyName")} Dashboard
          </h1>
          <p className="text-muted-foreground">Managing as {localStorage.getItem("userEmail")}</p>
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
                          ? "bg-accent text-accent-foreground"
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

export default ClubDashboard;
