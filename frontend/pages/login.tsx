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
import { useContext } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useRouter } from 'next/router';
import bg from '../public/login-bg.jpg';

/**
 * Login page
 * Use mantine form to validate
 */
export default function LoginPage() {
    const { login } = useContext(ProfileContext)
    const router = useRouter();

    const form = useForm({
        initialValues: { email: '', password: '' },

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
                return null;
            },
        },
    });

    const handleSubmit = (values: any) => {
        login({ email: values?.email, password: values?.password })
    }

    return (
        <div
            className='flex justify-center items-stretch position-absolute bg-cover bg-center bg-no-repeat w-screen h-screen'
            style={{backgroundImage: `url(${bg.src})`}}>
            <Box className='w-3/5 position-absolutess mt-10'>
                <Container size={420} my={40}>
                    <Paper withBorder shadow="md" p={20} mt={30} radius="md">
                        <Image className="flex justify-center mx-auto -mb-24 -mt-20"
                               src='/../public/meoris.png'
                               width={300}
                               height={300}
                               alt="MindMatrix logo"
                        />
                        <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                autoFocus
                                name='email'
                                label="Email"
                                placeholder="example@domain.com"
                                required {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                label="Password"
                                name='password'
                                placeholder="Enter password"
                                required {...form.getInputProps('password')}
                                mt="md" />
                            <Button  variant="gradient" gradient={{ from: 'rgba(104, 152, 242, 1)', to: 'pink', deg: 196 }} type='submit' fullWidth mt="xl">
                                Login
                            </Button>
                            <Link href={'/register'}>
                                <Text className="-mb-3" size="sm" align="center" mt="md" variant="link">Don't have an account? Register now!</Text>
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
