import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Droplet, 
  Heart, 
  Edit,
  Award,
  Clock,
  Activity,
  LogOut
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lastDonation: string;
  medicalConditions: string;
  emergencyContact: string;
  registrationDate: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      navigate("/register");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    window.dispatchEvent(new Event("userLoginStateChanged"));
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getDonationEligibility = (lastDonation: string) => {
    if (!lastDonation) return { eligible: true, daysLeft: 0 };
    
    const lastDate = new Date(lastDonation);
    const today = new Date();
    const daysSinceLastDonation = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    const eligible = daysSinceLastDonation >= 90;
    const daysLeft = eligible ? 0 : 90 - daysSinceLastDonation;
    
    return { eligible, daysLeft };
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const donationStatus = getDonationEligibility(profile.lastDonation);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{profile.fullName}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    <Droplet className="h-4 w-4 mr-1" />
                    {profile.bloodGroup || "Not Specified"}
                  </Badge>
                  <Badge variant={donationStatus.eligible ? "default" : "outline"}>
                    {donationStatus.eligible ? "Eligible to Donate" : `Eligible in ${donationStatus.daysLeft} days`}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/register")} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">
                        {profile.dateOfBirth} ({calculateAge(profile.dateOfBirth)} years)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{profile.city}, {profile.state}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    {profile.address || "Not provided"}<br />
                    {profile.city}, {profile.state} - {profile.pincode}
                  </p>
                </div>
                
                {profile.emergencyContact && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Emergency Contact</h4>
                      <p className="text-muted-foreground">{profile.emergencyContact}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>Your health and donation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="font-medium text-lg">{profile.bloodGroup || "Not Specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Donation</p>
                      <p className="font-medium">{profile.lastDonation || "Never donated"}</p>
                    </div>
                  </div>
                </div>
                
                {profile.medicalConditions && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Medical Conditions</h4>
                      <p className="text-muted-foreground">{profile.medicalConditions}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Donor Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-lg">New Donor</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Thank you for joining our life-saving community!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Donations</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Lives Saved</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {new Date(profile.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => navigate("/find-donors")}
                >
                  Find Donors
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/emergency")}
                >
                  Request Blood
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={!donationStatus.eligible}
                >
                  Schedule Donation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;