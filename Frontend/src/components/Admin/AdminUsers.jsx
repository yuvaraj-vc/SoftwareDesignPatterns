import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Edit, Trash } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [staffs, setStaffs] = useState([
    { staffId: "ST001", staffName: "Spider-Man", subjects: "Math, Science", staffEmail: "spiderman@marvel.com", staffPassword: "password1" },
    { staffId: "ST002", staffName: "Batman", subjects: "Physics, Chemistry", staffEmail: "batman@dc.com", staffPassword: "password2" },
    { staffId: "ST003", staffName: "Mickey Mouse", subjects: "History, Geography", staffEmail: "mickey@cartoon.com", staffPassword: "password3" },
    { staffId: "ST004", staffName: "Superman", subjects: "Biology, PE", staffEmail: "superman@dc.com", staffPassword: "password4" },
    { staffId: "ST005", staffName: "Iron Man", subjects: "Computer Science, Engineering", staffEmail: "ironman@marvel.com", staffPassword: "password5" },
    { staffId: "ST006", staffName: "Scooby-Doo", subjects: "Mystery Solving, PE", staffEmail: "scooby@cartoon.com", staffPassword: "password6" },
  ]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({ staffId: '', staffName: '', subjects: '', staffEmail: '', staffPassword: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      setStaffs(staffs.filter(staff => staff.staffId !== staffId));
      toast.success('Staff Data deleted successfully!',{theme:'dark'});
    }
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setIsEditing(true);
    setNewStaff(staff); // Populate form with the staff details
  };

  const handleAdd = () => {
    setEditingStaff(null);
    setIsEditing(false);
    setNewStaff({ staffId: '', staffName: '', subjects: '', staffEmail: '', staffPassword: '' });
  };

  const handleSaveChanges = () => {
    if (!newStaff.staffId || !newStaff.staffName || !newStaff.subjects || !newStaff.staffPassword || !newStaff.staffEmail) {
      toast.error('Please fill all required fields.',{theme:'dark'});
      return;
    }

    if (isEditing) {
      setStaffs(staffs.map(staff => (staff.staffId === editingStaff.staffId ? newStaff : staff)));
      toast.success('Staff Data edited successfully!',{theme:'dark'});
    } else {
      setStaffs([...staffs, newStaff]);
      toast.success('Staff Data added successfully!',{theme:'dark'});
    }
    setEditingStaff(null);
    setIsEditing(false);
    setNewStaff({ staffId: '', staffName: '', subjects: '', staffEmail: '', staffPassword: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewStaff({ ...newStaff, [id]: value });
  };

  const filteredStaffs = staffs.filter((staff) =>
    staff.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.subjects.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.staffEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='m-1 p-4 h-full w-full'>
      <ToastContainer/>
      <BlurFade delay={0.25} inView>
        <Card className='overflow-y-auto bg-opacity-90 backdrop-blur-3xl h-full w-full justify-start flex flex-col items-start'>
          <CardHeader className='w-full flex flex-row justify-between items-center border'>
            <CardTitle>Staffs</CardTitle>
            <div className='flex flex-row gap-2'>
              <Input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64'
              />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" onClick={handleAdd}>ADD</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Add Staff</SheetTitle>
                    <SheetDescription>Add a new staff here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staffId" className="text-right">Staff ID</Label>
                      <Input id="staffId" value={newStaff.staffId} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staffName" className="text-right">Staff Name</Label>
                      <Input id="staffName" value={newStaff.staffName} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subjects" className="text-right">Subjects</Label>
                      <Input id="subjects" value={newStaff.subjects} onChange={handleInputChange} className="col-span-3" placeholder="Separate subjects with commas" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staffEmail" className="text-right">Staff Email</Label>
                      <Input id="staffEmail" value={newStaff.staffEmail} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staffPassword" className="text-right">Staff Password</Label>
                      <Input id="staffPassword" type="password" value={newStaff.staffPassword} onChange={handleInputChange} className="col-span-3" />
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
          <div className="overflow-y-auto h-full w-full"> {/* Enable scroll */}
            <Table>
              <TableCaption>A list of your recent staffs.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Staff ID</TableHead>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Staff Email</TableHead>
                  <TableHead>Staff Password</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffs.map((staff) => (
                  <TableRow key={staff.staffId}>
                    <TableCell className="font-medium">{staff.staffId}</TableCell>
                    <TableCell>{staff.staffName}</TableCell>
                    <TableCell>{staff.subjects}</TableCell>
                    <TableCell>{staff.staffEmail}</TableCell>
                    <TableCell>{staff.staffPassword}</TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="mr-2" onClick={() => handleEdit(staff)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Staff</SheetTitle>
                            <SheetDescription>Edit the staff details here. Click save when you're done.</SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="staffId" className="text-right">Staff ID</Label>
                              <Input id="staffId" value={newStaff.staffId} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="staffName" className="text-right">Staff Name</Label>
                              <Input id="staffName" value={newStaff.staffName} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="subjects" className="text-right">Subjects</Label>
                              <Input id="subjects" value={newStaff.subjects} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="staffEmail" className="text-right">Staff Email</Label>
                              <Input id="staffEmail" value={newStaff.staffEmail} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="staffPassword" className="text-right">Staff Password</Label>
                              <Input id="staffPassword" type="password" value={newStaff.staffPassword} onChange={handleInputChange} className="col-span-3" />
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      <Button variant="outline" onClick={() => handleDelete(staff.staffId)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total Staffs</TableCell>
                <TableCell className="text-right">{staffs.length}</TableCell>
              </TableRow>
            </TableFooter>
            </Table>
          </div>
        </Card>
      </BlurFade>
    </div>
  );
}

export default AdminUsers;
