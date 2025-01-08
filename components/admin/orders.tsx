'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { Pen, Trash } from 'lucide-react';
import debounce from 'lodash/debounce';

type Order = {
    _id: string;
    user: { name: string; email: string; contact?: string };
    orderToken: string;
    deliveryOption: 'pickup' | 'delivery';
    status: 'Pending' | 'Completed' | 'Cancelled';
};

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);
    const [editDialogOrderId, setEditDialogOrderId] = useState<string | null>(null);
    const [deleteDialogOrderId, setDeleteDialogOrderId] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (query = ''): Promise<void> => {
        try {
            const response = await axios.get<Order[]>(`/api/order?query=${query}`);
            setOrders(response.data);
        } catch (error) {
            toast.error('Failed to fetch orders. Please try again.');
        }
    };

    const handleSearch = debounce((value: string) => {
        fetchOrders(value);
    }, 300);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleUpdateOrder = async (orderId: string, updatedData: Partial<Order>): Promise<void> => {
        try {
            await axios.put(`/api/order/${orderId}`, updatedData);
            toast.success('Order updated successfully!');
            fetchOrders();
            setEditDialogOrderId(null);
        } catch (error) {
            toast.error('Failed to update order. Please try again.');
        }
    };

    const handleDeleteOrder = async (orderId: string): Promise<void> => {
        try {
            await axios.delete(`/api/order/${orderId}`);
            toast.success('Order deleted successfully!');
            fetchOrders();
            setDeleteDialogOrderId(null);
        } catch (error) {
            toast.error('Failed to delete order. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <Input
                type="text"
                placeholder="Search orders by user email or token"
                value={searchTerm}
                onChange={onSearchInputChange}
                className="mb-4"
            />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Order Token</TableHead>
                        <TableHead>Delivery Option</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span className="cursor-pointer">
                                                {order.user.email}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Name: {order.user.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                            <TableCell>{order.orderToken}</TableCell>
                            <TableCell>{order.deliveryOption}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Dialog open={editDialogOrderId === order._id} onOpenChange={(open) => open ? setEditDialogOrderId(order._id) : setEditDialogOrderId(null)}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                            <Pen />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Order</DialogTitle>
                                        </DialogHeader>
                                        <Select
                                            defaultValue={order.status}
                                            onValueChange={(value) =>
                                                setSelectedOrder({
                                                    ...order,
                                                    status: value as Order['status'],
                                                })
                                            }
                                        >
                                            <label className='text-sm'>Status</label>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Completed">Completed</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <DialogFooter>
                                            <Button
                                                onClick={() =>
                                                    handleUpdateOrder(order._id, selectedOrder as Partial<Order>)
                                                }
                                            >
                                                Save
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={deleteDialogOrderId === order._id} onOpenChange={(open) => open ? setDeleteDialogOrderId(order._id) : setDeleteDialogOrderId(null)}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className="ml-2">
                                            <Trash />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Delete</DialogTitle>
                                        </DialogHeader>
                                        <p>Are you sure you want to delete this order?</p>
                                        <DialogFooter>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDeleteOrder(order._id)}
                                            >
                                                Yes, Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
