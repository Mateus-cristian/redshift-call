import React, { useEffect } from 'react'
import { Container, Form, FormError, Header } from '../styles'
import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { FormAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'
import { api } from '../../../lib/axios'
import { NextSeo } from "next-seo";

const updateProfileFormSchema = z.object({
    bio: z.string()
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>


function UpdateProfile() {

    const {
        register,
        handleSubmit,

    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileFormSchema),

    })

    const session = useSession()
    const router = useRouter()

    async function handleUpdateProfile(data: UpdateProfileFormData) {
        await api.put('/users/profile', {
            bio: data.bio
        })

        await router.push(`/schedule/${session.data?.user.username}`)
    }

    return (
        <>
            <NextSeo
                title='Atualize seu perfil | Redshift Call'
                noindex
            />
            <Container>
                <Header>
                    <Heading as="strong" >
                        Bem-vindo ao Redshift Call!
                    </Heading>
                    <Text>
                        Precisamos de algumas informações para criar seu perfil! Ah, você pode
                        editar essas informações depois.
                    </Text>

                    <MultiStep size={4} currentStep={4} />
                </Header>

                <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
                    <label>
                        <Text size="sm">Foto de perfil</Text>
                        <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />
                    </label>

                    <label>
                        <Text size="sm">Sobre você</Text>
                        <TextArea {...register('bio')} />
                        <FormAnnotation size="sm">
                            Fale um pouco sobre você. Isto será exibido na sua página pessoal.
                        </FormAnnotation>
                    </label>


                    <Button type='submit'>
                        Finalizar
                        <ArrowRight />
                    </Button>
                </ProfileBox>
            </Container>
        </>
    )
}

export default UpdateProfile;


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const session = await getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res)
    );

    return {
        props: {
            session
        }
    }
}