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

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invoices, setInvoices] = useState([
    { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
    { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
    { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
  ]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ invoice: '', paymentStatus: '', totalAmount: '', paymentMethod: '' });

  const handleDelete = (invoiceNumber) => {
    setInvoices(invoices.filter(invoice => invoice.invoice !== invoiceNumber));
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setIsEditing(true);
    setNewInvoice(invoice); // Populate form with the invoice details
  };

  const handleAdd = () => {
    setEditingInvoice(null);
    setIsEditing(false);
    setNewInvoice({ invoice: '', paymentStatus: '', totalAmount: '', paymentMethod: '' });
  };

  const handleSaveChanges = () => {
    if (isEditing) {
      setInvoices(invoices.map(invoice => (invoice.invoice === editingInvoice.invoice ? newInvoice : invoice)));
    } else {
      setInvoices([...invoices, newInvoice]);
    }
    setEditingInvoice(null);
    setIsEditing(false);
    setNewInvoice({ invoice: '', paymentStatus: '', totalAmount: '', paymentMethod: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewInvoice({ ...newInvoice, [id]: value });
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.totalAmount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='m-1 p-4 h-full w-full'>
      <BlurFade delay={0.25} inView>
        <Card className=' bg-opacity-90 backdrop-blur-3xl h-full w-full justify-start flex flex-col items-start'>
          <CardHeader className='w-full flex flex-row justify-between items-center border'>
            <CardTitle className=''>Users</CardTitle>
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
                    <SheetTitle>{isEditing ? 'Edit Invoice' : 'Add Invoice'}</SheetTitle>
                    <SheetDescription>
                      {isEditing ? 'Make changes to the invoice here. Click save when you\'re done.' : 'Add a new invoice.'}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="invoice" className="text-right">
                        Invoice
                      </Label>
                      <Input id="invoice" value={newInvoice.invoice} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="paymentStatus" className="text-right">
                        Status
                      </Label>
                      <Input id="paymentStatus" value={newInvoice.paymentStatus} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="paymentMethod" className="text-right">
                        Method
                      </Label>
                      <Input id="paymentMethod" value={newInvoice.paymentMethod} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalAmount" className="text-right">
                        Amount
                      </Label>
                      <Input id="totalAmount" value={newInvoice.totalAmount} onChange={handleInputChange} className="col-span-3" />
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" className="mr-2" onClick={() => handleEdit(invoice)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => handleDelete(invoice.invoice)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </BlurFade>
    </div>
  );
};

export default AdminUsers;
