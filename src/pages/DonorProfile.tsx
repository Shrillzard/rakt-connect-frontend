import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, MapPin, Droplet, Clock, CheckCircle, Calendar, Activity, Users } from "lucide-react";

interface DonorData {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  distance: string;
  lastDonation: string;
  available: boolean;
  verified: boolean;
  phone: string;
  totalDonations: number;
  age: number;
  city: string;
  state: string;
  registeredDate: string;
}

const DonorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock donor data - in a real app, this would be fetched based on the ID
  const donorData: DonorData = {
    id: id || "1",
    name: id === "2" ? "Priya M." : 
          id === "3" ? "Amit K." :
          id === "4" ? "Sneha R." :
          id === "5" ? "Vikram P." :
          id === "6" ? "Anita G." : "Rahul S.",
    bloodGroup: id === "2" ? "A+" :
                id === "3" ? "B+" :
                id === "4" ? "AB+" :
                id === "5" ? "O-" :
                id === "6" ? "A-" : "O+",
    location: id === "2" ? "Saket, Delhi" :
              id === "3" ? "Dwarka, Delhi" :
              id === "4" ? "Rohini, Delhi" :
              id === "5" ? "Gurgaon, Haryana" :
              id === "6" ? "Noida, UP" : "Connaught Place, Delhi",
    distance: id === "2" ? "5 km" :
              id === "3" ? "8 km" :
              id === "4" ? "12 km" :
              id === "5" ? "15 km" :
              id === "6" ? "10 km" : "2.5 km",
    lastDonation: id === "2" ? "6 months ago" :
                  id === "3" ? "4 months ago" :
                  id === "4" ? "2 months ago" :
                  id === "5" ? "5 months ago" :
                  id === "6" ? "1 month ago" : "3 months ago",
    available: id === "3" ? false : true,
    verified: id === "4" ? false : true,
    phone: "+91 98765 43210",
    totalDonations: id === "2" ? 8 :
                   id === "3" ? 12 :
                   id === "4" ? 3 :
                   id === "5" ? 15 :
                   id === "6" ? 20 : 10,
    age: id === "2" ? 28 :
         id === "3" ? 35 :
         id === "4" ? 24 :
         id === "5" ? 42 :
         id === "6" ? 31 : 29,
    city: id === "5" ? "Gurgaon" :
          id === "6" ? "Noida" : "Delhi",
    state: id === "5" ? "Haryana" :
           id === "6" ? "Uttar Pradesh" : "Delhi",
    registeredDate: "January 2023",
  };

  const canDonateNow = () => {
    const lastDonationMonths = parseInt(donorData.lastDonation.split(" ")[0]);
    return lastDonationMonths >= 3;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/find-donors")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>

          {/* Donor Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Droplet className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{donorData.name}</h1>
                      {donorData.verified && (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {donorData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        {donorData.distance} away
                      </span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={donorData.available ? "default" : "secondary"}
                  className="text-lg px-4 py-2"
                >
                  {donorData.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Button 
              size="lg" 
              className="w-full"
              disabled={!donorData.available}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Donor: {donorData.phone}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full"
              disabled={!donorData.available}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-primary" />
                  Donor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <Badge variant="outline" className="text-lg font-bold">
                    {donorData.bloodGroup}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{donorData.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{donorData.city}, {donorData.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-medium">{donorData.distance}</span>
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Donation History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Donation</span>
                  <span className="font-medium">{donorData.lastDonation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Donations</span>
                  <Badge variant="secondary">{donorData.totalDonations} times</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{donorData.registeredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Donate Now</span>
                  <Badge variant={canDonateNow() ? "default" : "secondary"}>
                    {canDonateNow() ? "Yes" : "Not Yet"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Mobile Number (Tap to call)
                </p>
                <a 
                  href={`tel:${donorData.phone}`}
                  className="text-xl font-bold text-primary hover:underline"
                >
                  {donorData.phone}
                </a>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Please be respectful when contacting donors. 
                  Verify all information before proceeding with any blood donation arrangements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Donation Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Donor Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{donorData.totalDonations}</p>
                  <p className="text-sm text-muted-foreground">Donations</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{donorData.totalDonations * 3}</p>
                  <p className="text-sm text-muted-foreground">Lives Saved</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{donorData.totalDonations * 450}</p>
                  <p className="text-sm text-muted-foreground">ml Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;