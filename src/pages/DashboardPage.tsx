import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import ThemedCardHeader from '@/components/ThemedCardHeader'; // Custom
import DoraemonThemeIcon from '@/components/DoraemonThemeIcon'; // Custom
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Bell, CalendarDays, Pill, UserCircle, LogOut } from 'lucide-react';

// Mock data
const upcomingAppointments = [
  { id: '1', type: 'Doctor Check-up', doctor: 'Dr. Bell', time: 'Tomorrow, 10:00 AM', status: 'Upcoming' },
  { id: '2', type: 'Dental Cleaning', doctor: 'Dr. Smile', time: 'Next Week, 2:00 PM', status: 'Upcoming' },
];

const medicationReminders = [
  { id: 'med1', name: 'Vitamin D', dosage: '1 tablet', time: 'Daily at 9:00 AM' },
  { id: 'med2', name: 'Pain Relief', dosage: 'As needed', time: 'Max 3 times a day' },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  console.log('DashboardPage loaded');

  // Placeholder for user data
  const userName = "Doraemon Fan";
  const userAvatarUrl = "https://placekitten.com/100/100"; // Placeholder avatar

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DoraemonThemeIcon size={32} color="text-white" />
            <h1 className="text-2xl font-bold">Doraemon Health</h1>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/appointments">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Appointments</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/medications">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Medications</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/user-profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="text-white hover:bg-blue-700" onClick={() => navigate('/auth')}>
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </Button>
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
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome back, {userName}!</h2>
          <p className="text-gray-600">Here's your health overview for today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <ThemedCardHeader title="Schedule New Appointment" themeColor="blue">
                    <CalendarDays className="h-8 w-8 text-white opacity-75" />
                </ThemedCardHeader>
                <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">Need to see a doctor? Book your next visit quickly.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => navigate('/appointments')}>
                        Schedule Now
                    </Button>
                </CardFooter>
            </Card>
             <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <ThemedCardHeader title="Manage Medications" themeColor="pink">
                     <Pill className="h-8 w-8 text-white opacity-75" />
                </ThemedCardHeader>
                <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">View your prescriptions and add new medications.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-pink-500 hover:bg-pink-600" onClick={() => navigate('/medications')}>
                        Go to Medications
                    </Button>
                </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <ThemedCardHeader title="Your Profile" themeColor="default">
                    <UserCircle className="h-8 w-8 text-gray-500" />
                </ThemedCardHeader>
                <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">Update your personal information and settings.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline" onClick={() => navigate('/user-profile')}>
                        View Profile
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <ThemedCardHeader title="Upcoming Appointments" description="Your scheduled visits" themeColor="blue" />
            <ScrollArea className="h-72">
              <CardContent className="pt-4 space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(apt => (
                    <div key={apt.id} className="p-3 border rounded-lg bg-blue-50">
                      <h4 className="font-semibold text-blue-700">{apt.type}</h4>
                      <p className="text-sm text-gray-600">With: {apt.doctor}</p>
                      <p className="text-sm text-gray-600">When: {apt.time}</p>
                      <div className="mt-2">
                        <Progress value={30} className="h-2 [&>*]:bg-blue-500" /> 
                        <p className="text-xs text-blue-600 mt-1">{apt.status}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming appointments. Time for a break!</p>
                )}
              </CardContent>
            </ScrollArea>
             <CardFooter className="pt-4">
                <Button variant="link" className="text-blue-600" onClick={() => navigate('/appointments')}>View All Appointments</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <ThemedCardHeader title="Medication Reminders" description="Stay on top of your prescriptions" themeColor="pink" />
            <ScrollArea className="h-72">
              <CardContent className="pt-4 space-y-4">
                {medicationReminders.length > 0 ? (
                  medicationReminders.map(med => (
                    <div key={med.id} className="p-3 border rounded-lg bg-pink-50 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-pink-700">{med.name}</h4>
                        <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                        <p className="text-sm text-gray-600">Time: {med.time}</p>
                      </div>
                      <DoraemonThemeIcon size={20} className="text-pink-500" />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No active medication reminders.</p>
                )}
              </CardContent>
            </ScrollArea>
            <CardFooter className="pt-4">
                <Button variant="link" className="text-pink-600" onClick={() => navigate('/medications')}>Manage Medications</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="text-center py-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Doraemon Health Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;