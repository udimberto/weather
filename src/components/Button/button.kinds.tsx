import cn from 'classnames'

export const buttonKindsDefault = {
  disabled: cn(
    'text-neutral-300 bg-neutral-100 dark:bg-neutral-700',
  ),
  transparent: cn(
    'bg-transparent',
    'md:hover:bg-opacity-5 md:hover:bg-white md:dark:hover:bg-opacity-5 md:dark:hover:bg-black',
  ),
  white: cn(
    'text-black bg-white',
    'md:focus:hover:ring-transparent focus:ring-white',
    'md:hover:text-white md:hover:bg-transparent md:hover:border-white',
    'active:text-white-900 active:bg-neutral-200 active:border-neutral-200',
  ),
  black: cn(
    'text-white bg-black',
    'md:focus:hover:ring-transparent focus:ring-black',
    'md:hover:text-black md:hover:bg-transparent md:hover:border-black',
    'active:text-black active:bg-black/10 active:border-black/10',
  ),
  primary: cn(
    'text-white bg-primary-400',
    'md:focus:hover:ring-transparent focus:ring-primary-400',
    'md:hover:text-primary-400 md:hover:bg-transparent md:hover:border-primary-400',
    'active:text-primary-900 active:bg-primary-light active:border-primary-light',
  ),
  secondary: cn(
    'text-white bg-secondary-400',
    'md:focus:hover:ring-transparent focus:ring-secondary-400',
    'md:hover:text-secondary-400 md:hover:bg-transparent md:hover:border-secondary-400',
    'active:text-secondary-900 active:bg-secondary-light active:border-secondary-light',
  ),
  success: cn(
    'text-white bg-success-400',
    'md:focus:hover:ring-transparent focus:ring-success-400',
    'md:hover:text-success-400 md:hover:bg-transparent md:hover:border-success-400',
    'active:text-success-900 active:bg-success-light active:border-success-light',
  ),
  error: cn(
    'text-white bg-error-400',
    'md:focus:hover:ring-transparent focus:ring-error-400',
    'md:hover:text-error-400 md:hover:bg-transparent md:hover:border-error-400',
    'active:text-error-900 active:bg-error-light active:border-error-light',
  ),
  facebook: cn(
    'text-white bg-facebook',
    'md:focus:hover:ring-transparent focus:ring-facebook',
    'md:hover:text-facebook md:hover:bg-transparent md:hover:border-facebook',
    'active:text-facebook active:bg-facebook/10 active:border-facebook/10',
  ),
  whatsapp: cn(
    'text-white bg-whatsapp',
    'md:focus:hover:ring-transparent focus:ring-whatsapp',
    'md:hover:text-whatsapp md:hover:bg-transparent md:hover:border-whatsapp',
    'active:text-whatsapp active:bg-whatsapp/10 active:border-whatsapp/10',
  ),
} as any

export const buttonKindsOutlined = {
  disabled: cn(
    'text-neutral-500 border-neutral-400',
  ),
  transparent: cn(
    'md:hover:border-current md:dark:hover:border-current',
  ),
  white: cn(
    'text-white border-white md:hover:bg-white md:hover:bg-opacity-10',
  ),
  black: cn(
    'text-black border-black md:hover:bg-black md:hover:bg-opacity-10',
  ),
  primary: cn(
    'text-primary-400 border-primary-400 md:hover:bg-primary-400 md:hover:bg-opacity-5',
  ),
  secondary: cn(
    'text-secondary-400 border-secondary-400 md:hover:bg-secondary-400 md:hover:bg-opacity-5',
  ),
  success: cn(
    'text-success-400 border-success-400 md:hover:bg-success-400 md:hover:bg-opacity-5',
  ),
  error: cn(
    'text-error-400 border-error-400 md:hover:bg-error-400 md:hover:bg-opacity-5',
  ),
  facebook: cn(
    'text-facebook border-facebook md:hover:bg-facebook md:hover:bg-opacity-5',
  ),
  whatsapp: cn(
    'text-whatsapp border-whatsapp md:hover:bg-whatsapp md:hover:bg-opacity-5',
  ),
} as any
