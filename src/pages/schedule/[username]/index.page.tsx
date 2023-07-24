import { Avatar, Heading, Text } from "@redshiftui/react";
import { Container, ContainerIcons, HeaderPage, UserHeader } from "./styles";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../../lib/prisma";
import ScheduleForm from "./ScheduleForm/index.page";
import { NextSeo } from "next-seo";
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa'
import { signOut } from "next-auth/react"
import { useRouter } from "next/router";



interface ScheduleProps {
    user: {
        name: string;
        bio: string;
        avatarUrl: string;
        username: string;
    }
}

export default function Schedule({ user }: ScheduleProps) {

    const router = useRouter()

    async function handleSignOut() {
        await signOut({ callbackUrl: '/' });
    }

    async function handleEditPerfil() {
        await router.push(`/edit-perfil/${user.username}`)
    }


    return (
        <>
            <NextSeo
                title={`Agendar com ${user.name} | Redshift Call`}
            />
            <HeaderPage>
                <ContainerIcons>
                    <FaUserEdit color="#fff" size={36} style={{ cursor: 'pointer' }} title="editar perfil" onClick={handleEditPerfil} />
                    <FaSignOutAlt color="#fff" size={36} style={{ cursor: 'pointer' }} title="log out" onClick={handleSignOut} />
                </ContainerIcons>
            </HeaderPage>
            <Container>
                <UserHeader>
                    <Avatar src={user.avatarUrl} />
                    <Heading>{user.name}</Heading>
                    <Text>{user.bio}</Text>
                </UserHeader>

                <ScheduleForm />
            </Container>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const username = String(params?.username);

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user: {
                name: user.name,
                bio: user.bio,
                avatarUrl: user.avatar_url,
                username: user.username
            }
        },
    }
}