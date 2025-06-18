import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import ThemedCardHeader from '@/components/ThemedCardHeader'; // Custom
import AppointmentStatusIndicator, { AppointmentStatus } from '@/components/AppointmentStatusIndicator'; // Custom
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // For structure if using react-hook-form
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Bell, Home, Pill, UserCircle, LogOut, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DoraemonThemeIcon from '@/components/DoraemonThemeIcon';


interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  status: AppointmentStatus;
}

const initialAppointments: Appointment[] = [
  { id: '1', date: '2024-07-15', time: '10:00 AM', doctor: 'Dr. Bell', reason: 'Annual Check-up', status: 'Completed' },
  { id: '2', date: '2024-08-05', time: '02:30 PM', doctor: 'Dr. Gadget', reason: 'Follow-up Consultation', status: 'Upcoming' },
  { id: '3', date: '2024-08-10', time: '11:00 AM', doctor: 'Dr. Dora', reason: 'Vaccination', status: 'Upcoming' },
  { id: '4', date: '2024-07-20', time: '09:00 AM', doctor: 'Dr. Pocket', reason: 'Dental Check', status: 'Cancelled' },
];

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  // Form state (basic)
  const [reason, setReason] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();
  console.log('AppointmentsPage loaded');
  
  const userAvatarUrl = "https://placekitten.com/100/100";
  const userName = "User";

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !reason || !doctor || !time) {
        alert("Please fill all fields and select a date.");
        return;
    }
    const newAppointment: Appointment = {
      id: String(appointments.length + 1),
      date: selectedDate.toISOString().split('T')[0],
      time,
      doctor,
      reason,
      status: 'Upcoming',
    };
    setAppointments(prev => [newAppointment, ...prev].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setIsFormDialogOpen(false);
    // Reset form
    setReason(''); setDoctor(''); setTime('');
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DoraemonThemeIcon size={32} color="text-white" />
            <h1 className="text-2xl font-bold">Appointments</h1>
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
                  <NavigationMenuLink className={navigationMenuTriggerStyle({className: "bg-blue-700"})}>Appointments</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/medications">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}><Pill className="mr-1 h-4 w-4" /> Medications</NavigationMenuLink>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="shadow-lg">
              <ThemedCardHeader title="Select Date" themeColor="blue" />
              <CardContent className="p-2 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white">
                  <PlusCircle className="mr-2 h-5 w-5" /> Schedule New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle className="text-blue-600">New Appointment</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new appointment. Selected date: {selectedDate?.toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleScheduleAppointment} className="grid gap-4 py-4">
                  {/* Using simple form structure. For react-hook-form, use FormField context */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">Reason</Label>
                    <Input id="reason" value={reason} onChange={e => setReason(e.target.value)} className="col-span-3" placeholder="e.g., Check-up" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doctor" className="text-right">Doctor</Label>
                    <Select value={doctor} onValueChange={setDoctor}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Dr. Bell">Dr. Bell</SelectItem>
                            <SelectItem value="Dr. Gadget">Dr. Gadget</SelectItem>
                            <SelectItem value="Dr. Dora">Dr. Dora</SelectItem>
                            <SelectItem value="Dr. Pocket">Dr. Pocket</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">Time</Label>
                    <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="col-span-3" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Confirm Appointment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <ThemedCardHeader title="Your Appointments" description="Upcoming and past visits" themeColor="pink" />
              <CardContent>
                <ScrollArea className="h-[500px] ">
                  {appointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell>{new Date(apt.date).toLocaleDateString()}</TableCell>
                            <TableCell>{apt.time}</TableCell>
                            <TableCell>{apt.doctor}</TableCell>
                            <TableCell>{apt.reason}</TableCell>
                            <TableCell>
                              <AppointmentStatusIndicator status={apt.status} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                     <p className="text-gray-500 text-center py-10">No appointments found. Try scheduling one!</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
       <footer className="text-center py-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Doraemon Health Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default AppointmentsPage;