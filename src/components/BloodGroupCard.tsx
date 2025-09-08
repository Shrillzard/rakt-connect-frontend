import { Droplet } from "lucide-react";

interface BloodGroupCardProps {
  group: string;
  available: number;
  urgent?: boolean;
}

const BloodGroupCard = ({ group, available, urgent = false }: BloodGroupCardProps) => {
  return (
    <div className={`relative bg-card rounded-lg p-4 border ${urgent ? 'border-accent animate-pulse' : 'border-border'} hover:shadow-md transition-all`}>
      {urgent && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
            Urgent
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${urgent ? 'bg-accent/20' : 'bg-primary/10'}`}>
            <Droplet className={`h-5 w-5 ${urgent ? 'text-accent' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{group}</h3>
            <p className="text-sm text-muted-foreground">Blood Type</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-2xl font-bold ${available < 10 ? 'text-accent' : 'text-primary'}`}>
            {available}
          </p>
          <p className="text-xs text-muted-foreground">Units Available</p>
        </div>
      </div>
    </div>
  );
};

export default BloodGroupCard;