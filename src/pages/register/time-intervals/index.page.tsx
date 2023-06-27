import React, { useEffect } from 'react'
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from '@redshiftui/react'
import { Container, FormError, Header, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-to-minutes'

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

export default function TimeIntervals() {

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

    const { fields } = useFieldArray({
        control,
        name: 'intervals'
    })

    const wIntervals = watch('intervals')

    async function handleSetTimeIntervals(data: any) {
        const formData = data as TimeIntervalsFormOutput
        console.log(formData)
    }

    const weekDays = getWeekDays()

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

                <MultiStep size={4} currentStep={3} />
            </Header>


            <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
                <IntervalContainer>

                    {fields.map((field, index) => (
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
                    ))}

                </IntervalContainer>

                {errors.intervals && (
                    <FormError>
                        {errors.intervals.message}
                    </FormError>
                )}

                <Button type='submit' disabled={isSubmitting}>
                    Proxímo passo
                    <ArrowRight />
                </Button>
            </IntervalBox>

        </Container>
    )
}

