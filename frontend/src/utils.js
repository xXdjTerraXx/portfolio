export function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function formatTimestamp(ts) {
    const date = new Date(ts)

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    })
}

export function timeAgo(ts) {
    const seconds = Math.floor((new Date() - new Date(ts)) / 1000)

    const intervals = [
        { label: "yr", seconds: 31536000 },
        { label: "mo", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hr", seconds: 3600 },
        { label: "min", seconds: 60 }
    ]

    for (const i of intervals) {
        const count = Math.floor(seconds / i.seconds)
        if (count >= 1) {
            return `${count} ${i.label}${count > 1 ? "s" : ""} ago`
        }
    }

    return "just now"
}