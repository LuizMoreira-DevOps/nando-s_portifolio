import ActionIcon from "../ActionIcon/ActionIcon";

type ScrollCueProps = {
    href: string;
    label: string;
    className?: string;
};

const SCROLL_CUE_SIZE = 96;

export default function ScrollCue({ href, label, className }: ScrollCueProps) {
    return (
        <a href={href} aria-label={label} className={className}>
            <ActionIcon variant="down" motion="loop" size={SCROLL_CUE_SIZE} stroke={1.2} />
        </a>
    );
}
