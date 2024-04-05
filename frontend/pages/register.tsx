import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Divider,
    Box
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import {useContext, useEffect, useState} from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useRouter } from 'next/navigation';
import bg from '../public/login-bg.jpg';

/**
 * Login page
 * Use mantine form to validate
 */
export default function RegisterPage() {
    const { register } = useContext(ProfileContext);
    const [refreshBg, setRefreshBg] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setRefreshBg(refreshBg + 1);
    }, []);

    const form = useForm({
        initialValues: { email: '', password: '', firstName: '', lastName: '', phoneNumber: ''},

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => {
                if (!value) {
                    return 'Email is required';
                }
                if (value !== '' && !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                    return 'Please enter a valid email address.';
                }
                return null;
            },
            password: (value) => {
                if (!value) {
                    return 'Password is required';
                }
                if (value?.length <= 5) {
                    return 'Password must be at least 5 characters long';
                }
                return null;
            },
            firstName: (value) => {
                if (!value) {
                    return 'First name is required';
                }
                if (value?.length <= 5) {
                    return 'First name must be at least 5 characters long';
                }
                return null;
            },
            lastName: (value) => {
                if (!value) {
                    return 'Last name is required';
                }
                if (value?.length <= 5) {
                    return 'Last name must be at least 5 characters long';
                }
                return null;
            },
            phoneNumber: (value) => {
                if (!value) {
                    return 'Phone number is required';
                }
                if (value?.length <= 5) {
                    return 'Phone number must be at least 5 characters long';
                }
                if (value !== '' && !value.match(/^\d{4} \d{3} \d{3}$/g)) {
                    return 'Please enter a xxxx xxx xxx phone number.';
                }
                return null;
            }
        },
    });

    const handleSubmit = (values: any) => {
        register({ email: values?.email, password: values?.password, firstName: values?.firstName, lastName: values?.lastName, phoneNumber: values?.phoneNumber?.trim() })
    }

    return (
        <div
            key={refreshBg}
            className='flex justify-center items-stretch position-absolute w-screen h-screen bg-cover bg-center bg-no-repeat'
            style={{backgroundImage: `url(${bg.src})`, width: '100%', height: '100&'}}>
            <Box className='w-[800px] position-absolutess mt-10'>
                <Container size={420} my={40}>
                    <Paper withBorder shadow="md" p={20} radius="md">

                        <Image className="flex justify-center mx-auto -mb-24 -mt-20"
                               src='/../public/meoris.png'
                               width={300}
                               height={300}
                               alt="MindMatrix logo"
                        />

                        <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                autoFocus
                                name='firstName'
                                label="First Name"
                                placeholder="John"
                                required {...form.getInputProps('firstName')}
                            />
                            <TextInput
                                name='lastName'
                                label="Last Name"
                                placeholder="Doe"
                                required {...form.getInputProps('lastName')}
                            />
                            <TextInput
                                name='email'
                                label="Email"
                                placeholder="example@domain.com"
                                required {...form.getInputProps('email')}
                            />
                            <TextInput
                                name='phoneNumber'
                                label="Phone Number"
                                placeholder="xxxx xxx xxx"
                                required {...form.getInputProps('phoneNumber')}
                            />
                            <PasswordInput
                                label="Password"
                                name='password'
                                placeholder="Enter password"
                                required {...form.getInputProps('password')}
                                mt="md" />
                            <Button  variant="gradient" gradient={{ from: 'rgba(104, 152, 242, 1)', to: 'pink', deg: 196 }} type='submit' fullWidth mt="xl">
                                Register now
                            </Button>
                            <Link href={'/login'}>
                                <Text className="-mb-3" size="sm" align="center" mt="md" variant="link">Do you already have an account? Login here.</Text>
                            </Link>
                            <Link href={'/start/dashboard'}>
                                <Text size="sm" align="center" mt="md" variant="link">Go back to the home page.</Text>
                            </Link>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </div>
    );
}
