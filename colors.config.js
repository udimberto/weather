const tailwindColors = require('tailwindcss/colors')

const facebook  = '#1877f2'
const instagram = '#000000'
const twitter   = '#1d9bf0'
const whatsapp  = '#44e576'
const white     = '#ffffff'

const base = tailwindColors.neutral

const baseBackground              = base['50']
const baseBackgroundSecondary     = white
const baseInputBackground         = base['100']
const baseInputBackgroundDisabled = base['50']

const darkBaseBackground              = base['800']
const darkBaseBackgroundSecondary     = base['700']
const darkBaseInputBackground         = base['800']
const darkBaseInputBackgroundDisabled = base['500']

const primary   = tailwindColors.sky
const secondary = tailwindColors.amber

module.exports = {
  ...tailwindColors,
  base,
  primary,
  secondary,
  facebook,
  instagram,
  twitter,
  whatsapp,
  'base-background': baseBackground,
  'base-background-secondary': baseBackgroundSecondary,
  'base-input-background': baseInputBackground,
  'base-input-background-disabled': baseInputBackgroundDisabled,
  'dark-base-background': darkBaseBackground,
  'dark-base-background-secondary': darkBaseBackgroundSecondary,
  'dark-base-input-background': darkBaseInputBackground,
  'dark-base-input-background-disabled': darkBaseInputBackgroundDisabled,
}