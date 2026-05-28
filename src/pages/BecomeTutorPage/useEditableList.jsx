export function useEditableList(items, onChange, emptyItem) {
    return {
        add: () => onChange([...items, { ...emptyItem }]),
        update: (index, field, value) =>
            onChange(items.map((item, i) => i === index ? { ...item, [field]: value } : item)),
        remove: (index) =>
            onChange(items.filter((_, i) => i !== index)),
    }
}