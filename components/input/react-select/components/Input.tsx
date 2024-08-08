import { InputHTMLAttributes } from "react"
import { jsx } from "@emotion/react"

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from "react-select"
import { cleanCommonProps, getStyleProps } from "../utils"

export interface InputSpecificProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends InputHTMLAttributes<HTMLInputElement>,
    CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Reference to the internal element */
  innerRef?: (instance: HTMLInputElement | null) => void
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean
  /** Whether the input is disabled */
  isDisabled?: boolean
  /** The ID of the form that the input belongs to */
  form?: string
  /** Set className for the input element */
  inputClassName?: string
}

export type InputProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = InputSpecificProps<Option, IsMulti, Group>

export const inputCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isDisabled,
    value,
    theme: { spacing, colors },
  }: InputProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  visibility: isDisabled ? "hidden" : "visible",
  // force css to recompute when value change due to @emotion bug.
  // We can remove it whenever the bug is fixed.
  transform: value ? "translateZ(0)" : "",
  ...containerStyle,
  ...(unstyled
    ? {}
    : {
        margin: spacing.baseUnit / 2,
        paddingBottom: spacing.baseUnit / 2,
        paddingTop: spacing.baseUnit / 2,
        color: colors.neutral80,
      }),
})

const spacingStyle = {
  gridArea: "1 / 2",
  font: "inherit",
  minWidth: "2px",
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0,
} as const

const containerStyle = {
  flex: "1 1 auto",
  display: "inline-grid",
  gridArea: "1 / 1 / 2 / 3",
  gridTemplateColumns: "0 min-content",

  "&:after": {
    content: 'attr(data-value) " "',
    visibility: "hidden",
    whiteSpace: "pre",
    ...spacingStyle,
  },
} as const

const inputStyle = (isHidden: boolean) => ({
  label: "input",
  color: "inherit",
  background: 0,
  opacity: isHidden ? 0 : 1,
  width: "100%",
  ...spacingStyle,
})

const Input = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: InputProps<Option, IsMulti, Group>
) => {
  const { cx, value } = props
  const { innerRef, isDisabled, isHidden, inputClassName, ...innerProps } =
    cleanCommonProps(props)
  return (
    <div
      {...getStyleProps(props, "input", { "input-container": true })}
      data-value={value || ""}
    >
      <input
        className={cx({ input: true }, inputClassName)}
        ref={innerRef}
        style={inputStyle(isHidden)}
        disabled={isDisabled}
        {...innerProps}
      />
    </div>
  )
}

export default Input
