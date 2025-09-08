import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import BloodGroupCard from "@/components/BloodGroupCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const bloodGroups = [
    { group: "A+", available: 45, urgent: false },
    { group: "B+", available: 38, urgent: false },
    { group: "O+", available: 52, urgent: false },
    { group: "AB+", available: 15, urgent: true },
    { group: "A-", available: 8, urgent: true },
    { group: "B-", available: 12, urgent: false },
    { group: "O-", available: 6, urgent: true },
    { group: "AB-", available: 3, urgent: true },
  ];

  const upcomingCamps = [
    {
      location: "AIIMS Hospital, New Delhi",
      date: "March 15, 2024",
      time: "9:00 AM - 4:00 PM",
    },
    {
      location: "Red Cross Center, Mumbai",
      date: "March 18, 2024",
      time: "10:00 AM - 5:00 PM",
    },
    {
      location: "Apollo Hospital, Bangalore",
      date: "March 20, 2024",
      time: "8:00 AM - 3:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Features />
      
      {/* Blood Availability Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Current Blood Availability</h2>
            <p className="text-muted-foreground">Real-time blood stock in your area</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {bloodGroups.map((group) => (
              <BloodGroupCard key={group.group} {...group} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/emergency">
              <Button variant="hero" size="lg">
                Request Blood Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Blood Camps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Upcoming Blood Donation Camps</h2>
            <p className="text-muted-foreground">Join us at these locations to donate blood</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingCamps.map((camp, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{camp.location}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{camp.date}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {camp.time}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Register for Camp
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Become a Life Saver Today</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your single donation can save up to three lives. Join thousands of heroes who are making a difference every day.
          </p>
          <Link to="/register">
            <Button variant="hero" size="xl">
              Start Your Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;