import cn from 'classnames'
import { createElement, ReactNode } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'

export type FormControlProps = {
  id        : string
  bg       ?: string
  py       ?: string
  px       ?: string
  pl       ?: string
  pr       ?: string
  rounded  ?: string
  ringColor?: string

  isInvalid   ?: boolean
  locked      ?: boolean
  skipDarkMode?: boolean
  translucid  ?: boolean
  transparent ?: boolean

  fieldProps      ?: { [key: string] : any }
  fieldError      ?: ReactNode
  fieldErrorProps ?: { [key: string] : any }
  fieldHint       ?: ReactNode
  fieldHintProps  ?: { [key: string] : any }
  fieldLabel      ?: ReactNode
  fieldLabelProps ?: { [key: string] : any }
  fieldLegend     ?: ReactNode
  fieldLegendProps?: { [key: string] : any }

  IconBefore     ?: ReactNode
  iconBeforeProps?: { [key: string] : any }
  iconAfterProps ?: { [key: string] : any }
  IconAfter      ?: ReactNode
} & any

export const formControlDisabledBg     = 'bg-base-input-background-disabled cursor-not-allowed'
export const formControlDisabledBgDark = 'dark:bg-dark-base-input-background-disabled'
export const formControlDefaultBgDark  = 'dark:bg-dark-base-input-background'
export const formControlDefaultBg      = 'bg-base-input-background'
export const formControlDefaultPy      = 'py-2.5'
export const formControlDefaultPl      = 'pl-4'
export const formControlDefaultPr      = 'pr-4'
export const formControlDefaultRounded = 'rounded-md'

export const formControlDefaultIconClassName = cn(
  'absolute',
  'top-1/2',
  '-translate-y-1/2',
  'transition-all ease',
)
export const formControlDefaultIconProps     = {
  width : '1.25rem',
  height: '1.25rem',
} as any

export const formControlDefaultHelpersClassName = cn(
  'z-10',
  'relative',
  '-mt-2',
  'flex flex-1 flex-col',
  'pt-3 pb-1 px-1',
  'rounded-b-md',
  'text-xs',
)

export const formControlDefaultErrorClassName = cn(
  formControlDefaultHelpersClassName.replace('px-1', 'px-2'),
  'text-error-regular dark:text-white',
  'bg-error-crystal dark:bg-error-regular',
)

export const formControlDefaultHintClassName = cn(
  formControlDefaultHelpersClassName.replace('z-10', 'z-[9]'),
)

export function getFormControlTextColorClassNames({
  disabled,
  hasValue,
  skipDarkMode,
  translucid,
  transparent,
} : FormControlProps) : string {
  const textColorDefault = 'text-gray-700 dark:text-white placeholder-gray-500'

  return cn(
    transparent ? cn(
      'text-current',
    ) : (
      (disabled ? cn(
        'text-gray-300 placeholder-gray-300',
      ) : cn(
          translucid ? 'text-current' : (
            hasValue ? (
              (skipDarkMode ? 'text-current' : textColorDefault)
            ) : (
              'text-gray-500'
            )
          )
      ))
    )
  )
}

export function getFormControlBgColorClassNames({
  bg,
  disabled,
  skipDarkMode,
  translucid,
  transparent,
} : FormControlProps) : string {
  return cn(
    transparent ? (bg || '') : (
      translucid ? cn(
        (bg || (
          disabled ? cn(
            'bg-white/10',
            'dark:bg-black/10',
           ) : cn(
             'bg-white/25',
             'dark:bg-black/25',
           )
        )),
      ) : cn(
        (bg || cn(
          (disabled ? formControlDisabledBg : formControlDefaultBg),
          (!skipDarkMode && (disabled ? formControlDisabledBgDark : formControlDefaultBgDark)),
        ))
      )
    )
  )
}

export function getFormControlClassNames({
  as,
  disabled,
  className,

  hasValue,
  isInvalid,
  skipDarkMode,
  translucid,
  transparent,

  bg,
  py        = formControlDefaultPy,
  pl        = formControlDefaultPl,
  pr        = formControlDefaultPr,
  rounded   = formControlDefaultRounded,
  ringColor = 'focus:ring-primary-400',

  IconBefore,
  IconAfter,
} : FormControlProps) : string {
  const _pl = !IconBefore ? pl : cn('pl-10', pl)
  const _pr = !IconAfter ? pr : cn('pr-10', pr)
  const colorBg   = getFormControlBgColorClassNames({
    bg,
    disabled,
    hasValue,
    skipDarkMode,
    translucid,
    transparent,
  })
  const colorText = getFormControlTextColorClassNames({
    disabled,
    hasValue: (hasValue || as === 'select'),
    skipDarkMode,
    translucid,
    transparent,
  })

  return cn(
    'appearance-none',
    'opacity-100',
    'w-full',
    'flex flex-1 flex-col',
    'transition-all',
    'outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    (isInvalid ? 'focus:ring-error-400' : ringColor),
    py,
    _pl,
    _pr,
    rounded,
    colorBg,
    colorText,
    className,
  )
}

export function FormControl({
  as,
  id = '',
  children,
  value,
  disabled,
  className: inheritClassName,

  isInvalid,
  locked,
  skipDarkMode,
  translucid,
  transparent,

  bg,
  py,
  pl,
  pr,
  rounded,
  ringColor,

  fieldMargin = 'my-4',
  fieldProps  = {},
  fieldError,
  fieldErrorProps = {
    className: formControlDefaultErrorClassName,
  },
  fieldHint,
  fieldHintProps = {
    className: formControlDefaultHintClassName,
  },
  fieldLabel,
  fieldLabelProps = {},
  fieldLegend,
  fieldLegendProps = {},

  IconBefore,
  iconBeforeProps = formControlDefaultIconProps,
  iconAfterProps  = formControlDefaultIconProps,
  IconAfter: RawIconAfter,

  ...rest
} : FormControlProps) {
  const IconAfterLocked = !locked ? null : LockClosedIcon
  const IconAfter       = IconAfterLocked || RawIconAfter

  const hasValue  = !!value
  const colorText = getFormControlTextColorClassNames({
    as,
    disabled: (disabled || locked),
    hasValue,
    isInvalid,
    skipDarkMode,
    translucid,
    transparent,
  })
  const className = getFormControlClassNames({
    as,
    disabled: (disabled || locked),
    hasValue,
    isInvalid,
    skipDarkMode,
    translucid,
    transparent,
    bg,
    py,
    pl,
    pr,
    rounded,
    ringColor,
    IconBefore,
    IconAfter,
    className: inheritClassName,
  })
  const props     = {
    ...rest,
    id,
    value,
    disabled: (disabled || locked),
    className,
  }

  return (
    <fieldset
      id={id.concat('-fieldset')}
      {...fieldProps}
      className={cn(
        fieldMargin,
        fieldProps.className,
      )}
    >
      {fieldLegend && (
        <legend
          htmlFor={id}
          id={id.concat('-legend')}
          {...fieldLegendProps}
          className={cn(
            fieldLegendProps.className,
          )}
        >
          {fieldLegend}
        </legend>
      )}
      {fieldLabel && (
        <label
          htmlFor={id}
          id={id.concat('-label')}
          {...fieldLabelProps}
          className={cn(
            fieldLabelProps.className,
          )}
        >
          {fieldLabel}
        </label>
      )}
      <div
        id={id.concat('-wrapper')}
        className={cn(
          'z-20',
          'relative',
          'flex flex-col flex-1',
          colorText,
        )}
      >
        {IconBefore && (
          <IconBefore
            {...formControlDefaultIconProps}
            {...iconBeforeProps}
            className={cn(
              formControlDefaultIconClassName,
              (iconBeforeProps?.left || 'left-3'),
              (iconBeforeProps?.pointer || 'pointer-events-none'),
              formControlDefaultIconProps.className,
              iconBeforeProps.className,
            )}
          />
        )}
        {createElement(
          (as || 'input'),
          props,
          children
        )}
        {IconAfter && (
          <IconAfter
            {...formControlDefaultIconProps}
            {...iconAfterProps}
            className={cn(
              formControlDefaultIconClassName,
              (iconAfterProps?.right || 'right-3'),
              (iconAfterProps?.pointer || 'pointer-events-none'),
              formControlDefaultIconProps.className,
              iconAfterProps.className,
            )}
          />
        )}
      </div>
      {fieldError && (
        <label
          htmlFor={id}
          id={id.concat('-label')}
          {...fieldErrorProps}
          className={cn(
            formControlDefaultErrorClassName,
            fieldErrorProps.className,
          )}
        >
          {fieldError}
        </label>
      )}
      {fieldHint && (
        <label
          htmlFor={id}
          id={id.concat('-label')}
          {...fieldHintProps}
          className={cn(
            formControlDefaultHintClassName,
            fieldHintProps.className,
          )}
        >
          {fieldHint}
        </label>
      )}
    </fieldset>
  )
}
