import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, Users, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "Active Donors" },
    { icon: Droplet, value: "10,000+", label: "Lives Saved" },
    { icon: Clock, value: "24/7", label: "Emergency Support" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              <Heart className="h-4 w-4" />
              <span>Government Certified Blood Donation Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Every Drop Counts,
              <span className="text-primary block">Save Lives Today</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Connect with verified blood donors instantly. Your donation can save up to 3 lives. 
              Join India's most trusted blood donation network.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Register as Donor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/emergency">
                <Button variant="outline" size="xl">
                  Request Blood
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
            <div className="relative bg-card rounded-2xl shadow-2xl p-8 border">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-bold text-2xl">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Requests</p>
                    <p className="text-2xl font-bold">Active Now</p>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-3 w-3 bg-accent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;