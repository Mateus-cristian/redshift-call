import React from 'react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@redshiftui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '../../../../../lib/axios'

const confirmFormSchema = z.object({
    name: z.string().min(3, 'No minímo 3 caracteres'),
    email: z.string().email("Digite um email válido"),
    observations: z.string().nullable()
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
    schedulingDate: Date;
    onCancelConfirmationStep: () => void;
}

export default function ConfirmStep({ schedulingDate, onCancelConfirmationStep }: ConfirmStepProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })

    const router = useRouter();
    const username = String(router.query.username)

    async function handleConfirmScheduling(data: ConfirmFormData) {

        const { email, name, observations } = data;

        await api.post(`users/${username}/schedule`, {
            name,
            email,
            observations,
            date: schedulingDate
        })

        onCancelConfirmationStep()
    }

    const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
    const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

    return (
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank />
                    {describeDate}
                </Text>

                <Text>
                    <Clock />
                    {describeTime}
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
                <Button type='button' variant="tertiary" onClick={onCancelConfirmationStep}>Cancelar</Button>
                <Button type='submit' disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}

