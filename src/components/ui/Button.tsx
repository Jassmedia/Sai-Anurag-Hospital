import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg" | "sm";

interface ButtonStyleProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
}

function classes({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: ButtonStyleProps & { className?: string }) {
  return [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Content({
  children,
  icon,
  iconPosition = "end",
}: {
  children: ReactNode;
  icon?: IconName;
  iconPosition?: "start" | "end";
}) {
  const glyph = icon ? (
    <Icon name={icon} size={18} strokeWidth={2} className={styles.icon} />
  ) : null;
  return (
    <>
      {iconPosition === "start" && glyph}
      <span>{children}</span>
      {iconPosition === "end" && glyph}
    </>
  );
}

type ButtonLinkProps = ButtonStyleProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonStyleProps>;

/** A link styled as a button. */
export function ButtonLink({
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={classes({ variant, size, fullWidth, className })}
      {...rest}
    >
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </Link>
  );
}

type ButtonProps = ButtonStyleProps &
  Omit<ComponentProps<"button">, keyof ButtonStyleProps>;

/** A native <button>, for forms and actions. */
export function Button({
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes({ variant, size, fullWidth, className })}
      {...rest}
    >
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}

/**
 * The single "Book an Appointment" button used across the site.
 * Its destination comes from `siteConfig.appointmentHref`, so the booking
 * workflow can be swapped in later from one place.
 */
export function AppointmentButton({
  label = "Book an Appointment",
  doctorSlug,
  ...rest
}: Omit<ButtonLinkProps, "href" | "children"> & {
  label?: string;
  /** Pre-selects this doctor on the booking page. */
  doctorSlug?: string;
}) {
  const base = siteConfig.appointmentHref;
  const href =
    doctorSlug && base.startsWith("/") ? `${base}?doctor=${encodeURIComponent(doctorSlug)}` : base;
  return (
    <ButtonLink href={href} icon="calendar" iconPosition="start" {...rest}>
      {label}
    </ButtonLink>
  );
}
