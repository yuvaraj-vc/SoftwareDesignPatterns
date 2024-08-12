import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import BlurFade from '../magicui/blur-fade';
import { Edit } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserClass = () => {
  const [user, setUser] = useState({
    name: 'user',
    email: 'user@gmail.com',
    phone: '123-456-7890',
    address: 'Stark Tower,New Jersey, USA',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
    setNewUserData(user); // Populate form with user details
  };

  const handleSaveChanges = () => {
    setUser(newUserData);
    setIsEditing(false);
    toast.success('Profile edited successfully!',{theme:'dark'});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUserData({ ...newUserData, [id]: value });
  };

  return (
    <div className='m-1 p-4 h-full w-full'>
      <ToastContainer />
      <BlurFade delay={0.25} inView>
        <Card className=' bg-opacity-90 backdrop-blur-3xl h-full w-full justify-start flex flex-col items-start'>
          <CardHeader className='w-full flex flex-row justify-between items-center border'>
            <CardTitle>User Profile</CardTitle>
            <div className='flex flex-row gap-2'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>Edit your profile details here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" value={newUserData.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" value={newUserData.email} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">Phone</Label>
                      <Input id="phone" value={newUserData.phone} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <Input id="address" value={newUserData.address} onChange={handleInputChange} className="col-span-3" />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <div className="p-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name:</Label>
                <div className="col-span-3">{user.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email:</Label>
                <div className="col-span-3">{user.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Phone:</Label>
                <div className="col-span-3">{user.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Address:</Label>
                <div className="col-span-3">{user.address}</div>
              </div>
            </div>
          </div>
        </Card>
      </BlurFade>
    </div>
  );
}

export default UserClass;
