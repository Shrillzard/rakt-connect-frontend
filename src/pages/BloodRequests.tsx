import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, MapPin, Clock, Droplet, AlertCircle, Send, CheckCircle } from "lucide-react";

interface BloodRequest {
  donorId: string;
  donorName: string;
  bloodGroup: string;
  location: string;
  requestedBy: string;
  requestDate: string;
  urgency: string;
  status: string;
}

const BloodRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    // Get current user
    const currentUser = localStorage.getItem("currentUser");
    const userEmail = currentUser ? JSON.parse(currentUser).email : null;
    
    // Create dummy blood requests
    const dummyRequests: BloodRequest[] = [
      {
        donorId: userEmail || "user1",
        donorName: "You",
        bloodGroup: "O+",
        location: "Connaught Place, Delhi",
        requestedBy: "Amit Singh",
        requestDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        urgency: "critical",
        status: "pending"
      },
      {
        donorId: userEmail || "user1",
        donorName: "You",
        bloodGroup: "O+",
        location: "Saket, Delhi",
        requestedBy: "Priya Sharma",
        requestDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        urgency: "urgent",
        status: "accepted"
      },
      {
        donorId: userEmail || "user1",
        donorName: "You",
        bloodGroup: "O+",
        location: "Dwarka, Delhi",
        requestedBy: "Raj Kumar",
        requestDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        urgency: "normal",
        status: "pending"
      }
    ];
    
    // Load actual blood requests
    const allRequests = localStorage.getItem("bloodRequestDetails");
    let combinedRequests = [...dummyRequests];
    
    if (allRequests && userEmail) {
      const parsedRequests = JSON.parse(allRequests);
      // Filter for requests where the current user is the donor
      const receivedRequests = parsedRequests.filter((req: BloodRequest) => {
        const userData = JSON.parse(currentUser);
        return req.donorName === userData?.name || req.donorId === userEmail || req.donorName === "You";
      }
      );
      combinedRequests = [...dummyRequests, ...receivedRequests];
    }
    
    // Sort by date, newest first
    combinedRequests.sort((a: BloodRequest, b: BloodRequest) => 
      new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
    );
    setRequests(combinedRequests);
  }, []);

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "urgent":
        return <Badge className="bg-orange-500">Urgent</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Blood Donation Requests</h1>
              <p className="text-muted-foreground">View blood donation requests from seekers</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold">{requests.length}</p>
                  </div>
                  <Send className="h-8 w-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {requests.filter(r => r.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Accepted</p>
                    <p className="text-2xl font-bold">
                      {requests.filter(r => r.status === "accepted").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requests List */}
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Blood Donation Requests</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't received any blood donation requests yet.
                </p>
                <Button onClick={() => navigate("/find-donors")}>
                  Find Donors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request, index) => (
                <Card key={`${request.donorId}-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Blood Seeker</h3>
                          <p className="text-sm text-muted-foreground">Requested by: {request.requestedBy}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Droplet className="h-3 w-3" />
                              {request.bloodGroup} needed
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getUrgencyBadge(request.urgency)}
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Requested {formatDate(request.requestDate)}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Update request status to accepted
                            const updatedRequests = requests.map(r => 
                              r === request ? { ...r, status: "accepted" } : r
                            );
                            setRequests(updatedRequests);
                            localStorage.setItem("bloodRequestDetails", JSON.stringify(updatedRequests));
                          }}
                          disabled={request.status !== "pending"}
                        >
                          Accept Request
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Update request status to rejected
                            const updatedRequests = requests.map(r => 
                              r === request ? { ...r, status: "rejected" } : r
                            );
                            setRequests(updatedRequests);
                            localStorage.setItem("bloodRequestDetails", JSON.stringify(updatedRequests));
                          }}
                          disabled={request.status !== "pending"}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequests;