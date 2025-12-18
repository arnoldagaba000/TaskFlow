import { useCallback, useState } from "react";

type UseFileReaderReturn = {
    readFileAsBase64: (file: File) => Promise<string>;
    isReading: boolean;
    error: Error | null;
};

export function useFileReader(): UseFileReaderReturn {
    const [isReading, setIsReading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const readFileAsBase64 = useCallback(
        (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                setIsReading(true);
                setError(null);

                const reader = new FileReader();

                reader.onloadend = () => {
                    setIsReading(false);
                    const base64 = reader.result as string;
                    resolve(base64);
                };

                reader.onerror = () => {
                    const err = new Error("Failed to read file");
                    setError(err);
                    setIsReading(false);
                    reject(err);
                };

                reader.readAsDataURL(file);
            }),
        []
    );

    return { readFileAsBase64, isReading, error };
}
