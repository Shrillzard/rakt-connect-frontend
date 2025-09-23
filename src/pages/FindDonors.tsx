import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Droplet, Send, User, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  distance: string;
  lastDonation: string;
  available: boolean;
  verified: boolean;
}

const FindDonors = () => {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    location: "",
    urgency: "normal",
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [requestedDonors, setRequestedDonors] = useState<string[]>([]);

  const [allDonors] = useState<Donor[]>([
    {
      id: "1",
      name: "Rahul S.",
      bloodGroup: "O+",
      location: "Connaught Place, Delhi",
      distance: "2.5 km",
      lastDonation: "3 months ago",
      available: true,
      verified: true,
    },
    {
      id: "2",
      name: "Priya M.",
      bloodGroup: "A+",
      location: "Saket, Delhi",
      distance: "5 km",
      lastDonation: "6 months ago",
      available: true,
      verified: true,
    },
    {
      id: "3",
      name: "Amit K.",
      bloodGroup: "B+",
      location: "Dwarka, Delhi",
      distance: "8 km",
      lastDonation: "4 months ago",
      available: false,
      verified: true,
    },
    {
      id: "4",
      name: "Sneha R.",
      bloodGroup: "AB+",
      location: "Rohini, Delhi",
      distance: "12 km",
      lastDonation: "2 months ago",
      available: true,
      verified: false,
    },
    {
      id: "5",
      name: "Vikram P.",
      bloodGroup: "O-",
      location: "Gurgaon, Haryana",
      distance: "15 km",
      lastDonation: "5 months ago",
      available: true,
      verified: true,
    },
    {
      id: "6",
      name: "Anita G.",
      bloodGroup: "A-",
      location: "Noida, UP",
      distance: "10 km",
      lastDonation: "1 month ago",
      available: true,
      verified: true,
    },
  ]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("userProfile");
    if (userData) {
      setUserProfile(JSON.parse(userData));
    }

    // Get existing blood requests
    const requests = localStorage.getItem("bloodRequests");
    if (requests) {
      setRequestedDonors(JSON.parse(requests));
    }
  }, []);

  const handleRequestBlood = (donor: Donor) => {
    if (!userProfile) {
      toast.error("Please sign in to request blood");
      return;
    }

    // Store the blood request
    const updatedRequests = [...requestedDonors, donor.id];
    setRequestedDonors(updatedRequests);
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));

    // Store detailed request info
    const requestDetails = JSON.parse(localStorage.getItem("bloodRequestDetails") || "[]");
    requestDetails.push({
      donorId: donor.id,
      donorName: donor.name,
      bloodGroup: donor.bloodGroup,
      location: donor.location,
      requestedBy: userProfile.name,
      requestDate: new Date().toISOString(),
      urgency: searchParams.urgency,
      status: "pending"
    });
    localStorage.setItem("bloodRequestDetails", JSON.stringify(requestDetails));

    toast.success(`Blood request sent to ${donor.name}`);
  };

  // Filter donors based on search parameters
  const getFilteredDonors = () => {
    if (!isSearchActive) return allDonors;
    
    return allDonors.filter(donor => {
      // Filter by blood group
      if (searchParams.bloodGroup && donor.bloodGroup !== searchParams.bloodGroup) {
        return false;
      }
      
      // Filter by location (case-insensitive partial match)
      if (searchParams.location && 
          !donor.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
        return false;
      }
      
      // Filter by urgency (show only available donors for critical/urgent)
      if ((searchParams.urgency === "critical" || searchParams.urgency === "urgent") && 
          !donor.available) {
        return false;
      }
      
      return true;
    });
  };

  const filteredDonors = getFilteredDonors();

  const handleSearch = () => {
    setIsSearchActive(true);
  };

  const handleClearFilters = () => {
    setSearchParams({
      bloodGroup: "",
      location: "",
      urgency: "normal",
    });
    setIsSearchActive(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Display logged in user */}
          {userProfile && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm">Logged in as: <strong>{userProfile.name}</strong> ({userProfile.email})</span>
              </div>
              <Badge variant="secondary">{userProfile.bloodGroup}</Badge>
            </div>
          )}
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Blood Donors</h1>
            <p className="text-muted-foreground">
              Search for compatible donors in your area based on blood type and location
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Group</label>
                  <Select 
                    value={searchParams.bloodGroup} 
                    onValueChange={(value) => setSearchParams({...searchParams, bloodGroup: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map(group => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter city or area"
                      value={searchParams.location}
                      onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Urgency</label>
                  <Select 
                    value={searchParams.urgency} 
                    onValueChange={(value) => setSearchParams({...searchParams, urgency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end gap-2">
                  <Button onClick={handleSearch} className="flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  {isSearchActive && (
                    <Button onClick={handleClearFilters} variant="outline">
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                {isSearchActive ? "Search Results" : "Available Donors"}
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{filteredDonors.length} donors found</Badge>
                {isSearchActive && searchParams.bloodGroup && (
                  <Badge variant="outline">Blood: {searchParams.bloodGroup}</Badge>
                )}
                {isSearchActive && searchParams.location && (
                  <Badge variant="outline">Location: {searchParams.location}</Badge>
                )}
              </div>
            </div>

            {filteredDonors.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    {isSearchActive 
                      ? "No donors found matching your criteria. Try adjusting your filters."
                      : "No donors available at the moment."}
                  </p>
                  {isSearchActive && (
                    <Button onClick={handleClearFilters} variant="outline" className="mt-4">
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDonors.map((donor) => (
                <Card key={donor.id} className={`${!donor.available ? 'opacity-60' : ''} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{donor.name}</h3>
                            {donor.verified && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Droplet className="h-3 w-3" />
                              {donor.bloodGroup}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {donor.distance}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Badge variant={donor.available ? "default" : "secondary"}>
                        {donor.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{donor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last donation: {donor.lastDonation}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        disabled={!donor.available || requestedDonors.includes(donor.id)}
                        onClick={() => handleRequestBlood(donor)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {requestedDonors.includes(donor.id) ? "Request Sent" : "Request Blood"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = `/donor/${donor.id}`}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDonors;