import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import ThemedCardHeader from '@/components/ThemedCardHeader'; // Custom
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Bell, Home, CalendarDays, Pill, LogOut, Save } from 'lucide-react';
import DoraemonThemeIcon from '@/components/DoraemonThemeIcon';


// Placeholder user data
const initialUserProfile = {
  name: 'Dora H. Ealthy',
  email: 'dora.healthy@example.com',
  phone: '555-0101',
  dob: '1990-05-15',
  address: '123 Pocket Lane, Future City',
  emergencyContactName: 'Dorami Helper',
  emergencyContactPhone: '555-0202',
  notificationPreferences: {
    appointmentReminders: true,
    medicationReminders: true,
    newsletter: false,
  },
  avatarUrl: "https://cdn.pixabay.com/photo/2017/02/25/20/49/cat-2098800_1280.jpg", // Placeholder Doraemon-like cat
};


const UserProfilePage = () => {
  const [profile, setProfile] = useState(initialUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  console.log('UserProfilePage loaded');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof typeof profile.notificationPreferences) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [name]: !prev.notificationPreferences[name],
      }
    }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile saved:', profile);
    // Add API call to save data here
    setIsEditing(false);
    alert("Profile updated successfully!");
  };
  
  const userAvatarUrl = profile.avatarUrl || "https://placekitten.com/100/100";
  const userName = profile.name || "User";


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DoraemonThemeIcon size={32} color="text-white" />
            <h1 className="text-2xl font-bold">User Profile</h1>
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
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}><Pill className="mr-1 h-4 w-4" /> Medications</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <Link to="/user-profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle({className: "bg-blue-700"})}>Profile</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
           <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 cursor-pointer hover:text-yellow-300" />
             <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback>{userName.substring(0,1)}</AvatarFallback>
              </Avatar>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => navigate('/auth')}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSaveChanges}>
          <Card className="max-w-3xl mx-auto shadow-xl">
            <ThemedCardHeader title="Your Profile Information" description="Manage your personal details and preferences." themeColor="blue" />
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24 border-2 border-blue-300">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{profile.name}</h3>
                  <p className="text-gray-500">{profile.email}</p>
                  {isEditing && <Input type="file" accept="image/*" className="mt-2 text-sm" onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                          setProfile(p => ({...p, avatarUrl: URL.createObjectURL(e.target.files![0])}))
                      }
                  }} />}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={profile.name} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={profile.phone} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" value={profile.dob} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={profile.address} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Contact Name</Label>
                    <Input id="emergencyContactName" name="emergencyContactName" value={profile.emergencyContactName} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                    <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={profile.emergencyContactPhone} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointmentReminders" className="flex-grow">Appointment Reminders</Label>
                    <Switch id="appointmentReminders" checked={profile.notificationPreferences.appointmentReminders} onCheckedChange={() => handleSwitchChange('appointmentReminders')} disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="medicationReminders" className="flex-grow">Medication Reminders</Label>
                    <Switch id="medicationReminders" checked={profile.notificationPreferences.medicationReminders} onCheckedChange={() => handleSwitchChange('medicationReminders')} disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newsletter" className="flex-grow">Newsletter Subscription</Label>
                    <Switch id="newsletter" checked={profile.notificationPreferences.newsletter} onCheckedChange={() => handleSwitchChange('newsletter')} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setProfile(initialUserProfile); }}>Cancel</Button>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </main>
      <footer className="text-center py-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Doraemon Health Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default UserProfilePage;