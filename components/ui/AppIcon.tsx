import { IconDeviceGamepad2, IconWorld, IconBrowser } from "@tabler/icons-react";

const icons = {
    gamepad: IconDeviceGamepad2,
    globe: IconWorld,
    browser: IconBrowser,
} as const;

export type AppIconName = keyof typeof icons;

type AppIconProps = {
    name: AppIconName;
    size?: number;
    stroke?: number;
    className?: string;
};

export default function AppIcon({ name, size = 28, stroke = 1.8, className }: AppIconProps) {
    const Icon = icons[name];

    return (
        <Icon
            size={size}
            stroke={stroke}
            className={className}
            aria-hidden="true"
            focusable="false"
        />
    );
}
