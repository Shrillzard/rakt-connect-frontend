import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Siren, User, Phone, MapPin, Droplet, Clock, AlertCircle, Hospital, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmergencyRequest {
  id: string;
  patientName: string;
  patientAge: string;
  bloodGroup: string;
  unitsRequired: string;
  hospital: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  urgencyLevel: string;
  reason: string;
  createdAt: string;
}

const dummyRequests: EmergencyRequest[] = [
  {
    id: "1",
    patientName: "Rahul Kumar",
    patientAge: "45",
    bloodGroup: "O-",
    unitsRequired: "3",
    hospital: "AIIMS, New Delhi",
    location: "ICU Ward 3",
    contactPerson: "Priya Kumar",
    contactNumber: "+91 98765 43210",
    urgencyLevel: "critical",
    reason: "Emergency surgery after accident",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    patientName: "Anjali Sharma",
    patientAge: "28",
    bloodGroup: "AB+",
    unitsRequired: "2",
    hospital: "Apollo Hospital",
    location: "Maternity Ward",
    contactPerson: "Vikram Sharma",
    contactNumber: "+91 87654 32109",
    urgencyLevel: "high",
    reason: "Pregnancy complications",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    patientName: "Suresh Patel",
    patientAge: "60",
    bloodGroup: "B+",
    unitsRequired: "4",
    hospital: "Fortis Hospital",
    location: "Operation Theatre 2",
    contactPerson: "Meera Patel",
    contactNumber: "+91 76543 21098",
    urgencyLevel: "critical",
    reason: "Major cardiac surgery",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    patientName: "Neha Singh",
    patientAge: "35",
    bloodGroup: "A-",
    unitsRequired: "2",
    hospital: "Max Hospital",
    location: "Emergency Room",
    contactPerson: "Raj Singh",
    contactNumber: "+91 65432 10987",
    urgencyLevel: "moderate",
    reason: "Scheduled surgery",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Emergency = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    bloodGroup: "",
    unitsRequired: "",
    hospital: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
    alternateContact: "",
    urgencyLevel: "high",
    reason: "",
    doctorName: "",
    doctorContact: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const hospitals = [
    "AIIMS, New Delhi",
    "Apollo Hospital",
    "Fortis Hospital",
    "Max Hospital",
    "Medanta Hospital",
    "Other",
  ];

  useEffect(() => {
    // Load existing requests from localStorage
    const storedRequests = localStorage.getItem("emergencyRequests");
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } else {
      // Initialize with dummy requests
      setRequests(dummyRequests);
      localStorage.setItem("emergencyRequests", JSON.stringify(dummyRequests));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: EmergencyRequest = {
      id: Date.now().toString(),
      patientName: formData.patientName,
      patientAge: formData.patientAge,
      bloodGroup: formData.bloodGroup,
      unitsRequired: formData.unitsRequired,
      hospital: formData.hospital,
      location: formData.location,
      contactPerson: formData.contactPerson,
      contactNumber: formData.contactNumber,
      urgencyLevel: formData.urgencyLevel,
      reason: formData.reason,
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem("emergencyRequests", JSON.stringify(updatedRequests));
    
    toast({
      title: "Emergency Request Submitted!",
      description: "We're immediately notifying compatible donors in your area.",
    });
    
    setShowForm(false);
    setFormData({
      patientName: "",
      patientAge: "",
      bloodGroup: "",
      unitsRequired: "",
      hospital: "",
      location: "",
      contactPerson: "",
      contactNumber: "",
      alternateContact: "",
      urgencyLevel: "high",
      reason: "",
      doctorName: "",
      doctorContact: "",
    });
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High Priority</Badge>;
      default:
        return <Badge variant="secondary">Moderate</Badge>;
    }
  };

  const getTimeAgo = (dateString: string) => {
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
      
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-accent to-destructive text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <Siren className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Emergency Blood Request Line: 1800-BLOOD-NOW</span>
            <Siren className="h-5 w-5 animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Emergency Blood Requests</h1>
              <p className="text-muted-foreground">Critical blood requirements from hospitals</p>
            </div>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button variant="emergency" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  New Emergency Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Emergency Blood Request Form</DialogTitle>
                  <DialogDescription>
                    Fill this form to request urgent blood. We'll immediately notify matching donors.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Patient Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Patient Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name *</Label>
                        <Input
                          id="patientName"
                          placeholder="Enter patient name"
                          value={formData.patientName}
                          onChange={(e) => handleInputChange("patientName", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="patientAge">Age *</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          placeholder="Age"
                          value={formData.patientAge}
                          onChange={(e) => handleInputChange("patientAge", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group *</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
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
                        <Label htmlFor="units">Units Required *</Label>
                        <Input
                          id="units"
                          type="number"
                          placeholder="Number of units"
                          value={formData.unitsRequired}
                          onChange={(e) => handleInputChange("unitsRequired", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hospital Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Hospital className="h-5 w-5" />
                      Hospital Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospital">Hospital Name *</Label>
                        <Select value={formData.hospital} onValueChange={(value) => handleInputChange("hospital", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hospital" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitals.map(hospital => (
                              <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location/Ward *</Label>
                        <Input
                          id="location"
                          placeholder="Ward/ICU/Room number"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          placeholder="Your name"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number *</Label>
                        <Input
                          id="contactNumber"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Urgency Level *</Label>
                      <RadioGroup value={formData.urgencyLevel} onValueChange={(value) => handleInputChange("urgencyLevel", value)}>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="critical" id="critical" />
                            <Label htmlFor="critical">Critical</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high">High</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate">Moderate</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Blood Requirement</Label>
                      <textarea
                        id="reason"
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Surgery, accident, medical condition, etc."
                        value={formData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="emergency" className="w-full">
                    Submit Emergency Request
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Emergency Requests Grid */}
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id} className="border-2 border-accent/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{request.patientName}</h3>
                          {getUrgencyBadge(request.urgencyLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground">Age: {request.patientAge} years</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Droplet className="h-3 w-3" />
                            <span className="font-semibold text-destructive">{request.bloodGroup}</span> • {request.unitsRequired} units
                          </span>
                          <span className="flex items-center gap-1">
                            <Hospital className="h-3 w-3" />
                            {request.hospital}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.location}
                          </span>
                        </div>
                        {request.reason && (
                          <p className="text-sm mt-2 text-muted-foreground">
                            <span className="font-medium">Reason:</span> {request.reason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {getTimeAgo(request.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">Contact:</span>
                      <span>{request.contactPerson}</span>
                      <span className="text-primary font-semibold">{request.contactNumber}</span>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Contact Initiated",
                          description: `Connecting you with ${request.contactPerson}`,
                        });
                      }}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Offer Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;