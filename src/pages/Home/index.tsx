import { Heading, Text } from '@redshiftui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import previewImage from '../../assets/calendarHome.png'
import ClaimUsernameForm from './components/ClaimUsernameForm'

export default function Home() {
    return (
        <>
            <NextSeo
                title='Descomplique sua agenda | Redshift Call'
                description='conecte o seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre'
            />
            <Container>
                <Hero>
                    <Heading size="4xl">Agendamento descomplicado</Heading>
                    <Text size='xl'>
                        Conecte seu calendário e
                        permita que as pessoas marquem agendamentos no seu tempo livre.
                    </Text>

                    <ClaimUsernameForm />
                </Hero>

                <Preview>
                    <Image
                        src={previewImage}
                        alt='Calendário simbolizando a aplicação em andamento'
                        height={400}
                        quality={100}
                        priority
                    />
                </Preview>
            </Container>
        </>
    )
}
