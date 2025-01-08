'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import axios from 'axios';
import { toast } from 'sonner';
import { Pen, Trash } from 'lucide-react';
import debounce from 'lodash/debounce';

type User = {
    _id: string;
    name: string;
    email: string;
    contact: string;
    role: string;
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (query = ''): Promise<void> => {
        try {
            const response = await axios.get<User[]>(`/api/user?email=${query}`);
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch users. Please try again.');
        }
    };

    const handleSearch = debounce((value: string) => {
        fetchUsers(value);
    }, 300);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleUpdateUser = async (userId: string, updatedData: Partial<User>): Promise<void> => {
        try {
            await axios.put(`/api/user/${userId}`, updatedData);
            toast.success('User updated successfully!');
            fetchUsers();
            setIsEditDialogOpen(false);
        } catch (error) {
            toast.error('Failed to update user. Please try again.');
        }
    };

    const handleDeleteUser = async (userId: string): Promise<void> => {
        try {
            await axios.delete(`/api/user/${userId}`);
            toast.success('User deleted successfully!');
            fetchUsers();
            setIsDeleteDialogOpen(false);
        } catch (error) {
            toast.error('Failed to delete user. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <Input
                type="text"
                placeholder="Search by email"
                value={searchTerm}
                onChange={onSearchInputChange}
                className="mb-4"
            />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.contact}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className='flex space-x-2'>
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                            <Pen />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit User</DialogTitle>
                                        </DialogHeader>
                                        <Input
                                            placeholder="Name"
                                            defaultValue={user.name}
                                            onChange={(e) =>
                                                setSelectedUser({ ...user, name: e.target.value })
                                            }
                                            className="mb-2"
                                        />
                                        <Input
                                            placeholder="Email"
                                            defaultValue={user.email}
                                            onChange={(e) =>
                                                setSelectedUser({ ...user, email: e.target.value })
                                            }
                                            className="mb-2"
                                        />
                                        <Input
                                            placeholder="Contact"
                                            defaultValue={user.contact}
                                            onChange={(e) =>
                                                setSelectedUser({ ...user, contact: e.target.value })
                                            }
                                            className="mb-2"
                                        />
                                        <DialogFooter>
                                            <Button
                                                onClick={() =>
                                                    handleUpdateUser(user._id, selectedUser as Partial<User>)
                                                }
                                            >
                                                Save
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className="ml-2">
                                            <Trash />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Delete</DialogTitle>
                                        </DialogHeader>
                                        <p>Are you sure you want to delete this user?</p>
                                        <DialogFooter>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDeleteUser(user._id)}
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
