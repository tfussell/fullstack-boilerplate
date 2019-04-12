import { updateLanguageServiceSourceFile } from "typescript";

//For relating these tables in the database, the formula is as follows:
//User.id === Shift.user_id === Location.user_id === Order.runner_id

export interface User {
  id: string
  signup_date: string
  first_name: string
  last_name: string
  phone_brand: string
  phone_carrier: string
  phone_model: string
  transport_mode: string
}

export interface Shift {
  id: string
  start: string
  stop: string
  user_id: string
  role: string //same as User.transport_mode
}

export interface Location {
  created_at: string
  latitude: number
  longitude: number
  speed: number
  user_id: number
  is_moving: boolean
  activity_type: string
  battery_level: number
}

/**
 *
 *
 * @export
 * @interface Order
 */
export interface Order {
  id: string
  runner_id: string //join
  picked_up_at: string
  dropoff_time: string
}
