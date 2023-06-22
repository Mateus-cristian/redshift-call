import React from 'react'
import { Form } from './styles'
import { Button, TextInput } from '@redshiftui/react'
import { ArrowRight } from 'phosphor-react'

function ClaimUsernameForm() {
    return (
        <Form as='form'>
            <TextInput
                size="sm"
                prefix='redshift.com/'
                placeholder='seu-usuario' />
            <Button size="sm" type='submit'>
                Reservar usuário
                <ArrowRight />
            </Button>
        </Form>
    )
}

export default ClaimUsernameForm