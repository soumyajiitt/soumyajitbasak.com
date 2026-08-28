import type { StackItem } from "@/types/stack";

export type ResolvedStackIcon = {
    name: string;
    icon: string;
};

const EXTRA_ICONS: Record<string, string> = {
    redux: "/stack/redux.svg",
    appwrite: "/stack/appwrite.svg",
};

function normalizeTechName(name: string) {
    return name
        .toLowerCase()
        .replace(/\.js$/i, "")
        .replace(/[^a-z0-9]/g, "");
}

export function flattenStackCatalog(stack: Record<string, StackItem[]> | undefined): StackItem[] {
    if (!stack) return [];
    return Object.values(stack).flat();
}

export function resolveStackIcons(names: string[], catalog: StackItem[]): ResolvedStackIcon[] {
    const byKey = new Map<string, StackItem>();
    for (const item of catalog) {
        byKey.set(normalizeTechName(item.name), item);
    }

    return names.map((name) => {
        const key = normalizeTechName(name);
        const match = byKey.get(key);
        return {
            name,
            icon: match?.icon ?? EXTRA_ICONS[key] ?? "",
        };
    });
}
