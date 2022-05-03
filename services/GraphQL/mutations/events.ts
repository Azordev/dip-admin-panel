import { gql } from '@apollo/client'

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String, $date: String!, $type: String!, image_url: String, requirements_url: String) {
    insert_events_one(object: { date: $date, title: $title, description: $description, type: $type, is_active: true, requirements_url: requirements_url, image_url: image_url }) {
      affected_rows
    }
  }
`

// update event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: String!, $title: String, $description: String, $date: String, $type: String, image_url: String, requirements_url: String) {
    update_events_by_pk(pk_columns: { id: $id }, _set: { date: $date, title: $title, description: $description, type: $type, requirements_url: requirements_url, image_url: image_url }) {
      affected_rows
    }
  }
`

// hide event
export const HIDE_EVENT = gql`
  mutation HideEvent($id: String!) {
    update_events_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      affected_rows
    }
  }
`

// member inscription in event
export const CREATE_MEMBER_INSCRIPTION = gql`
  mutation ($event_id: String!, $member_id: String!) {
    insert_inscriptions_one(object: { event_id: $event_id, member_id: $member_id }) {
      affected_rows
    }
  }
`

// member cancellation in event
export const CANCEL_MEMBER_INSCRIPTION = gql`
  mutation ($event_id: String!, $member_id: String!) {
    delete_inscriptions_by_pk(pk_columns: { event_id: $event_id, member_id: $member_id }) {
      affected_rows
    }
  }
`
