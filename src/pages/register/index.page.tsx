import React, { useEffect } from 'react'
import { Container, Form, FormError, Header } from './styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
    username: z.string()
        .min(3, "Nome de usuário deve conter mais de 3 caracteres")
        .regex(/^([a-z\\-]+)$/i, "Nome de usuário deve ter apenas letras e hifens")
        .transform((username) => username.toLowerCase()),
    name: z.string()
        .min(3, "Nome de usuário deve conter mais de 3 caracteres")

})

type RegisterFormData = z.infer<typeof registerFormSchema>


function Register() {

    const { register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),

    })

    const router = useRouter()

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post('/users', {
                name: data.name,
                username: data.username
            })


            await router.push('/register/connect-calendar');
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return;
            }

            console.log(err)
        }
    }

    useEffect(() => {
        if (router.query?.username) {
            const usernameParameter = String(router.query.username)
            setValue('username', usernameParameter);
        }
    }, [router.query?.username])

    return (
        <Container>
            <Header>
                <Heading as="strong" >
                    Bem-vindo ao Redshift Call!
                </Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você pode
                    editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput
                        prefix='redshift.com/'
                        placeholder='seu-usuario'
                        {...register('username')}
                    />
                    {errors.username && (
                        <FormError size="sm">
                            {errors.username.message}
                        </FormError>
                    )}
                </label>

                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput
                        placeholder='seu-usuario'
                        {...register('name')}
                    />
                    {errors.name && (
                        <FormError size="sm">
                            {errors.name.message}
                        </FormError>
                    )}
                </label>

                <Button type='submit'>
                    Proxímo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}

export default Register