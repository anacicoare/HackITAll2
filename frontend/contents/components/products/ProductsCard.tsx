import { useContext, useEffect, useState } from "react";
import { ProductsServices } from "@/services/products/products";
import {
    Card,
    Text,
    Button,
    Modal,
    TextInput,
    Table,
    ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";
import React from "react";

export default function ProductsCard() {
    const [products, setProducts] = useState<any[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: { name: '', price: '', carbon_footprint: '' },

        validate: {
            name: (value) => (!value ? 'Please enter a product name.' : null),
            price: (value) => (!value ? 'Please enter a price.' : null),
            carbon_footprint: (value) => null,
        },
    });

    // Funcția de ștergere a unui produs
    const handleDelete = (name:any) => {
        ProductsServices.deleteProduct(name).then(() => {
            // Reîmprospătați lista de produse după ștergere
            return ProductsServices.getProducts();
        }).then((res) => {
            // Actualizează lista de produse cu noile date
            setProducts(res.data);
        }).catch(error => console.error("Eroare la ștergerea produsului:", error));
    };


    const handleSubmit = (values: any) => {
        ProductsServices.addProduct(values).then(() => {
            close();
            return ProductsServices.getProducts();
        }).then((res) => {
            setProducts(res.data);
        }).catch(error => console.error(error));
    };

    useEffect(() => {
        ProductsServices.getProducts().then((res) => {
            setProducts(res.data);
        }).catch(error => console.error(error));
    }, []);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={'w-full md:w-[600px]'}>
            <Text weight={600} size="lg" mb="md">My Products</Text>
            <Button onClick={open} mb="md">Add Product</Button>

            {/* Afișarea produselor într-un tabel */}
            <ScrollArea>
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Carbon Footprint</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.carbon_footprint || 'N/A'}</td>
                            <td>
                                <Button
                                    onClick={() => handleDelete(product.id)} // Presupunem că fiecare produs are un `id` unic
                                    fullWidth
                                    variant="outline"
                                    color="red"
                                    size="xs">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </ScrollArea>

            {/* Modal pentru adăugarea unui nou produs */}
            <Modal size="sm" opened={opened} onClose={close} title="Add product" centered>
                <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput autoFocus {...form.getInputProps('name')} label="Product Name" required />
                    <TextInput {...form.getInputProps('price')} label="Price" required />
                    <TextInput {...form.getInputProps('carbon_footprint')} label="Carbon Footprint" />
                    <Button variant="gradient" gradient={{ from: 'rgba(104, 152, 242, 1)', to: 'pink', deg: 196 }} type="submit" fullWidth mt="xl">
                        Add Product
                    </Button>
                </form>
            </Modal>
        </Card>
    );
}
