import React, { useEffect, useState } from 'react'
import { Container, ContainerCalendar, ContainerEditPerfil, ContainerIcons, Form, FormAnnotation, HeaderPage, Loading, LoadingCircle, LoadingContainer } from './styles'
import { Button, Checkbox, Heading, MultiStep, Text, TextArea, TextInput } from '@redshiftui/react'
import { FormError, Header, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-to-minutes'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from "next-seo";
import { FaArrowLeft, FaSignOutAlt, FaUserEdit } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

import { resolve } from 'path'
import { EditPerfilTitle } from './styles'

interface Intervals {
    end_time_in_minutes: number;
    id: string;
    start_time_in_minutes: number;
    user_id: string;
    week_day: number
}

interface User {
    username: string;
    name: string;
    bio: string;
}

const updateRegisterFormSchema = z.object({
    username: z.string()
        .min(3, "Nome de usuário deve conter mais de 3 caracteres")
        .regex(/^([a-z\\-]+)$/i, "Nome de usuário deve ter apenas letras e hifens")
        .transform((username) => username.toLowerCase()),
    name: z.string()
        .min(3, "Nome de usuário deve conter mais de 3 caracteres"),
    bio: z.string()
})

const timeIntervalFormSchema = z.object({
    intervals: z.array(z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
    })).length(7)
        .transform(intervals => intervals.filter(interval => interval.enabled))
        .refine(intervals => intervals.length > 0,
            { message: 'Você precisa selecionar ao menos um dia da semana!' }
        )
        .transform(intervals => {
            return intervals.map(interval => {
                return {
                    weekDay: interval.weekDay,
                    startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
                    endTimeInMinutes: convertTimeStringToMinutes(interval.endTime)
                }
            })
        })
        .refine(intervals => {
            return intervals.every(interval => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
        }, {
            message: 'O horario de termino deve ser pelo uma hora distante do início'
        })
})

type TimeIntervalFormInput = z.input<typeof timeIntervalFormSchema>

type TimeIntervalsFormOutput = z.output<typeof timeIntervalFormSchema>

export default function Perfil() {

    const [loading, setLoading] = useState(true)

    const { setValue: setValueUser,
        handleSubmit: handleSubmitUser,
        register: registerUser,
        formState: { isSubmitting: isSubmittingUser, errors: errorsUser }
    } = useForm<User>({ resolver: zodResolver(updateRegisterFormSchema) })

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors }
    } = useForm<TimeIntervalFormInput>({
        defaultValues: {
            intervals: [
                { weekDay: 0, enabled: false, startTime: '00:00', endTime: '18:00' },
                { weekDay: 1, enabled: true, startTime: '00:00', endTime: '18:00' },
                { weekDay: 2, enabled: true, startTime: '00:00', endTime: '18:00' },
                { weekDay: 3, enabled: true, startTime: '00:00', endTime: '18:00' },
                { weekDay: 4, enabled: true, startTime: '00:00', endTime: '18:00' },
                { weekDay: 5, enabled: true, startTime: '00:00', endTime: '18:00' },
                { weekDay: 6, enabled: false, startTime: '00:00', endTime: '18:00' }
            ]
        },
        resolver: zodResolver(timeIntervalFormSchema)
    })

    const { fields, replace } = useFieldArray({
        control,
        name: 'intervals'
    })

    const router = useRouter();

    const wIntervals = watch('intervals')

    async function handleUpdateTimeIntervals(data: any) {
        const { intervals } = data as TimeIntervalsFormOutput

        await api.post('/users/update-time-intervals', {
            intervals,
        })

        toast('Intervalo de tempo atualizado', {
            icon: '📆',
            style: {
                fontFamily: 'Roboto'
            }
        });
    }

    async function submitUser(data: User) {
        await api.put('/users/profile', {
            bio: data.bio,
            username: data.username,
            name: data.name
        })
        toast('Usuario atualizado', {
            icon: '😀',
            style: {
                fontFamily: 'Roboto'
            }
        });
    }

    const weekDays = getWeekDays()

    async function getTimeIntervals() {
        const { data } = await api.get<Intervals[]>('/users/get-time-intervals',);

        const newInterval = fields.map((field) => {
            const findInterval = data.find((x) => x.week_day === field.weekDay);
            if (findInterval) {
                const startTime = String(findInterval.start_time_in_minutes / 60).padStart(2, '0') + ':00';
                const endTime = String(findInterval.end_time_in_minutes / 60).padEnd(2, '0') + ':00';
                return { ...field, startTime: startTime, endTime: endTime, enabled: true }
            }
            return { ...field, enabled: false }
        })

        replace(newInterval);
        setLoading(false)
    }

    async function getCurrentUser() {
        const username = router.query.username;

        const { data } = await api.post('/users/get-user', {
            username: username
        })

        if (data) {
            setValueUser('name', data.name);
            setValueUser('username', data.username);
            setValueUser('bio', data.bio);
        }
    }


    useEffect(() => {
        getTimeIntervals();
        getCurrentUser();
    }, [])

    return (
        <>
            <HeaderPage>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
                <ContainerIcons>
                    <FaArrowLeft color="#fff" size={36} style={{ cursor: 'pointer' }} title="scheduling"
                        onClick={() => {
                            const username = router.query.username;
                            router.replace(`/schedule/${username}?revalidate`)
                        }} />

                </ContainerIcons>
            </HeaderPage>
            <ContainerEditPerfil>
                <EditPerfilTitle>Editar Perfil</EditPerfilTitle>
                <Container>
                    <Form as="form" onSubmit={handleSubmitUser(submitUser)} >
                        <label>
                            <Text size="sm">Nome de usuário</Text>
                            <TextInput
                                prefix='redshift.com/'
                                placeholder='seu-usuario'
                                disabled
                                {...registerUser('username')}
                            />
                            {errorsUser.username && (
                                <FormError size="sm">
                                    {!!errorsUser.username.message}
                                </FormError>
                            )}
                        </label>

                        <label>
                            <Text size="sm">Nome completo</Text>
                            <TextInput
                                placeholder='seu-usuario'
                                {...registerUser('name')}
                            />
                            {errorsUser.name && (
                                <FormError size="sm">
                                    {!!errorsUser.name.message}
                                </FormError>
                            )}
                        </label>

                        <label>
                            <Text size="sm">Sobre você</Text>
                            <TextArea {...registerUser('bio')} />
                            <FormAnnotation size="sm">
                                Fale um pouco sobre você. Isto será exibido na sua página pessoal.
                            </FormAnnotation>
                        </label>

                        <Button type='submit' disabled={isSubmittingUser}>
                            Salvar
                        </Button>
                    </Form>


                    <ContainerCalendar>
                        <IntervalBox as="form" onSubmit={handleSubmit(handleUpdateTimeIntervals)}>
                            <IntervalContainer>
                                {loading ? (
                                    <LoadingContainer>
                                        <LoadingCircle />
                                        <Loading />
                                    </LoadingContainer>
                                ) : (
                                    fields.map((field, index) => (
                                        <IntervalItem key={field.id}>

                                            <IntervalDay>
                                                <Controller
                                                    name={`intervals.${index}.enabled`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            onCheckedChange={(checked) => {
                                                                field.onChange(checked === true)
                                                            }}
                                                            checked={field.value}
                                                        />
                                                    )}
                                                />
                                                <Text>{weekDays[field.weekDay]}</Text>
                                            </IntervalDay>

                                            <IntervalInputs>
                                                <TextInput
                                                    {...register(`intervals.${index}.startTime`)}
                                                    size='sm'
                                                    type="time"
                                                    step={60}
                                                    disabled={wIntervals[index].enabled === false}
                                                />
                                                <TextInput
                                                    {...register(`intervals.${index}.endTime`)}
                                                    size='sm'
                                                    type="time"
                                                    step={60}
                                                    disabled={wIntervals[index].enabled === false}
                                                />

                                            </IntervalInputs>
                                        </IntervalItem>
                                    ))
                                )}

                            </IntervalContainer>

                            {errors.intervals && (
                                <FormError>
                                    {errors.intervals.message}
                                </FormError>
                            )}

                            <Button type='submit' disabled={isSubmitting}>
                                Salvar
                            </Button>
                        </IntervalBox>
                    </ContainerCalendar>
                </Container>
            </ContainerEditPerfil >
        </>
    )
}

