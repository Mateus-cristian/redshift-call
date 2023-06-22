import { Heading, Text } from '@redshiftui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/calendarHome.png'

export default function Home() {
    return (
        <Container>
            <Hero>
                <Heading size="4xl">Agendamento desconplicado</Heading>
                <Text size='xl'>
                    Conecte seu calendário e
                    permita que as pessoas marquem agendamentos no seu tempo livre.
                </Text>
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
    )
}
