import React, { useEffect } from 'react'
import { Container, Header } from '../styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'
import { api } from '../../../lib/axios'
import { ConnectBox, ConnectItem } from './styles'
import { useSession, signIn, signOut } from "next-auth/react"


export default function ConnectCalendar() {
    const session = useSession();



    return (
        <Container>
            <Header>
                <Heading as="strong" >
                    Bem-vindo ao Redshift Call!
                </Heading>
                <Text>
                    conecte o seu calendário para verificar automaticamente as horas
                    ocupadas e os novos eventos aá medida em que são agendados
                </Text>

                <MultiStep size={4} currentStep={2} />
            </Header>

            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    <Button
                        variant="secondary"
                        onClick={() => signIn('google')}
                    >Conectar  <ArrowRight /></Button>
                </ConnectItem>




                <Button type='submit'>
                    Proxímo passo
                    <ArrowRight />
                </Button>
            </ConnectBox>


        </Container>
    )
}

