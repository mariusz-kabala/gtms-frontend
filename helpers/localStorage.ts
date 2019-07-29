export function getItem(name: string): string | null {
    try {
        return localStorage && localStorage.getItem(name)
    } catch {
        return null
    }
}

export function setItem(name: string, value: string): void {
    try {
        if (!localStorage) {
            return
        }

        localStorage.setItem(name, value)
    } catch {
        // ignore
    }
}
