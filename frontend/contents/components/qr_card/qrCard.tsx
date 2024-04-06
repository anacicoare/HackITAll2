import React, { useState } from 'react';
import { Card, Text, Button, Group, TextInput, Box } from '@mantine/core';
import QrCode from "@/contents/components/QRCode/qrCode";

export default function QrCard() {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [qrCodeValue, setQrCodeValue] = useState(''); // State to hold the QR code value
    const [qrCodeVisible, setQrCodeVisible] = useState(false); // State to control the visibility of the QR code
    const [error, setError] = useState(''); // State to hold validation error message

    // Function to handle the input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (error) setError(''); // Clear error message when user starts typing
    };

    // Function to validate and generate the QR code based on the input value
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Check if inputValue is not empty and is a number
        if (inputValue.trim() !== '' && !isNaN(inputValue)) {
            setQrCodeValue(inputValue); // Set the QR code value to the current input value
            setQrCodeVisible(true); // Show the QR code
        } else {
            setError('Please enter a valid number.'); // Set error message
        }
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col items-center">
            <Group position="apart" mt="md" mb="xs" style={{ width: '100%' }}>
                <Text weight={500}>Customer Scan</Text>
            </Group>

            <Text size="sm" color="dimmed" mb="md">
                Enter the price to generate the QR code so that the customer will be able to scan it.
            </Text>

            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center">
                {/* Input field for the user to enter the QR code value */}
                <TextInput
                    placeholder="Enter value for QR code"
                    value={inputValue}
                    onChange={handleInputChange}
                    mb="md"
                    error={error} // Display validation error
                />

                <Button
                    type="submit"
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                >
                    Generate QR Code
                </Button>
            </form>

            {/* Conditionally render the QrCode component */}
            {qrCodeVisible && <div className="flex justify-center w-full mt-4"><QrCode value={qrCodeValue} /></div>}
        </Card>
    );
}
