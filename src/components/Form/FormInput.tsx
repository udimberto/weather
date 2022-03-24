import { FormControl, FormControlProps } from './FormControl'

export function FormInput({
  type = 'text',
  ...rest
} : FormControlProps) {
  return (
    <FormControl
      type={type}
      {...rest}
    />
  )
}
