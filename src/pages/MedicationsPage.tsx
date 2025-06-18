import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import ThemedCardHeader from '@/components/ThemedCardHeader'; // Custom
import DoraemonThemeIcon from '@/components/DoraemonThemeIcon'; // Custom
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Bell, Home, CalendarDays, UserCircle, LogOut, PlusCircle, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string; // e.g., "Daily", "Twice a day"
  reminders: boolean;
}

const initialMedications: Medication[] = [
  { id: '1', name: 'Vitamin C', dosage: '500mg', schedule: 'Once daily', reminders: true },
  { id: '2', name: 'Amoxicillin', dosage: '250mg', schedule: 'Every 8 hours', reminders: true },
  { id: '3', name: 'Paracetamol', dosage: '1 tablet', schedule: 'As needed for pain', reminders: false },
];

const MedicationsPage = () => {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  // Form state for new medication
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medSchedule, setMedSchedule] = useState('');
  const [medReminders, setMedReminders] = useState(true);

  const navigate = useNavigate();
  console.log('MedicationsPage loaded');
  
  const userAvatarUrl = "https://placekitten.com/100/100";
  const userName = "User";

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !medDosage || !medSchedule) {
        alert("Please fill all medication details.");
        return;
    }
    const newMedication: Medication = {
      id: String(medications.length + 1),
      name: medName,
      dosage: medDosage,
      schedule: medSchedule,
      reminders: medReminders,
    };
    setMedications(prev => [newMedication, ...prev]);
    setIsFormDialogOpen(false);
    // Reset form
    setMedName(''); setMedDosage(''); setMedSchedule(''); setMedReminders(true);
  };
  
  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DoraemonThemeIcon size={32} color="text-white" />
            <h1 className="text-2xl font-bold">Medications</h1>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}><Home className="mr-1 h-4 w-4" /> Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/appointments">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}><CalendarDays className="mr-1 h-4 w-4" /> Appointments</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/medications">
                  <NavigationMenuLink className={navigationMenuTriggerStyle({className: "bg-blue-700"})}>Medications</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/user-profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}><UserCircle className="mr-1 h-4 w-4" /> Profile</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
           <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 cursor-pointer hover:text-yellow-300" />
            <Link to="/user-profile">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback>{userName.substring(0,1)}</AvatarFallback>
              </Avatar>
            </Link>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => navigate('/auth')}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Your Medication List</h2>
          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="text-blue-600 flex items-center">
                    <DoraemonThemeIcon size={24} className="mr-2 text-blue-500" /> Add Medication
                </DialogTitle>
                <DialogDescription>
                  Enter the details of your new medication.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMedication} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medName" className="text-right">Name</Label>
                  <Input id="medName" value={medName} onChange={e => setMedName(e.target.value)} className="col-span-3" placeholder="e.g., Vitamin D" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medDosage" className="text-right">Dosage</Label>
                  <Input id="medDosage" value={medDosage} onChange={e => setMedDosage(e.target.value)} className="col-span-3" placeholder="e.g., 1000 IU" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medSchedule" className="text-right">Schedule</Label>
                   <Select value={medSchedule} onValueChange={setMedSchedule}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Schedule" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Once daily">Once daily</SelectItem>
                            <SelectItem value="Twice daily">Twice daily</SelectItem>
                            <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                            <SelectItem value="As needed">As needed</SelectItem>
                            <SelectItem value="Other">Other (Specify)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medReminders" className="text-right">Reminders</Label>
                  <Switch id="medReminders" checked={medReminders} onCheckedChange={setMedReminders} className="col-span-3 justify-self-start" />
                </div>
                <DialogFooter>
                   <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Add Medication</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height as needed */}
          {medications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medications.map(med => (
                <Card key={med.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <ThemedCardHeader title={med.name} themeColor={med.reminders ? "blue" : "default"} >
                     <div className="flex justify-between items-center">
                        <span className="text-sm opacity-80">{med.dosage}</span>
                        { med.reminders && <Bell size={16} className="text-white" />}
                     </div>
                  </ThemedCardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Schedule:</span> {med.schedule}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Reminders:</span> {med.reminders ? 'On' : 'Off'}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteMedication(med.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <DoraemonThemeIcon size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-500">Your medication list is empty.</p>
              <p className="text-gray-400">Click "Add New Medication" to get started.</p>
            </div>
          )}
        </ScrollArea>
      </main>
      <footer className="text-center py-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Doraemon Health Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default MedicationsPage;