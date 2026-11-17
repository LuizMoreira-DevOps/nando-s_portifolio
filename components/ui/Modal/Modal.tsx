"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

import styles from "./Modal.module.css";

type ModalProps = {
    open: boolean;
    onRequestClose: () => void;
    titleId: string;
    descriptionId?: string;
    children: ReactNode;
};

export default function Modal({
    open,
    onRequestClose,
    titleId,
    descriptionId,
    children,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);

    function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
        if (event.target !== event.currentTarget) return;

        const rect = event.currentTarget.getBoundingClientRect();

        const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (outside) onRequestClose();
    }

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onCancel={(event) => {
                event.preventDefault();
                onRequestClose();
            }}
            onClose={onRequestClose}
            onClick={handleBackdropClick}
        >
            {children}
        </dialog>
    );
}
