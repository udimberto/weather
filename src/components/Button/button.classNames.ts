import classNames from 'classnames'
import { ButtonProps } from './button.props'
import { buttonKindsDefault, buttonKindsOutlined } from './button.kinds'

export function getButtonClassNames({
  className,
  disabled,

  isOutlined,
  cssKind,

  cssAlignItems,
  cssBlock,
  cssDisplay,
  cssJustifyItems,
  cssPadding,
  cssRingOffset,
  cssRounded,
  cssSize,
  cssTransition,
  cssWeight,
} : ButtonProps) : string {
  const themeDefault         = (!disabled && !cssKind && !isOutlined && classNames(
    'bg-black/5 dark:bg-black/10',
    'active:bg-black/10 dark:active:bg-black/20',
    'focus:bg-black/10 dark:focus:bg-black/20',
    'hover:bg-black/10 dark:hover:bg-black/20',
  ))
  const themeDefaultOutlined = (!cssKind && isOutlined && !disabled && themeDefault)
  const themeKind            = (!isOutlined && buttonKindsDefault[disabled ? 'disabled' : (cssKind || '')])
  const themeKindOutlined    = (isOutlined && buttonKindsOutlined[disabled ? 'disabled' : (cssKind || '')])

  const xs     = cssSize === 'xs'
  const small  = cssSize === 'sm'
  const medium = cssSize === 'md'
  const large  = cssSize === 'lg'

  const finalPadding = (
    cssPadding || (
      xs ? 'py-0.5 px-1.5' : (
        small ? 'py-1 px-3' : (
          medium ? 'py-1.5 px-3' : (
            large ? 'py-2.5 px-6' : 'py-2 px-6'
          )
        )
      )
    )
  )

  return classNames(
    className,
    'btn',
    (!cssBlock ? (cssDisplay || 'inline-flex') : 'flex w-full'),
    (cssAlignItems || 'items-center'),
    (cssJustifyItems || 'justify-center'),
    'border-2',
    'border-transparent',
    (cssRounded || 'rounded-full'),
    finalPadding,
    (cssWeight || 'font-bold'),
    (xs ? 'text-sm' : 'text-base'),
    (disabled && 'cursor-not-allowed'),
    (cssRingOffset || 'ring-offset-2'),
    (cssTransition || 'transition-all ease duration-100'),
    themeDefault,
    themeDefaultOutlined,
    themeKind,
    themeKindOutlined,
  )
}
