import React from 'react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@redshiftui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
    name: z.string().min(3, 'No minímo 3 caracteres'),
    email: z.string().email("Digite um email válido"),
    observations: z.string().nullable()
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export default function ConfirmStep() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })

    function handleConfirmScheduling(data: ConfirmFormData) {
        console.log(data)
    }

    return (
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank />
                    22 de Setembro de 2022
                </Text>

                <Text>
                    <Clock />
                    18:00h
                </Text>
            </FormHeader>

            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder='seu nome' {...register('name')} />
                {errors.name && (<FormError>{errors.name.message}</FormError>)}
            </label>

            <label>
                <Text size="sm">Endereço de email</Text>
                <TextInput placeholder='email@com.br'  {...register('email')} />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </label>

            <label>
                <Text size="sm">Observações</Text>
                <TextArea {...register('observations')} />
            </label>

            <FormActions>
                <Button type='button' variant="tertiary">Cancelar</Button>
                <Button type='submit' disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}

