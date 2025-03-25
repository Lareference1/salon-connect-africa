
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BraiderData } from "@/data/braidersData";

interface BraiderEditFormProps {
  braider: BraiderData;
  onSave: (updatedBraider: BraiderData) => void;
  onCancel: () => void;
}

const BraiderEditForm = ({ braider, onSave, onCancel }: BraiderEditFormProps) => {
  const [editedBraider, setEditedBraider] = useState<BraiderData>({ ...braider });
  const [specialtyInput, setSpecialtyInput] = useState("");

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

  return (
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
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={() => onSave(editedBraider)}>Enregistrer</Button>
      </div>
    </ScrollArea>
  );
};

export default BraiderEditForm;
