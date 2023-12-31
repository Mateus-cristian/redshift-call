import React, { useEffect } from 'react'
import { Container, Header } from '../styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@redshiftui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { api } from '../../../lib/axios'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { NextSeo } from "next-seo";

export default function ConnectCalendar() {
    const session = useSession();
    const router = useRouter();

    const hasAuthError = !!router.query.error;
    const isSignIn = session.status === 'authenticated';

    async function handleConnectCalendar() {
        await signIn('google', { callbackUrl: '/register/connect-calendar' })
    }

    async function handleNavigateToNextStep() {
        await router.push('/register/time-intervals')
    }

    return (
        <>
            <NextSeo
                title='Conecte sua agenda do google | Redshift Call'
                noindex
            />
            <Container>
                <Header>
                    <Heading as="strong" >
                        Bem-vindo ao Redshift Call!
                    </Heading>
                    <Text>
                        conecte o seu calendário para verificar automaticamente as horas
                        ocupadas e os novos eventos à medida em que são agendados
                    </Text>

                    <MultiStep size={4} currentStep={2} />
                </Header>

                <ConnectBox>
                    <ConnectItem>
                        <Text>Google Calendar</Text>
                        {isSignIn ? (
                            <Button
                                variant="secondary"
                                size="sm"
                                disabled
                                onClick={() => signOut()}
                            >Conectado  <Check />
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={handleConnectCalendar}
                            >Conectar  <ArrowRight />
                            </Button>
                        )}

                    </ConnectItem>

                    {hasAuthError && (
                        <AuthError size='sm'>
                            Falha ao se conectar ao Google,verifique se você habilitou as
                            permissões de acesso ao Google Calendar
                        </AuthError>
                    )}

                    <Button onClick={handleNavigateToNextStep} type='submit' disabled={!isSignIn}>
                        Proxímo passo
                        <ArrowRight />
                    </Button>
                </ConnectBox>


            </Container>
        </>
    )
}

