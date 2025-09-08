import { UserPlus, Siren, Users, Bell, History, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Easy Registration",
      description: "Quick and secure donor registration with complete profile management and verification.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Siren,
      title: "Emergency Blood Request",
      description: "Instant emergency blood requests with real-time tracking and priority matching.",
      gradient: "from-accent/10 to-accent/5",
    },
    {
      icon: Users,
      title: "Smart Donor Matching",
      description: "AI-powered matching system connects compatible donors based on blood type and location.",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Instant alerts for matching requests and donation opportunities in your area.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: History,
      title: "Donation History",
      description: "Track your donation history and receive certificates for your contributions.",
      gradient: "from-accent/10 to-accent/5",
    },
    {
      icon: Shield,
      title: "Government Verified",
      description: "All donors and requests are verified through government databases for safety.",
      gradient: "from-secondary/10 to-secondary/5",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            How <span className="text-primary">RaktKosh</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes blood donation simple, safe, and efficient through advanced technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-xl p-6 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;