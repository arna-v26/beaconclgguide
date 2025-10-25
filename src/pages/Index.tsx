import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EventsCarousel } from "@/components/EventsCarousel";
import { GraduationCap, Users, Briefcase, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const societies = [
  "Robotics Club",
  "Cultural Society",
  "Sports Committee",
  "Tech Club",
  "Literary Society",
  "Music Club",
  "Dance Society",
  "Photography Club",
  "Drama Club",
  "Entrepreneurship Cell",
];

const Index = () => {
  const [loginType, setLoginType] = useState<"student" | "faculty" | "club" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    facultySerial: "",
    societyName: "",
    hierarchy: "",
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (loginType === "faculty" && !formData.facultySerial) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Faculty serial number is required",
      });
      return;
    }

    if (loginType === "club" && (!formData.societyName || !formData.hierarchy)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Society name and hierarchy are required",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Redirecting to dashboard...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bell className="w-10 h-10 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Beacon
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">Your Smart Campus Companion</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Events Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ongoing Events
            </h2>
            <EventsCarousel />
            <p className="text-sm text-muted-foreground text-center">
              Use arrow keys or scroll wheel to navigate events
            </p>
          </div>

          {/* Login Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Beacon</h2>
            
            {!loginType ? (
              <div className="space-y-4">
                <Card
                  className="cursor-pointer transition-all hover:shadow-glow hover:scale-105 border-2 hover:border-primary"
                  onClick={() => setLoginType("student")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary">
                      <GraduationCap className="w-6 h-6" />
                      Student Login
                    </CardTitle>
                    <CardDescription>Access your dashboard</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="cursor-pointer transition-all hover:shadow-glow hover:scale-105 border-2 hover:border-secondary"
                  onClick={() => setLoginType("faculty")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-secondary">
                      <Briefcase className="w-6 h-6" />
                      Faculty Login
                    </CardTitle>
                    <CardDescription>Manage your classes</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="cursor-pointer transition-all hover:shadow-glow hover:scale-105 border-2 hover:border-accent"
                  onClick={() => setLoginType("club")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-accent">
                      <Users className="w-6 h-6" />
                      Club / Society Login
                    </CardTitle>
                    <CardDescription>Manage your society</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ) : (
              <Card className="border-2 shadow-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {loginType === "student" && (
                        <>
                          <GraduationCap className="w-6 h-6 text-primary" />
                          <span className="text-primary">Student Login</span>
                        </>
                      )}
                      {loginType === "faculty" && (
                        <>
                          <Briefcase className="w-6 h-6 text-secondary" />
                          <span className="text-secondary">Faculty Login</span>
                        </>
                      )}
                      {loginType === "club" && (
                        <>
                          <Users className="w-6 h-6 text-accent" />
                          <span className="text-accent">Club / Admin Login</span>
                        </>
                      )}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setLoginType(null);
                        setFormData({
                          email: "",
                          password: "",
                          facultySerial: "",
                          societyName: "",
                          hierarchy: "",
                        });
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {loginType === "student" ? "College Email ID" : 
                         loginType === "faculty" ? "Faculty Email" : "Admin Email"}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@college.edu"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    {loginType === "faculty" && (
                      <div className="space-y-2">
                        <Label htmlFor="facultySerial">Faculty Serial No.</Label>
                        <Input
                          id="facultySerial"
                          type="text"
                          placeholder="FAC12345"
                          value={formData.facultySerial}
                          onChange={(e) =>
                            setFormData({ ...formData, facultySerial: e.target.value })
                          }
                          required
                        />
                      </div>
                    )}

                    {loginType === "club" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="society">Society Name</Label>
                          <Select
                            value={formData.societyName}
                            onValueChange={(value) =>
                              setFormData({ ...formData, societyName: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your society" />
                            </SelectTrigger>
                            <SelectContent>
                              {societies.map((society) => (
                                <SelectItem key={society} value={society}>
                                  {society}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hierarchy">Hierarchy / Position</Label>
                          <Input
                            id="hierarchy"
                            type="text"
                            placeholder="e.g., President, Vice President"
                            value={formData.hierarchy}
                            onChange={(e) =>
                              setFormData({ ...formData, hierarchy: e.target.value })
                            }
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Login as {loginType === "student" ? "Student" : loginType === "faculty" ? "Faculty" : "Admin"}
                    </Button>

                    <div className="flex justify-between text-sm">
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() =>
                          toast({
                            title: "Password Reset",
                            description: "Check your email for reset instructions",
                          })
                        }
                      >
                        Forgot Password?
                      </button>
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() =>
                          toast({
                            title: "Create Account",
                            description: "Please contact admin to create an account",
                          })
                        }
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
