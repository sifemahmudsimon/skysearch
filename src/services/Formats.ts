function fmtTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function fmtDuration(iso: string) {
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!m) return iso;
    return [m[1] && `${m[1]}h`, m[2] && `${m[2]}m`].filter(Boolean).join(" ");
}

export const Formats = {
    fmtTime,
    fmtDuration
};