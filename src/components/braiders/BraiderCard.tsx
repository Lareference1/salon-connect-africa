
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageSquare, Calendar, Check, Clock, Edit, Upload } from 'lucide-react';
import { BraiderData } from '@/data/braidersData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BraiderCardProps {
  braider: BraiderData;
  onUpdate?: (id: number, updatedData: Partial<BraiderData>) => void;
}

const BraiderCard = ({ braider, onUpdate }: BraiderCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBraider, setEditedBraider] = useState<BraiderData>({ ...braider });
  const [specialtyInput, setSpecialtyInput] = useState("");

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'soon':
        return 'text-amber-500';
      case 'unavailable':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Check className="h-4 w-4 mr-1" />;
      case 'soon':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBraider(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as 'available' | 'soon' | 'unavailable';
    setEditedBraider(prev => ({ 
      ...prev, 
      status,
      availability: status === 'available' 
        ? 'Disponible' 
        : status === 'soon' 
          ? 'Disponible dans 2 jours' 
          : 'Non disponible'
    }));
  };

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !editedBraider.specialties.includes(specialtyInput.trim())) {
      setEditedBraider(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()]
      }));
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setEditedBraider(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedBraider(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(braider.id, editedBraider);
      toast({
        title: "Modifications enregistrées",
        description: "Les informations ont été mises à jour avec succès.",
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64">
          <img 
            src={braider.image} 
            alt={braider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{braider.name}</h3>
            {onUpdate && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 bg-white/80 hover:bg-white"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{braider.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 mb-2">
            <Star className="h-4 w-4 text-salon-accent2 fill-salon-accent2 mr-1" />
            <span className="text-sm">{braider.rating} ({braider.reviews} avis)</span>
          </div>
          
          <div className={`flex items-center mb-3 ${getAvailabilityColor(braider.status)}`}>
            {getAvailabilityIcon(braider.status)}
            <span className="text-sm">{braider.availability} · {braider.experience} d'expérience</span>
          </div>

          {braider.bio && (
            <div className="mb-3">
              <p className="text-sm text-gray-600">{braider.bio}</p>
            </div>
          )}
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">Spécialités:</h4>
            <div className="flex flex-wrap gap-1">
              {braider.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-salon-primary hover:bg-salon-primary/90"
              disabled={braider.status === 'unavailable'}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Contacter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
              disabled={braider.status === 'unavailable'}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Planifier
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier les informations</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="image">Photo</Label>
                <div className="flex items-center space-x-2">
                  <div className="h-24 w-24 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={editedBraider.image} 
                      alt={editedBraider.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="flex items-center border border-input rounded-md p-2 hover:bg-accent">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Télécharger une image</span>
                      </div>
                      <input 
                        type="file" 
                        id="imageUpload" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editedBraider.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={editedBraider.location} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={editedBraider.bio || ''} 
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Expérience</Label>
                <Input 
                  id="experience" 
                  name="experience" 
                  value={editedBraider.experience} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <select 
                  id="status" 
                  name="status" 
                  value={editedBraider.status}
                  onChange={handleStatusChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="available">Disponible</option>
                  <option value="soon">Bientôt disponible</option>
                  <option value="unavailable">Non disponible</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Spécialités</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedBraider.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded">
                      {specialty}
                      <button 
                        type="button" 
                        className="ml-2 text-salon-primary hover:text-red-500"
                        onClick={() => handleRemoveSpecialty(specialty)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Ajouter une spécialité" 
                    value={specialtyInput} 
                    onChange={(e) => setSpecialtyInput(e.target.value)} 
                  />
                  <Button type="button" size="sm" onClick={handleAddSpecialty}>Ajouter</Button>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BraiderCard;
