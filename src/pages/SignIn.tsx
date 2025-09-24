import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, UserCircle } from "lucide-react";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept any email and password - dummy authentication
    const dummyProfile = {
      name: "John Doe",
      email: formData.email,
      bloodGroup: "A+",
      location: "Connaught Place, Delhi",
      phone: "+91 9876543210",
      dateOfBirth: "1995-03-15",
      gender: "Male",
      age: 29,
      weight: 72,
      lastDonation: "2 months ago",
      donationCount: 5,
      address: "123, Green Park, New Delhi - 110016",
      emergencyContact: "+91 9876543211",
      medicalHistory: "No major health issues",
      allergies: "None",
      medications: "None",
      isAvailable: true,
      preferredDonationTime: "Weekends",
    };
    
    // Store the dummy profile
    localStorage.setItem("userProfile", JSON.stringify(dummyProfile));
    localStorage.setItem("currentUser", JSON.stringify(dummyProfile));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("userLoginStateChanged"));
    
    toast.success("Signed in successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <UserCircle className="h-8 w-8 text-primary" />
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter any email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter any password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  This is a demo sign-in. Any email and password will work.
                </p>
                
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;