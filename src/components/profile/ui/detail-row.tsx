import { memo } from "react";

type DetailRowProps = {
    label: string;
    value?: string | null;
    mono?: boolean;
};

export const DetailRow = memo(({ label, value, mono }: DetailRowProps) => (
    <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className={`text-sm ${mono ? "font-mono" : ""}`}>
            {value ?? "—"}
        </span>
    </div>
));

DetailRow.displayName = "DetailRow";