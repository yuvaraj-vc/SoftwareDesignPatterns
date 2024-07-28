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
import { Edit, Trash, Send, Check } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([
    { requestNumber: "REQ001", type: "Query" },
    { requestNumber: "REQ002", type: "Leave" },
    { requestNumber: "REQ003", type: "Others" },
    { requestNumber: "REQ004", type: "Query" },
    { requestNumber: "REQ005", type: "Leave" },
    { requestNumber: "REQ006", type: "Others" },
    { requestNumber: "REQ007", type: "Query" },
  ]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [newRequest, setNewRequest] = useState({ requestNumber: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (requestNumber) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(request => request.requestNumber !== requestNumber));
      toast.success('Request deleted successfully!',{theme:'dark'});
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setIsEditing(true);
    setNewRequest(request); // Populate form with the request details
  };

  const handleAdd = () => {
    setEditingRequest(null);
    setIsEditing(false);
    setNewRequest({ requestNumber: '', type: '' });
  };

  const handleSaveChanges = () => {
    if (!newRequest.requestNumber || !newRequest.type) {
      toast.error('Please fill all required fields.',{theme:'dark'});
      return;
    }
    if (isEditing) {
      setRequests(requests.map(request => (request.requestNumber === editingRequest.requestNumber ? newRequest : request)));
      toast.success('Request edited successfully!',{theme:'dark'});
    } else {
      setRequests([...requests, newRequest]);
      toast.success('Request created successfully!',{theme:'dark'});
    }
    setEditingRequest(null);
    setIsEditing(false);
    setNewRequest({ requestNumber: '', type: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewRequest({ ...newRequest, [id]: value });
  };

  const handleSendRequest = (requestNumber) => {
    if (window.confirm('Are you sure you want to send this request?')){
    toast.success('Request sent successfully!',{theme:'dark'});
    setRequests(requests.map(request =>
      request.requestNumber === requestNumber
        ? { ...request, sent: true }
        : request
    ));
  }
  };

  const filteredRequests = requests.filter((request) =>
    request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='m-1 p-4 h-full w-full'>
      <ToastContainer/>
      <BlurFade delay={0.25} inView>
        <Card className=' bg-opacity-90 backdrop-blur-3xl h-full w-full justify-start flex flex-col items-start'>
          <CardHeader className='w-full flex flex-row justify-between items-center border'>
            <CardTitle>Requests</CardTitle>
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
                    <SheetTitle>Add Request</SheetTitle>
                    <SheetDescription>Add a new request here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="requestNumber" className="text-right">Request Number</Label>
                      <Input id="requestNumber" value={newRequest.requestNumber} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">Type</Label>
                      <Input id="type" value={newRequest.type} onChange={handleInputChange} className="col-span-3" />
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
          <Table>
            <TableCaption>A list of your recent requests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Request Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.requestNumber}>
                  <TableCell className="font-medium">{request.requestNumber}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="text-right">
                    {!request.sent ? (
                      <>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" className="mr-2" onClick={() => handleEdit(request)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Edit Request</SheetTitle>
                              <SheetDescription>Edit the request details here. Click save when you're done.</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="requestNumber" className="text-right">Request Number</Label>
                                <Input id="requestNumber" value={newRequest.requestNumber} onChange={handleInputChange} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Type</Label>
                                <Input id="type" value={newRequest.type} onChange={handleInputChange} className="col-span-3" />
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                        <Button variant="outline" className="mr-2" onClick={() => handleDelete(request.requestNumber)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={() => handleSendRequest(request.requestNumber)}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Sent</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Requests</TableCell>
                <TableCell className="text-right">{requests.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </BlurFade>
    </div>
  );
}

export default UserSub;
