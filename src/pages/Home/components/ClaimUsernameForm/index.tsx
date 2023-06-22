import React from 'react'
import { Form, FormAnnotation } from './styles'
import { Button, Text, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
    username: z.string()
        .min(3, "Nome de usuário deve conter mais de 3 caracteres")
        .regex(/^([a-z\\-]+)$/i, "Nome de usuário deve ter apenas letras e hifens")
        .transform((username) => username.toLowerCase())
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

function ClaimUsernameForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema)
    });

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        console.log(data)
    }

    return (
        <>
            <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    size="sm"
                    prefix='redshift.com/'
                    placeholder='seu-usuario'
                    {...register('username')} />
                <Button size="sm" type='submit'>
                    Reservar usuário
                    <ArrowRight />
                </Button>

            </Form>
            <FormAnnotation>
                {errors.username ? (
                    <Text size="sm" className='error'>
                        {errors.username.message}
                    </Text>
                ) : (
                    <Text size="sm">
                        Digite o nome do usuario desejado
                    </Text>
                )}
            </FormAnnotation>
        </>
    )
}

export default ClaimUsernameForm