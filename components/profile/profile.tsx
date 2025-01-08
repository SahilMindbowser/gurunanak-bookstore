"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrder } from "@/models/order/order.model";

export default function Profile() {
    const { data: session } = useSession();

    const user = session?.user;
    // const orders = user?.orders || [];
    const [orders, setOrders] = useState<IOrder[]>([]); // Store orders from API

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [contact, setContact] = useState(user?.contact || "")
    const [address, setAddress] = useState("");
    const [addresses, setAddresses] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/${user?.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setOrders(data.orders);
            } catch (err) {
                console.log(err)
            }
        };

        if (user?.id) {
            fetchUserData();
        }
    }, [user?.id]);

    const handleUpdateProfile = () => {
        alert("Profile updated successfully!");
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, address]);
        setAddress("");
        alert("Address added successfully!");
    };

    return (
        <div className="container min-h-screen mx-auto p-6">
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    {/* <TabsTrigger value="addresses">Addresses</TabsTrigger> */}
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium">Name:</p>
                                    <p className="text-gray-700">{name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Email:</p>
                                    <p className="text-gray-700">{email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Contact:</p>
                                    <p className="text-gray-700">{contact}</p>
                                </div>
                                {/* <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Edit Profile</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Profile</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                            />
                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                type="email"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleUpdateProfile}>Save Changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog> */}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Addresses Tab */}
                {/* <TabsContent value="addresses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Addresses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {addresses.length > 0 ? (
                                    addresses.map((addr, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b py-2"
                                        >
                                            <p className="text-gray-700">{addr}</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setAddresses(addresses.filter((_, i) => i !== index))}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No addresses added yet.</p>
                                )}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Add Address</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add Address</DialogTitle>
                                        </DialogHeader>
                                        <Textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                        />
                                        <DialogFooter>
                                            <Button onClick={handleAddAddress}>Add Address</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent> */}

                {/* Order History Tab */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orders.length > 0 ? (
                                    orders.map((order: IOrder, index: number) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-md bg-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Order Token: {order.orderToken}
                                                </p>
                                                <p className="text-base font-semibold text-gray-800">
                                                    {order?.items.map((item, index) => {
                                                        return (
                                                            <span key={index} className="text-sm">{item.title} x {item.quantity}</span>
                                                        )
                                                    })}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Date: {new Date(order?.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Price: ${order?.totalAmount.toFixed(2)}
                                                </p>
                                                <p
                                                    className={`text-sm font-medium mt-1 ${order.status === "Completed"
                                                        ? "text-green-600" :
                                                        order.status === "Cancelled" ?
                                                            "text-red-600" :
                                                            "text-yellow-600"
                                                        }`}
                                                >
                                                    Status: {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No orders found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
