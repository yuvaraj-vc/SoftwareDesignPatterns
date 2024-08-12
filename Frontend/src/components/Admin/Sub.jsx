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

const Sub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([
    { courseId: "CS101", courseTitle: "Introduction to Computer Science", eligibleStaffs: ["Spider-Man", "Iron Man"], credit: 3 },
    { courseId: "PHY101", courseTitle: "Physics I", eligibleStaffs: ["Batman", "Superman"], credit: 4 },
    { courseId: "HIS101", courseTitle: "World History", eligibleStaffs: ["Mickey Mouse"], credit: 2 },
    { courseId: "BIO101", courseTitle: "Biology I", eligibleStaffs: ["Superman"], credit: 3 },
    { courseId: "ENG101", courseTitle: "Engineering Basics", eligibleStaffs: ["Iron Man"], credit: 4 },
    { courseId: "MYS101", courseTitle: "Mystery Solving", eligibleStaffs: ["Scooby-Doo"], credit: 2 },
  ]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ courseId: '', courseTitle: '', eligibleStaffs: '', credit: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.courseId !== courseId));
      toast.success('Course deleted successfully!',{theme:'dark'});
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsEditing(true);
    setNewCourse(course); // Populate form with the course details
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setIsEditing(false);
    setNewCourse({ courseId: '', courseTitle: '', eligibleStaffs: '', credit: '' });
  };

  const handleSaveChanges = () => {
    if (!newCourse.courseId || !newCourse.courseTitle || !newCourse.credit) {
      toast.error('Please fill all required fields.',{theme:'dark'});
      return;
    }

    if (isEditing) {
      setCourses(courses.map(course => (course.courseId === editingCourse.courseId ? newCourse : course)));
      toast.success('Course edited successfully!',{theme:'dark'});
    } else {
      setCourses([...courses, { ...newCourse, eligibleStaffs: newCourse.eligibleStaffs.split(',').map(s => s.trim()) }]);
      toast.success('Course added successfully!',{theme:'dark'});
    }
    setEditingCourse(null);
    setIsEditing(false);
    setNewCourse({ courseId: '', courseTitle: '', eligibleStaffs: '', credit: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCourse({ ...newCourse, [id]: value });
  };

  const filteredCourses = courses.filter((course) =>
    course.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.eligibleStaffs.join(', ').toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.credit.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='m-1 p-4 h-full w-full'>
      <ToastContainer />
      <BlurFade delay={0.25} inView>
        <Card className='overflow-y-auto bg-opacity-90 backdrop-blur-3xl h-full w-full justify-start flex flex-col items-start'>
          <CardHeader className='w-full flex flex-row justify-between items-center border'>
            <CardTitle>Courses</CardTitle>
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
                    <SheetTitle>Add Course</SheetTitle>
                    <SheetDescription>Add a new course here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseId" className="text-right">Course ID</Label>
                      <Input id="courseId" value={newCourse.courseId} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseTitle" className="text-right">Course Title</Label>
                      <Input id="courseTitle" value={newCourse.courseTitle} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="eligibleStaffs" className="text-right">Eligible Staffs</Label>
                      <Input id="eligibleStaffs" value={newCourse.eligibleStaffs} onChange={handleInputChange} className="col-span-3" placeholder="Separate names with commas" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="credit" className="text-right">Credit</Label>
                      <Input id="credit" value={newCourse.credit} onChange={handleInputChange} className="col-span-3" />
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
              <TableCaption>A list of your recent courses.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Course ID</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Eligible Staffs</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell className="font-medium">{course.courseId}</TableCell>
                    <TableCell>{course.courseTitle}</TableCell>
                    <TableCell>{course.eligibleStaffs.join(', ')}</TableCell>
                    <TableCell>{course.credit}</TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="mr-2" onClick={() => handleEdit(course)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Course</SheetTitle>
                            <SheetDescription>Edit the course details here. Click save when you're done.</SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="courseId" className="text-right">Course ID</Label>
                              <Input id="courseId" value={newCourse.courseId} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="courseTitle" className="text-right">Course Title</Label>
                              <Input id="courseTitle" value={newCourse.courseTitle} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="eligibleStaffs" className="text-right">Eligible Staffs</Label>
                              <Input id="eligibleStaffs" value={newCourse.eligibleStaffs} onChange={handleInputChange} className="col-span-3" placeholder="Separate names with commas" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="credit" className="text-right">Credit</Label>
                              <Input id="credit" value={newCourse.credit} onChange={handleInputChange} className="col-span-3" />
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      <Button variant="outline" onClick={() => handleDelete(course.courseId)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total Courses: {courses.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Card>
      </BlurFade>
    </div>
  );
};

export default Sub;
