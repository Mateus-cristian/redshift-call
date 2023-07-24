import React from 'react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@redshiftui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '../../../../../lib/axios'
import { toast, Toast, Toaster } from 'react-hot-toast'

const participantSchema = z.object({
    name: z.string().min(3, 'No mínimo 3 caracteres').nullable(),
    email: z.string().email("Digite um email válido").nullable(),
});


const confirmFormSchema = z.object({
    participants: z.array(participantSchema),
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
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })


    const { fields, append, remove } = useFieldArray<ConfirmFormData>({ control, name: 'participants' })

    const router = useRouter();
    const username = String(router.query.username)

    async function handleConfirmScheduling(data: ConfirmFormData) {

        const { participants, observations } = data;

        if (participants.length === 0) {
            toast.error('Deve haver pelo menos um participante')
            return;
        }


        if (participants.length > 0) {
            participants.forEach((item, index) => {
                if (!item.name) {
                    setError(`participants.${index}.name`, {
                        type: 'required',
                        message: 'Campo obrigatório'
                    });
                }

                if (!item.email) {
                    setError(`participants.${index}.email`, {
                        type: 'required',
                        message: 'Campo obrigatório'
                    });
                }
                return;
            })
        }


        await api.post(`users/${username}/schedule`, {
            participants,
            observations,
            date: schedulingDate
        })
        toast.success('Reunião marcada com sucesso')

        onCancelConfirmationStep()
    }

    const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
    const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

    return (
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <Toaster
                position='top-center'
                toastOptions={{
                    style: {
                        fontFamily: 'Roboto'
                    }
                }}
            />
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
            <Button type='button' onClick={() => {
                append({ name: null, email: null })
            }
            }>Adicionar convidado</Button>
            {
                fields.map((item, index) => {
                    return (
                        <div key={item.id}>
                            <Text size="sm" style={{ paddingBottom: 16, fontSize: 16, fontWeight: 'bold' }}>Convidado {index + 1}:</Text>
                            <label>
                                <Text size="sm">Nome completo</Text>
                                <Controller
                                    name={`participants.${index}.name`}
                                    control={control}
                                    render={(({ field }) => (
                                        <>
                                            <TextInput placeholder='Nome' onChange={(value) => field.onChange(value)} />
                                            {errors?.participants?.[index]?.name && (
                                                <FormError>{errors.participants?.[index]?.name?.message}</FormError>
                                            )}
                                        </>
                                    ))}
                                />
                            </label>

                            <label style={{ marginTop: 16 }}>
                                <Text size="sm">Endereço de email</Text>
                                <Controller
                                    name={`participants.${index}.email`}
                                    control={control}
                                    render={(({ field }) => (
                                        <>
                                            <TextInput placeholder='Email' onChange={(value) => field.onChange(value)} />
                                            {errors?.participants?.[index]?.email && (
                                                <FormError>{errors.participants?.[index]?.email?.message}</FormError>
                                            )}
                                        </>
                                    ))}
                                />
                            </label>
                            <div>
                                <Button style={{ marginTop: 16 }} type='button' onClick={() => {
                                    remove(index)
                                }}>remover convidado {index + 1}</Button>
                            </div>
                        </div>
                    )
                })
            }

            <label>
                <Text size="sm">Observações</Text>
                <TextArea {...register('observations')} />
            </label>

            <FormActions>
                <Button type='button' variant="tertiary" onClick={onCancelConfirmationStep}>Cancelar</Button>
                <Button type='submit' disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm >
    )
}

