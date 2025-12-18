/** biome-ignore-all lint/nursery/noLeakedRender: No leaks here */

import { memo, type ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
    title?: string;
    description?: string;
    children: ReactNode;
    variant?: "default" | "danger";
};

export const SectionCard = memo(
    ({
        title,
        description,
        children,
        variant = "default",
    }: SectionCardProps) => (
        <Card
            className={cn(
                variant === "danger" ? "border-destructive/50" : undefined
            )}
        >
            {(title ?? description) && (
                <CardHeader>
                    {title && (
                        <CardTitle
                            className={cn(
                                variant === "danger"
                                    ? "text-destructive text-lg"
                                    : "text-base"
                            )}
                        >
                            {title}
                        </CardTitle>
                    )}

                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
            )}

            <CardContent>{children}</CardContent>
        </Card>
    )
);

SectionCard.displayName = "SectionCard";
