export interface EventBase {
  title: string
  description: string
  date: string
  type: string
  image_url?: string
  requirements_url?: string
}

export interface Event extends EventBase {
  id: string
}
