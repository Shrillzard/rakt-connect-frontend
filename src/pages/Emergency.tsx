import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Siren, User, Phone, MapPin, Droplet, Clock, AlertCircle, Hospital } from "lucide-react";

const Emergency = () => {
  const { toast } = useToast();
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Emergency Request Submitted!",
      description: "We're immediately notifying compatible donors in your area. You'll receive updates via SMS.",
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
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-accent">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-destructive/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertCircle className="h-6 w-6 text-accent" />
                Emergency Blood Request Form
              </CardTitle>
              <CardDescription>
                Fill this form to request urgent blood. We'll immediately notify matching donors.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Patient Information
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group Required *</Label>
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
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="units">Units Required *</Label>
                      <div className="relative">
                        <Droplet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="units"
                          type="number"
                          placeholder="Number of units"
                          value={formData.unitsRequired}
                          onChange={(e) => handleInputChange("unitsRequired", e.target.value)}
                          className="pl-10"
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
                            <Label htmlFor="critical" className="text-destructive font-semibold">Critical (Within 2 hrs)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high" className="text-accent font-semibold">High (Within 6 hrs)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate">Moderate (Within 24 hrs)</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Hospital className="h-5 w-5" />
                    Hospital Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Ward/ICU/Room number"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">Doctor Name</Label>
                      <Input
                        id="doctorName"
                        placeholder="Attending doctor"
                        value={formData.doctorName}
                        onChange={(e) => handleInputChange("doctorName", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="doctorContact">Doctor Contact</Label>
                      <Input
                        id="doctorContact"
                        placeholder="Doctor's contact number"
                        value={formData.doctorContact}
                        onChange={(e) => handleInputChange("doctorContact", e.target.value)}
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
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person Name *</Label>
                      <Input
                        id="contactPerson"
                        placeholder="Your name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Primary Contact Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contactNumber"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alternateContact">Alternate Contact Number</Label>
                    <Input
                      id="alternateContact"
                      type="tel"
                      placeholder="Alternate number"
                      value={formData.alternateContact}
                      onChange={(e) => handleInputChange("alternateContact", e.target.value)}
                    />
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

                {/* Important Notice */}
                <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                  <div className="flex gap-2">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">What happens next?</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Your request will be immediately sent to matching donors</li>
                        <li>• You'll receive SMS updates when donors accept</li>
                        <li>• Our team will coordinate with the hospital</li>
                        <li>• Emergency helpline support available 24/7</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" variant="emergency" size="lg" className="flex-1">
                    <Siren className="mr-2 h-5 w-5" />
                    Submit Emergency Request
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Helpline
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Emergency;