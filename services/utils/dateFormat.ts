export const formatDate = (date: string, time: string) => `${date}T${time}:00Z`

export const readableDate = (date: string) => new Date(date).toLocaleDateString()
