"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import { IconX } from "@tabler/icons-react";

import Modal from "../ui/Modal/Modal";
import ProjectBriefing from "../ProjectBriefing/ProjectBriefing";

import styles from "./BriefingOverlay.module.css";

type BriefingContextData = {
    service?: string;
    project?: string;
};

type BriefingSession = BriefingContextData & {
    id: number;
};

type BriefingControls = {
    openBriefing: (data?: BriefingContextData) => void;
};

const BriefingContext = createContext<BriefingControls | null>(null);

export function useBriefing(): BriefingControls {
    const context = useContext(BriefingContext);

    if (!context) {
        throw new Error("BriefingProvider não encontrado no layout.");
    }

    return context;
}

export default function BriefingProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    const [session, setSession] = useState<BriefingSession>({
        id: 0,
        service: undefined,
        project: undefined,
    });

    const openBriefing = useCallback((data: BriefingContextData = {}) => {
        setSession((previous) => {
            if (previous?.service === data.service && previous?.project === data.project) {
                // Reabrir o mesmo briefing preserva o rascunho.
                return previous;
            }

            return {
                ...data,
                id: (previous?.id ?? 0) + 1,
            };
        });

        setOpen(true);
    }, []);

    return (
        <BriefingContext.Provider value={{ openBriefing }}>
            {children}

            <Modal
                open={open}
                onRequestClose={() => setOpen(false)}
                titleId="briefing-modal-title"
                descriptionId="briefing-modal-description"
            >
                <div className={styles.header}>
                    <button
                        type="button"
                        className={styles.close}
                        aria-label="Fechar briefing"
                        onClick={() => setOpen(false)}
                    >
                        <IconX size={22} stroke={1.7} aria-hidden="true" />
                    </button>
                </div>

                <h2 id="briefing-modal-title" className={styles.title}>
                    Vamos conversar sobre <span>sua ideia</span>?
                </h2>

                <p id="briefing-modal-description" className={styles.description}>
                    Conte o que você imagina ou gostaria de desenvolver.{" "}
                </p>

                <div className={styles.formShell}>
                    <ProjectBriefing
                        key={session.id}
                        source="modal"
                        initialService={session.service}
                        initialProject={session.project}
                    />
                </div>
            </Modal>
        </BriefingContext.Provider>
    );
}
