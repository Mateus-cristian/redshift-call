import React from 'react'
import { Container, Form, Header } from './styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'
function Register() {
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

            <Form as="form">
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput prefix='redshift.com/' placeholder='seu-usuario' />
                </label>

                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput placeholder='seu-usuario' />
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